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

    getProperty(propKey, key) {
        if (this.properties !== undefined) {
            let propKey = key === 'x' || key === 'y' ? 'off' : 'ext';
            return PptxUnitHelper.toPixels(this.properties[`a:${propKey}`][0]['$'][key]);
        } else {
            return this[`_${key}`];
        }
    }

    setProperty(key, val) {
        this[`_${key}`] = val;
        if (this.properties !== undefined) {
            let propKey = key === 'x' || key === 'y' ? 'off' : 'ext';
            this.properties[`a:${propKey}`][0]['$'][key] = PptxUnitHelper.fromPixels(val);
        }
    }

    getOrSetProperty(key, val) {
        if (val === undefined) {
            return this.getProperty(key);
        } else {
            this.setProperty(key, val);
        }
        return this;
    }

    x(val) {
        return this.getOrSetProperty('x', val);
    }

    y(val) {
        return this.getOrSetProperty('y', val);
    }

    cx(val) {
        return this.getOrSetProperty('cx', val);
    }

    cy(val) {
        return this.getOrSetProperty('cy', val);
    }
}

module.exports.ElementProperties = ElementProperties;
