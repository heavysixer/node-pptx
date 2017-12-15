class Slide {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.name = args.name;
        this.externalObjectCount = args.externalObjectCount || 0;

        this.Images = [];
    }

    addImage(path, options) {
        let newImage = this.powerPointFactory.addImage(this, path, options);

        this.Images.push(newImage);

        return newImage;
    }

    addText(text, options) {
        return this.powerPointFactory.addText(this, text, options);
    }

    getNumObjects() {
        return this.Images.length + this.externalObjectCount;
    }

    getNextObjectId() {
        return this.getNumObjects() + 1;
    }
}

module.exports.Slide = Slide;
