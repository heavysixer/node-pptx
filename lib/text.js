let { PptxUnitHelper } = require('./helpers/unit-helper');
let { Slide } = require('./slide');

class Text {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.properties = this.content['p:spPr'][0];
        this.parentContainer = args.parentContainer;
    }

    // TODO: these are the _exact_ same functions in the Image object; move them to a common class or inherit...
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

    // this is here so you can chain calls, like "slide.addText('hello').addText('world', {y: 25}).addText('even more text', {y: 50})"
    addText(text, options = {}) {
        if (typeof this.parentContainer.addText === 'function') {
            return this.parentContainer.addText(text, options);
        } else {
            throw new Error('Invalid call: parent container of Text has no addText() function.');
        }
    }

    // OK... no, you can't add a slide to a text object, but I put this here in case someone wants to go crazy
    // with DSL-like statements, such as:
    //
    // presentation.addSlide().addText('hello world!').addSlide().addText('this is slide 2')
    addSlide(layoutName) {
        if (this.parentContainer instanceof Slide) {
            return this.parentContainer.addSlide(layoutName);
        } else {
            throw new Error('Invalid call: parent container of Text has no addSlide() function.');
        }
    }

    container() {
        return this.parentContainer;
    }
}

module.exports.Text = Text;
