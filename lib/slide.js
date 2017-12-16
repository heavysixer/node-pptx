class Slide {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.name = args.name;
        this.externalObjectCount = args.externalObjectCount || 0;

        this.Objects = [];
    }

    addImage(path, options) {
        try {
            let newImage = this.powerPointFactory.addImage(this, path, options);

            this.Objects.push(newImage);

            return newImage;
        } catch (err) {
            //console.log(err);
            throw new Error(`Failed to add image to slide. Exception info: ${err.message}`);
        }
    }

    addText(text, options = {}) {
        try {
            let newTextObject = this.powerPointFactory.addText(this, text, options);

            this.Objects.push(newTextObject);

            return newTextObject;
        } catch (err) {
            //console.log(err);
            throw new Error(`Failed to add text to slide. Exception info: ${err.message}`);
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
