/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
const contentTypeFactory = require('./content-types');
const docPropsFactory = require('./doc-props');
const pptFactory = require('./ppt');
const relsFactory = require('./rels');

let build = (content, args) => {
	// Build the default document structure needed by a presentation.
	// The user will have the ability to override any of these details but
	// this will provide a collection of sensible defaults.
	contentTypeFactory.build(content, args);
	docPropsFactory.build(content, args);
	relsFactory.build(content, args);
	pptFactory.build(content, args);

	return content;
};

module.exports = {
	build: build,
};
