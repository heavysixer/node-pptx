let { Shape } = require('./shape');

class Slide {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.name = args.name;
        this.externalObjectCount = args.externalObjectCount || 0;
        this.parentContainer = args.parentContainer;

        this.elements = [];
        this.defaults = {};
    }

    setTextColor(color) {
        this.defaults.textColor = color;
    }

    setBackgroundColor(color) {
        this.powerPointFactory.setBackgroundColor(this, color);
    }

    async addImage(source, options = {}) {
        try {
            let newImage;

            if (typeof source === 'string') {
                // if source is a string, it should be a file path
                newImage = this.powerPointFactory.addImage(this, source, 'file', options);
            } else if (typeof source === 'object') {
                // if source is an object, it must contain either a base64 encoded string of the image (in source.data), or a URL of where to download the image (source.downloadUrl)
                if (source.data !== undefined) {
                    newImage = this.powerPointFactory.addImage(this, source.data, 'base64', options);
                } else if (source.downloadUrl !== undefined) {
                    newImage = await this.powerPointFactory.addImageFromRemoteUrl(this, source.downloadUrl, options);
                } else {
                    throw new Error('Either "data" or "downloadUrl" must be specified in the source object when calling Slide.addImage().');
                }
            } else {
                throw new Error('Invalid source parameter when calling Slide.addImage(). Must be either a string (file path) or object.');
            }

            this.elements.push(newImage);

            return newImage;
        } catch (err) {
            throw new Error(`Failed to add image to slide. Exception info: ${err.message}`);
        }
    }

    addText(text, options = {}) {
        try {
            // need to make a copy of defaults first, then merge options into that copy so the original defaults object stays immutable
            options = Object.assign(Object.assign({}, this.defaults), options);
            let newTextObject = this.powerPointFactory.addText(this, text, options);

            this.elements.push(newTextObject);

            return newTextObject;
        } catch (err) {
            console.log(err);
            throw new Error(`Failed to add text to slide. Exception info: ${err.message}`);
        }
    }

    addShape(type, options = {}) {
        try {
            let newShapeObject = this.powerPointFactory.addShape(this, type, options);

            this.elements.push(newShapeObject);

            return newShapeObject;
        } catch (err) {
            throw new Error(`Failed to add shape to slide. Exception info: ${err.message}`);
        }
    }

    async addChart(type, data, options = {}) {
        try {
            let newChartObject = await this.powerPointFactory.addChart(this, type, data, options);

            this.elements.push(newChartObject);

            return newChartObject;
        } catch (err) {
            throw new Error(`Failed to add chart to slide. Exception info: ${err.message}`);
        }
    }

    addSlide(layoutName) {
        if (typeof this.parentContainer.addSlide === 'function') {
            return this.parentContainer.addSlide(layoutName);
        } else {
            throw new Error('Invalid call: parent container of Slide has no addSlide() function.');
        }
    }

    // for some testing...
    getShapeObject(index) {
        let c = 0;

        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];

            if (element instanceof Shape) {
                if (i === c++) {
                    return element;
                }
            }
        }
    }

    getShapeRawContent(index) {
        let c = 0;
        let shapeNodes = this.content['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'];

        for (let i = 0; i < shapeNodes.length; i++) {
            let currentShape = shapeNodes[i];

            if (currentShape['p:nvSpPr'] && currentShape['p:nvSpPr'][0]['p:cNvSpPr'] && currentShape['p:nvSpPr'][0]['p:cNvSpPr'][0]['$']) {
                let txBoxNode = currentShape['p:nvSpPr'][0]['p:cNvSpPr'][0]['$'].txBox;

                if (txBoxNode !== '1') {
                    if (c++ === index) {
                        return currentShape;
                    }
                } else {
                    // Note: looks like our example PowerPoint has a text box on every shape and that's why the code wasn't finding
                    // any plain shape nodes (wasn't hitting the "if" block above).
                    if (c++ === index) {
                        return currentShape; // ***TEST*** for now I don't care if it's shape or text box
                    }
                }
            }
        }
    }

    getNumElements() {
        return this.elements.length + this.externalObjectCount;
    }

    getNextObjectId() {
        return this.getNumElements() + 1;
    }
}

module.exports.Slide = Slide;
