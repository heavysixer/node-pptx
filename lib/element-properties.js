let { PptxUnitHelper } = require('./helpers/unit-helper');

class ElementProperties {
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

module.exports.ElementProperties = ElementProperties;
