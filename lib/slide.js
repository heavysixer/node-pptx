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
    }

    setTextColor(color) {
        this.textColor = color;
    }

    setBackgroundColor(color) {
        this.powerPointFactory.setBackgroundColor(this, color);
    }

    addImage(path, options = {}) {
        try {
            let newImage = this.powerPointFactory.addImage(this, path, options);

            this.elements.push(newImage);

            return newImage;
        } catch (err) {
            throw new Error(`Failed to add image to slide. Exception info: ${err.message}`);
        }
    }

    addText(text, options = {}) {
        try {
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
