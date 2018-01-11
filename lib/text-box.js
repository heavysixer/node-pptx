let { ElementProperties } = require('./element-properties');

class TextBox extends ElementProperties {
    constructor(args) {
        super();
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.properties = this.content['p:spPr'][0];
        this.parentContainer = args.parentContainer;
    }

    // this is here so you can chain calls, like "slide.addText('hello').addText('world', {y: 25}).addText('even more text', {y: 50})"
    addText(text, options = {}) {
        if (typeof this.parentContainer.addText === 'function') {
            return this.parentContainer.addText(text, options);
        } else {
            throw new Error('Invalid call: parent container of Text has no addText() function.');
        }
    }

    addImage(path, options = {}) {
        if (typeof this.parentContainer.addImage === 'function') {
            return this.parentContainer.addImage(path, options);
        } else {
            throw new Error('Invalid call: parent container of Text has no addImage() function.');
        }
    }

    // OK... no, you can't add a slide to a text object, but I put this here in case someone wants to go crazy
    // with DSL-like statements, such as:
    //
    // presentation.addSlide().addText('hello world!').addSlide().addText('this is slide 2')
    addSlide(layoutName) {
        if (typeof this.parentContainer.addSlide === 'function') {
            return this.parentContainer.addSlide(layoutName);
        } else {
            throw new Error('Invalid call: parent container of Text has no addSlide() function.');
        }
    }

    container() {
        return this.parentContainer;
    }
}

module.exports.TextBox = TextBox;
