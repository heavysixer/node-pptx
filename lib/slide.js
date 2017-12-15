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
        let newImage = this.powerPointFactory.addImage(this, path, options);

        this.Objects.push(newImage);

        return newImage;
    }

    addText(text, options) {
        let newTextObject = this.powerPointFactory.addText(this, text, options);

        this.Objects.push(newTextObject);

        return newTextObject;
    }

    getNumObjects() {
        return this.Objects.length + this.externalObjectCount;
    }

    getNextObjectId() {
        return this.getNumObjects() + 1;
    }
}

module.exports.Slide = Slide;
