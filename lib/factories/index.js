/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
const JSZip = require('jszip');
const async = require('async');
const xml2js = require('xml2js');

let { ContentTypeFactory } = require('./content-types');
let { DocPropsFactory } = require('./doc-props');
let { PptFactory } = require('./ppt');
let { RelsFactory } = require('./rels');
let { Slide } = require('../slide');
let { Image } = require('../image');
let { Text } = require('../text');

// TODO: think of a better name for this...
class PptxContentHelper {
    // Given the "content" block from the root (ex: PowerPointFactory.content), this function will pull out every slide and return very basic info on them.
    // (Right now, it's just the slide layout name used on each slide and the relId for that layout to slide relationship.)
    static extractInfoFromSlides(content) {
        let slideInformation = {}; // index is slide name

        for (let key in content) {
            if (key.substr(0, 16) === 'ppt/slides/slide') {
                let slideName = key.substr(11, key.lastIndexOf('.') - 11);
                let slideRelsKey = `ppt/slides/_rels/${slideName}.xml.rels`;
                let slideLayoutRelsNode = content[slideRelsKey]['Relationships']['Relationship'].filter(function(element) {
                    return element['$']['Type'] === 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout';
                })[0];

                let relId = slideLayoutRelsNode['$'].Id;
                let target = slideLayoutRelsNode['$'].Target;
                let layout = target.substr(target.lastIndexOf('/') + 1);
                layout = layout.substr(0, layout.indexOf('.'));

                let objectInfo = PptxContentHelper.extractSlideObjectInfo(content, slideName);

                slideInformation[slideName] = { layout: { relId: relId, name: layout }, objectCount: objectInfo.objectCount };
            }
        }

        return slideInformation;
    }

    static extractSlideObjectInfo(content, slideName) {
        let objectInfo = {
            objectCount: 0,
        };

        // TODO... Mark: you can add code here...

        return objectInfo;
    }
}

class PowerPointFactory {
    constructor(presentation, args) {
        this.content = presentation.content;
        this.presentation = presentation;
        this.args = args;
        this.slides = {};

        this.contentTypeFactory = new ContentTypeFactory(this, args);
        this.docPropsFactory = new DocPropsFactory(this, args);
        this.relsFactory = new RelsFactory(this, args);
        this.pptFactory = new PptFactory(this, args);

        this.build(); // this will build the _initial_ content from our fragments
        this.extractObjectsFromContent(this.content);
    }

    loadFromRawFileData(data, done) {
        let zip = new JSZip(data);
        let content = this.content;
        let self = this;

        async.each(
            Object.keys(zip.files),
            function(key, callback) {
                try {
                    let ext = key.substr(key.lastIndexOf('.'));

                    if (ext === '.xml' || ext === '.rels') {
                        xml2js.parseString(zip.file(key).asText(), function(err, js) {
                            content[key] = js;
                            callback(null);
                        });
                    } else {
                        content[key] = zip.file(key).asNodeBuffer(); // <---- VERY IMPORTANT, do NOT use asText() like in the original code (some images won't get rezipped correctly on save)
                        callback(null);
                    }
                } catch (err) {
                    callback(err);
                }
            },
            function() {
                self.extractObjectsFromContent(content);

                done();
            }
        );
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
                    powerPointFactory: this,
                    content: content[''],
                    name: slideName,
                    layoutName: slideInformation[slideName].layout.name,
                    externalObjectCount: slideInformation[slideName].objectCount,
                    fromExternalSource: true,
                });
            }
        }
    }

    setPowerPointProperties(props) {
        this.docPropsFactory.setProperties(props);
    }

    getPowerPointProperties() {
        return this.docPropsFactory.getProperties();
    }

    getSlide(slideName) {
        return this.slides[slideName];
    }

    addSlide(layoutName) {
        let slideName = `slide${Object.keys(this.slides).length + 1}`;
        let newSlideContentBlock = this.pptFactory.addSlide(slideName, layoutName);
        let slide = new Slide({ powerPointFactory: this, content: newSlideContentBlock, name: slideName, layoutName: layoutName });

        this.contentTypeFactory.addContentType(
            `/ppt/slides/${slideName}.xml`,
            'application/vnd.openxmlformats-officedocument.presentationml.slide+xml'
        );

        this.slides[slideName] = slide;
        this.docPropsFactory.incrementSlideCount();

        return slide;
    }

    addImage(slide, path, options) {
        let newImageContentBlock = this.pptFactory.addImage(slide, path, options);
        let image = new Image({ powerPointFactory: this, content: newImageContentBlock });

        return image;
    }

    addText(slide, text, options = {}) {
        let newTextContentBlock = this.pptFactory.addText(slide, text, options);
        let textObject = new Text({ powerPointFactory: this, content: newTextContentBlock });

        return textObject;
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
