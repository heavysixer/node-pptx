let { PptxUnitHelper } = require('./helpers/unit-helper');

class Image {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.properties = this.content['p:spPr'][0];
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
}

module.exports.Image = Image;
