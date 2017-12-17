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
            throw new Error(`Failed to add text to slide. Exception info: ${err.message}`);
        }
    }

    addSlide(layoutName) {
        if (typeof this.parentContainer.addSlide === 'function') {
            return this.parentContainer.addSlide(layoutName);
        } else {
            throw new Error('Invalid call: parent container of Slide has no addSlide() function.');
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
