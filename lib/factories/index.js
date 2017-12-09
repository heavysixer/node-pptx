/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
let { ContentTypeFactory } = require('./content-types');
let { DocPropsFactory } = require('./doc-props');
let { PptFactory } = require('./ppt');
let { RelsFactory } = require('./rels');
let { Slide } = require('../slide');

class PowerPointFactory {
	constructor(presentation, args) {
		this.content = presentation.content;
		this.presentation = presentation;
		this.args = args;
		this.contentTypeFactory = new ContentTypeFactory(this, args);
		this.docPropsFactory = new DocPropsFactory(this, args);
		this.relsFactory = new RelsFactory(this, args);
		this.pptFactory = new PptFactory(this, args);
	}

	build() {
		// Build the default document structure needed by a presentation.
		// The user will have the ability to override any of these details but
		// this will provide a collection of sensible defaults.
		this.contentTypeFactory.build();
		this.docPropsFactory.build();
		this.relsFactory.build();
		this.pptFactory.build();
	}

	setPowerPointProperties(props) {
		this.docPropsFactory.setProperties(props);
	}

	getPowerPointProperties() {
		return this.docPropsFactory.getProperties();
	}

	addSlide(slideName, layoutName) {
		let slide = new Slide({ presentation: this.presentation, content: this.content, name: slideName, layoutName: layoutName });

		this.contentTypeFactory.addContentType(
			`/ppt/slides/${slideName}.xml`,
			'application/vnd.openxmlformats-officedocument.presentationml.slide+xml'
		);

		this.docPropsFactory.incrementSlideCount();
		slide.rId = this.pptFactory.addSlide(slideName, layoutName);

		return slide;
	}
}

module.exports.PowerPointFactory = PowerPointFactory;
