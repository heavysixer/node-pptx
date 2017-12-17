let { Slide } = require('./slide');
let { ElementProperties } = require('./element-properties');

class Image extends ElementProperties {
    constructor(args) {
        super();
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.properties = this.content['p:spPr'][0];
        this.parentContainer = args.parentContainer;
    }

    // NOTE: I didn't put an AddText function here because it could be confused with an image's ALT text
    addImage(path, options = {}) {
        if (typeof this.parentContainer.addImage === 'function') {
            return this.parentContainer.addImage(path, options);
        } else {
            throw new Error('Invalid call: parent container of Image has no addImage() function.');
        }
    }

    addSlide(layoutName) {
        if (this.parentContainer instanceof Slide) {
            return this.parentContainer.addSlide(layoutName);
        } else {
            throw new Error('Invalid call: parent container of Image must be a Slide object in order to call addSlide().');
        }
    }
}

module.exports.Image = Image;
