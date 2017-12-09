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
const tableStylesFactory = require('./table-styles');
const themeFactory = require('./theme');
const viewPropsFactory = require('./view-props');

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
		this.slideFactory = new SlideFactory(this, args);
	}

	build() {
		this.presPropsFactory.build();
		this.presentationFactory.build();
		this.pptRelsFactory.build();
		this.slideLayoutsFactory.build();
		this.slideMastersFactory.build();
		this.slideFactory.build();
		tableStylesFactory.build(this.content, this.args);
		themeFactory.build(this.content, this.args);
		viewPropsFactory.build(this.content, this.args);
	}

	addSlide(slideName, layoutName) {
		let rId = this.pptRelsFactory.addPresentationToSlideRelationship(slideName);
		this.presentationFactory.addSlideRefIdToGlobalList(rId);
		this.slideFactory.addSlide(slideName, layoutName);

		return rId;
	}
}

module.exports.PptFactory = PptFactory;
