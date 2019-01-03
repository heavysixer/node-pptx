/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
const JSZip = require('jszip');
const xml2js = require('xml2js');
const request = require('request').defaults({ encoding: null });

let { PptxContentHelper } = require('../helpers/pptx-content-helper');
let { ContentTypeFactory } = require('./content-types');
let { DocPropsFactory } = require('./doc-props');
let { PptFactory } = require('./ppt');
let { RelsFactory } = require('./rels');
let { Slide } = require('../slide');

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
                    // skip dir names
                    if (key[key.length - 1] !== '/') {
                        this.content[key] = await zip.file(key).async('nodebuffer');
                    }
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
        if (!this.slides.hasOwnProperty(slideName)) throw new Error(`Slide name doesn't exist in PowerPointFactory.getSlide(): '${slideName}' `);

        return this.slides[slideName];
    }

    addSlide(layoutName) {
        let slideName = `slide${Object.keys(this.slides).length + 1}`;
        let newSlideContentBlock = this.pptFactory.addSlide(slideName, layoutName);

        let slide = new Slide({
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

    removeSlide(slideName) {
        this.pptFactory.removeSlide(slideName);
        this.contentTypeFactory.removeContentType(`/ppt/slides/${slideName}.xml`);
        this.docPropsFactory.decrementSlideCount();

        delete this.slides[slideName];
    }

    moveSlide(sourceSlideNum, destinationSlideNum) {
        let sourceSlideName = `slide${sourceSlideNum}`;
        let destinationSlideName = `slide${destinationSlideNum}`;

        if (!this.slides.hasOwnProperty(sourceSlideName)) {
            throw new Error(`Source slide number does not exist in PowerPointFactory.moveSlide(): ${sourceSlideNum}`);
        }

        if (!this.slides.hasOwnProperty(destinationSlideName)) {
            throw new Error(`Destination slide number does not exist in PowerPointFactory.moveSlide(): ${destinationSlideNum}`);
        }

        this.pptFactory.moveSlide(sourceSlideNum, destinationSlideNum);

        let self = this;
        let internalSwap = function(index) {
            try {
                let slideName1 = `slide${index}`;
                let slideName2 = `slide${index + 1}`;

                [self.slides[slideName1], self.slides[slideName2]] = [self.slides[slideName2], self.slides[slideName1]];

                // rename internal slide name identifiers
                // (don't confuse slideName1(2) to slideName1(2) - since the line above already swapped the name props, slide1 is really becoming slide2 and vice-versa)
                self.slides[slideName1].rename(slideName1);
                self.slides[slideName2].rename(slideName2);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        };

        if (destinationSlideNum > sourceSlideNum) {
            // move slides between start and destination backwards (e.g. slide 4 becomes 3, 3 becomes 2, etc.)
            for (let i = sourceSlideNum; i < destinationSlideNum; i++) {
                internalSwap(i);
            }
        } else if (destinationSlideNum < sourceSlideNum) {
            // move slides between start and destination forward (e.g. slide 2 becomes 3, 3 becomes 4, etc.)
            for (let i = sourceSlideNum - 1; i >= destinationSlideNum; i--) {
                internalSwap(i);
            }
        }
    }

    addImage(slide, image) {
        image.setContent(this.pptFactory.addImage(slide, image));
    }

    async addImageFromRemoteUrl(slide, image) {
        image.source = await new Promise(function(resolve, reject) {
            request.get(image.downloadUrl, { timeout: 30000 }, function(err, res, buffer) {
                if (err) reject(err);
                resolve(buffer);
            });
        });

        return this.addImage(slide, image);
    }

    addText(slide, textBox) {
        textBox.setContent(this.pptFactory.addText(slide, textBox));
    }

    addShape(slide, shape) {
        shape.setContent(this.pptFactory.addShape(slide, shape));
    }

    async addChart(slide, chart) {
        chart.name = `chart${Object.keys(this.charts).length + 1}`;
        chart.setContent(await this.pptFactory.addChart(slide, chart));

        this.contentTypeFactory.addContentType(`/ppt/charts/${chart.name}.xml`, 'application/vnd.openxmlformats-officedocument.drawingml.chart+xml');
        this.contentTypeFactory.addDefaultContentType(`xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');

        this.charts[chart.name] = chart;
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
