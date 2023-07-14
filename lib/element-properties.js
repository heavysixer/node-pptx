let { PptxUnitHelper } = require('./helpers/unit-helper');

class ElementProperties {
    constructor() {
        this._x = 0;
        this._y = 0;
        this._cx = 0;
        this._cy = 0;
        this._dpi = 72;
        this.options = {};
    }

    setPropertyContent(properties) {
        this.properties = properties;

        this.x(this._x);
        this.y(this._y);
        this.cx(this._cx);
        this.cy(this._cy);
        this.dpi(this._dpi);
    }

    x(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:off'][0]['$'].x, this.properties['a:off'][0]['$'].dpi);
            } else {
                return this._x;
            }
        } else {
            this._x = val;

            if (this.properties !== undefined) {
                this.properties['a:off'][0]['$'].x = PptxUnitHelper.fromPixels(val, this._dpi);
            }
        }

        return this;
    }

    y(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:off'][0]['$'].y, this.properties['a:off'][0]['$'].dpi);
            } else {
                return this._y;
            }
        } else {
            this._y = val;

            if (this.properties !== undefined) {
                this.properties['a:off'][0]['$'].y = PptxUnitHelper.fromPixels(val, this._dpi);
            }
        }

        return this;
    }

    cx(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:ext'][0]['$'].cx, this.properties['a:off'][0]['$'].dpi);
            } else {
                return this._cx;
            }
        } else {
            this._cx = val;

            if (this.properties !== undefined) {
                this.properties['a:ext'][0]['$'].cx = PptxUnitHelper.fromPixels(val, this._dpi);
            }
        }

        return this;
    }

    cy(val) {
        if (arguments.length === 0) {
            if (this.properties !== undefined) {
                return PptxUnitHelper.toPixels(this.properties['a:ext'][0]['$'].cy, this.properties['a:off'][0]['$'].dpi);
            } else {
                return this._cy;
            }
        } else {
            this._cy = val;

            if (this.properties !== undefined) {
                this.properties['a:ext'][0]['$'].cy = PptxUnitHelper.fromPixels(val, this._dpi);
            }
        }

        return this;
    }

    dpi(val) {
        if (arguments.length === 0) {
            return this._dpi;
        } else {
            this._dpi = val;

            if (this.properties !== undefined) {
                this.properties['a:off'][0]['$'].dpi = val;
            }
        }

        return this;
    }
}

module.exports.ElementProperties = ElementProperties;
