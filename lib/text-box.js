let { ElementProperties } = require('./element-properties');

class TextBox extends ElementProperties {
    constructor() {
        super();

        this.x(10);
        this.y(10);
        this.cx(200);
        this.cy(30);

        this.textValue = '';
    }

    value(text) {
        this.textValue = text;
        return this;
    }

    href(destinationUrl) {
        this.options.url = destinationUrl;
        return this;
    }

    fontFace(value) {
        this.options.fontFace = value;
        return this;
    }

    fontSize(value) {
        this.options.fontSize = value;
        return this;
    }

    fontBold(value) {
        this.options.fontBold = value;
        return this;
    }

    textColor(value) {
        this.options.textColor = value;
        return this;
    }

    textWrap(value) {
        this.options.textWrap = value;
        return this;
    }

    textAlign(value) {
        this.options.textAlign = value;
        return this;
    }

    textVerticalAlign(value) {
        this.options.textVerticalAlign = value;
        return this;
    }

    line(lineOptions) {
        this.options.line = lineOptions;
        return this;
    }

    // margin value can be a plain number that applies to left, right, top, and bottom margins;
    // or an object, like: { top: 0, bottom: 0, left: 0, right: 0 }
    margin(value) {
        this.options.margin = value;
        return this;
    }

    setContent(content) {
        this.content = content;
        super.setPropertyContent(this.content['p:spPr'][0]['a:xfrm'][0]);
    }
}

module.exports.TextBox = TextBox;
