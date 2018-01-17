let { PptxUnitHelper } = require('./helpers/unit-helper');

class ElementProperties {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._cx = 0;
        this._cy = 0;
        this.options = {};
    }

    setPropertyContent(properties) {
        this.properties = properties;

        this.x(this._x);
        this.y(this._y);
        this.cx(this._cx);
        this.cy(this._cy);
    }

    setProperty(key, val, args) {
        if (args.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:off'][0]['$'][key]);
            } else {
                return this[`_${ key}`];
            }
        } else {
            this[`_${ key}`] = val;

            if (this.properties !== undefined) {
                this.properties['a:off'][0]['$'][key] = PptxUnitHelper.fromPixels(val);
            }
        }
    }

    x(val) {
        this.setProperty('x', val, arguments);
        return this;
    }

    y(val) {
        this.setProperty('y', val, arguments);
        return this;
    }

    cx(val) {
        this.setProperty('cx', val, arguments);
        return this;
    }

    cy(val) {
        this.setProperty('cy', val, arguments);
        return this;
    }
}

module.exports.ElementProperties = ElementProperties;
