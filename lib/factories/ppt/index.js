/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
let { PresPropsFactory } = require('./pres-props');
let { PresentationFactory } = require('./presentation');
let { PptRelsFactory } = require('./rels');
let { SlideLayoutsFactory } = require('./slide-layouts');
let { SlideMastersFactory } = require('./slide-masters');
let { SlideFactory } = require('./slides');
let { TableStylesFactory } = require('./table-styles');
let { ThemeFactory } = require('./theme');
let { ViewPropsFactory } = require('./view-props');
let { MediaFactory } = require('./media');

class PptFactory {
    constructor(presentation, args) {
        this.content = presentation.content;
        this.presentation = presentation;
        this.args = args;
        this.pptRelsFactory = new PptRelsFactory(this, args);
        this.presentationFactory = new PresentationFactory(this, args);
        this.presPropsFactory = new PresPropsFactory(this, args);
        this.slideLayoutsFactory = new SlideLayoutsFactory(this, args);
        this.slideMastersFactory = new SlideMastersFactory(this, args);
        this.tableStylesFactory = new TableStylesFactory(this, args);
        this.themeFactory = new ThemeFactory(this, args);
        this.viewPropsFactory = new ViewPropsFactory(this, args);
        this.slideFactory = new SlideFactory(this, args);
        this.mediaFactory = new MediaFactory(this.content);
    }

    build() {
        this.presPropsFactory.build();
        this.presentationFactory.build();
        this.pptRelsFactory.build();
        this.slideLayoutsFactory.build();
        this.slideMastersFactory.build();
        this.slideFactory.build();
        this.tableStylesFactory.build();
        this.themeFactory.build();
        this.viewPropsFactory.build();
    }

    addSlide(slideName, layoutName) {
        let rId = this.pptRelsFactory.addPresentationToSlideRelationship(slideName);
        this.presentationFactory.addSlideRefIdToGlobalList(rId);
        this.slideFactory.addSlide(slideName, layoutName);

        return rId;
    }

    addImage(slideName, path, options) {
        //let rId = this.slideFactory.addImageToSlideRelationship(slideName, 'TODO');
    }
}

module.exports.PptFactory = PptFactory;
