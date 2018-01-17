let { TextBox } = require('./text-box');

class Shape extends TextBox {
    constructor() {
        super();

        this.x(100);
        this.y(100);
        this.cx(200);
        this.cy(200);
    }

    color(value) {
        this.options.color = value;
        return this;
    }

    type(value) {
        this.shapeType = value;
        return this;
    }

    text(value) {
        super.value(value); // the text value in a TextBox is the same as the text on a shape
        return this;
    }
}

module.exports.Shape = Shape;
