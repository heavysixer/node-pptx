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

    x(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:off'][0]['$'].x);
            } else {
                return this._x;
            }
        } else {
            this._x = val;

            if (this.properties !== undefined) {
                this.properties['a:off'][0]['$'].x = PptxUnitHelper.fromPixels(val);
            }
        }

        return this;
    }

    y(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:off'][0]['$'].y);
            } else {
                return this._y;
            }
        } else {
            this._y = val;

            if (this.properties !== undefined) {
                this.properties['a:off'][0]['$'].y = PptxUnitHelper.fromPixels(val);
            }
        }

        return this;
    }

    cx(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:ext'][0]['$'].cx);
            } else {
                return this._cx;
            }
        } else {
            this._cx = val;

            if (this.properties !== undefined) {
                this.properties['a:ext'][0]['$'].cx = PptxUnitHelper.fromPixels(val);
            }
        }

        return this;
    }

    cy(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:ext'][0]['$'].cy);
            } else {
                return this._cy;
            }
        } else {
            this._cy = val;

            if (this.properties !== undefined) {
                this.properties['a:ext'][0]['$'].cy = PptxUnitHelper.fromPixels(val);
            }
        }

        return this;
    }
}

module.exports.ElementProperties = ElementProperties;
