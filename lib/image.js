//let XmlNode = require('./xmlnode');
let { PptxUnitHelper } = require('./helpers/unit-helper');

class Image {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.properties = this.content['p:spPr'];
    }

    // TODO: extract these four functions into something generic because they will be the same for most object properties, not just images
    x(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm']['a:off']['$'].x);
        } else {
            this.properties['a:xfrm']['a:off']['$'].x = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }

    y(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm']['a:off']['$'].y);
        } else {
            this.properties['a:xfrm']['a:off']['$'].y = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }

    cx(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm']['a:ext']['$'].cx);
        } else {
            this.properties['a:xfrm']['a:ext']['$'].cx = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }

    cy(val) {
        if (arguments.length === 0) {
            return PptxUnitHelper.toPixels(this.properties['a:xfrm']['a:ext']['$'].cy);
        } else {
            this.properties['a:xfrm']['a:ext']['$'].cy = PptxUnitHelper.fromPixels(val);
        }

        return this;
    }
}

module.exports.Image = Image;
