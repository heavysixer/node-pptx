class Slide {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.name = args.name;
        this.externalObjectCount = args.externalObjectCount || 0;
        this.parentContainer = args.parentContainer;

        this.Objects = [];
    }

    addImage(path, options = {}) {
        try {
            let newImage = this.powerPointFactory.addImage(this, path, options);

            this.Objects.push(newImage);

            return newImage;
        } catch (err) {
            throw new Error(`Failed to add image to slide. Exception info: ${err.message}`);
        }
    }

    addText(text, options = {}) {
        try {
            let newTextObject = this.powerPointFactory.addText(this, text, options);

            this.Objects.push(newTextObject);

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

    getNumObjects() {
        return this.Objects.length + this.externalObjectCount;
    }

    getNextObjectId() {
        return this.getNumObjects() + 1;
    }
}

module.exports.Slide = Slide;
