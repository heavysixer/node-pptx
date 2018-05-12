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

    bulletPoints(values) {
        this.bulletPoints = values;
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

    fontItalic(value) {
        this.options.fontItalic = value;
        return this;
    }

    fontUnderline(value) {
        this.options.fontUnderline = value;
        return this;
    }

    fontSubscript(value) {
        this.options.fontSubscript = value;
        return this;
    }

    fontSuperscript(value) {
        this.options.fontSuperscript = value;
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

    // true/false: auto-size textbox or shape to fit text contents (too much text will make it grow and too little will shrink it)
    autoFit(value) {
        this.options.autoFit = value;
        return this;
    }

    // true/false: if the text contents are too long to fit the shape, automatically shrink the text to fit
    // note: autoFit and shrinkText are mutually exclusive - doesn't make sense for both to be true (either one is true, or both are false)
    shrinkText(value) {
        // FIXME: TODO: for some strange reason PowerPoint doens't auto-shrink/fit the text in a shape when you first open the pptx. You must click
        // on the properties of any shape, change any "fit" property (Format Shape->Text Box->Autofit), and then ALL shapes get their auto-fit
        // attributes applied. Not sure if all PowerPoint versions have this bug. Will need to investigate later...
        this.options.shrinkText = value;
        return this;
    }

    backgroundColor(value) {
        this.options.backgroundColor = value;
        return this;
    }

    setContent(content) {
        this.content = content;
        super.setPropertyContent(this.content['p:spPr'][0]['a:xfrm'][0]);
    }
}

module.exports.TextBox = TextBox;
