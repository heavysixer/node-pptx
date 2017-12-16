let { PptxUnitHelper } = require('./helpers/unit-helper');
let { Slide } = require('./slide');

class Image {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.properties = this.content['p:spPr'][0];
        this.parentContainer = args.parentContainer;
    }

    // TODO: extract these four functions into something generic because they will be the same for most object properties, not just images
    x(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm'][0]['a:off'][0]['$'].x);
        } else {
            this.properties['a:xfrm'][0]['a:off'][0]['$'].x = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }

    y(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm'][0]['a:off'][0]['$'].y);
        } else {
            this.properties['a:xfrm'][0]['a:off'][0]['$'].y = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }

    cx(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm'][0]['a:ext'][0]['$'].cx);
        } else {
            this.properties['a:xfrm'][0]['a:ext'][0]['$'].cx = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }

    cy(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm'][0]['a:ext'][0]['$'].cy);
        } else {
            this.properties['a:xfrm'][0]['a:ext'][0]['$'].cy = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }

    // TODO: just like in the Text class, these functions are exactly the same, move to some base object...
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
