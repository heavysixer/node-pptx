/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
const JSZip = require('jszip');
const xml2js = require('xml2js');
const request = require('request').defaults({ encoding: null });
const fs = require('fs');
const path = require('path');

let { PptxContentHelper } = require('../helpers/pptx-content-helper');
let { ContentTypeFactory } = require('./content-types');
let { DocPropsFactory } = require('./doc-props');
let { PptFactory } = require('./ppt');
let { RelsFactory } = require('./rels');
let { Slide } = require('../slide');
let { Image } = require('../image');
let { TextBox } = require('../text-box');
let { Shape } = require('../shape');
let { Chart } = require('../chart');

class PowerPointFactory {
    constructor(presentation, args) {
        this.content = presentation.content;
        this.presentation = presentation;
        this.args = args;
        this.slides = {};
        this.charts = {};

        this.contentTypeFactory = new ContentTypeFactory(this, args);
        this.docPropsFactory = new DocPropsFactory(this, args);
        this.relsFactory = new RelsFactory(this, args);
        this.pptFactory = new PptFactory(this, args);

        this.build(); // this will build the _initial_ content from our fragments
        this.extractObjectsFromContent(this.content);
    }

    async loadFromRawFileData(data) {
        this.clearContent();

        let self = this;
        let zip = new JSZip();

        await zip.loadAsync(data);

        for (let key in zip.files) {
            if (zip.files.hasOwnProperty(key)) {
                let ext = key.substr(key.lastIndexOf('.'));

                if (ext === '.xml' || ext === '.rels') {
                    let js = await zip.file(key).async('string');

                    xml2js.parseString(js, function(err, js) {
                        self.content[key] = js;
                    });
                } else {
                    this.content[key] = await zip.file(key).async('nodebuffer');
                }
            }
        }

        this.extractObjectsFromContent(this.content);
    }

    clearContent() {
        for (let key in this.content) {
            if (this.content.hasOwnProperty(key)) {
                delete this.content[key];
            }
        }
    }

    build() {
        // Build the default document structure needed by a presentation.
        // The user will have the ability to override any of these details but
        // this will provide a collection of sensible defaults.
        this.contentTypeFactory.build();
        this.docPropsFactory.build();
        this.relsFactory.build();
        this.pptFactory.build();
    }

    extractObjectsFromContent(content) {
        let slideInformation = PptxContentHelper.extractInfoFromSlides(content);

        for (let slideName in slideInformation) {
            if (slideInformation.hasOwnProperty(slideName)) {
                this.slides[slideName] = new Slide({
                    parentContainer: this.presentation,
                    powerPointFactory: this,
                    content: content[`ppt/slides/${slideName}.xml`],
                    name: slideName,
                    layoutName: slideInformation[slideName].layout.name,
                    externalObjectCount: slideInformation[slideName].objectCount,
                    fromExternalSource: true,
                });
            }
        }

        // TODO: Now we need to extract chart info if an existing pptx is being loaded
        // _and_ that pptx contains charts. Won't affect anything if there are no charts
        // in the pptx.
    }

    setPowerPointProperties(props) {
        this.docPropsFactory.setProperties(props);
    }

    getPowerPointProperties() {
        return this.docPropsFactory.getProperties();
    }

    setLayout(layout) {
        this.pptFactory.setLayout(layout);
    }

    setBackgroundColor(slide, color) {
        this.pptFactory.setBackgroundColor(slide, color);
    }

    getSlide(slideName) {
        return this.slides[slideName];
    }

    addSlide(presentation, layoutName) {
        let slideName = `slide${Object.keys(this.slides).length + 1}`;
        let newSlideContentBlock = this.pptFactory.addSlide(slideName, layoutName);

        let slide = new Slide({
            parentContainer: presentation,
            powerPointFactory: this,
            content: newSlideContentBlock,
            name: slideName,
            layoutName: layoutName,
        });

        this.contentTypeFactory.addContentType(
            `/ppt/slides/${slideName}.xml`,
            'application/vnd.openxmlformats-officedocument.presentationml.slide+xml'
        );

        this.slides[slideName] = slide;
        this.docPropsFactory.incrementSlideCount();

        return slide;
    }

    addImage(slide, source, sourceType, options = {}) {
        let newImageContentBlock = this.pptFactory.addImage(slide, source, sourceType, options);
        return new Image({ parentContainer: slide, powerPointFactory: this, content: newImageContentBlock });
    }

    async addImageFromRemoteUrl(slide, downloadUrl, options = {}) {
        let imageBuffer = null;

        imageBuffer = await new Promise(function(resolve, reject) {
            request.get(downloadUrl, { timeout: 30000 }, function(err, res, buffer) {
                if (err) reject(err);
                resolve(buffer);
            });
        });

        options.fileExt = path.extname(downloadUrl);

        return this.addImage(slide, imageBuffer, 'binary', options);
    }

    addText(slide, text, options = {}) {
        let newTextContentBlock = this.pptFactory.addText(slide, text, options);
        return new TextBox({ parentContainer: slide, powerPointFactory: this, content: newTextContentBlock });
    }

    addShape(slide, type, options = {}) {
        let newShapeContentBlock = this.pptFactory.addShape(slide, type, options);
        return new Shape({ parentContainer: slide, powerPointFactory: this, content: newShapeContentBlock });
    }

    async addChart(slide, type, data, options = {}) {
        let chartName = `chart${Object.keys(this.charts).length + 1}`;
        let newChartContentBlock = await this.pptFactory.addChart(slide, chartName, type, data, options);
        let chartObject = new Chart({ parentContainer: slide, powerPointFactory: this, content: newChartContentBlock, name: chartName });

        this.contentTypeFactory.addContentType(`/ppt/charts/${chartName}.xml`, 'application/vnd.openxmlformats-officedocument.drawingml.chart+xml');
        this.contentTypeFactory.addDefaultContentType(`xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        this.charts[chartName] = chartObject;

        return chartObject;
    }

    getWorksheetCount() {
        // TODO... (implement this in higher level factory)
        return Object.keys(this.content).filter(function(key) {
            return key.substr(0, 36) === 'ppt/embeddings/Microsoft_Excel_Sheet';
        }).length;
    }

    addDefaultMediaContentTypes() {
        this.contentTypeFactory.addDefaultMediaContentTypes();
    }

    // NOTE: this function is for future use... but it works! (you would call it before writing the buffer in presentation.js)
    rebuild() {
        this.content = {};
        this.build(); // build the base from our fragments

        // add anything new the user has added
        for (let slideName in this.slides) {
            if (this.slides.hasOwnProperty(slideName)) {
                let slide = this.slides[slideName];

                if (!slide.fromExternalSource) {
                    this.pptFactory.addSlide(slideName, slide.layoutName);

                    this.contentTypeFactory.addContentType(
                        `/ppt/slides/${slideName}.xml`,
                        'application/vnd.openxmlformats-officedocument.presentationml.slide+xml'
                    );
                }
            }
        }

        // add other objects here...

        this.docPropsFactory.setSlideCount(Object.keys(this.slides).length);
    }
}

module.exports.PowerPointFactory = PowerPointFactory;
