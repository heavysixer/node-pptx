/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
const convert = require('xml-js');
const powerPointStubs = require('../power-point-stubs');
const contentTypeFactory = require('./content-types');
const docPropsFactory = require('./doc-props');
const relsFactory = require('./rels');

let build = (content, args) => {
	// Build the default document structure needed by a presentation.
	// The user will have the ability to override any of these details but
	// this will provide a collection of sensible defaults.
	contentTypeFactory.build(content, args);
	docPropsFactory.build(content, args);
	relsFactory.build(content, args);

	for (let key in powerPointStubs.fragments) {
		if (Object.prototype.hasOwnProperty.call(powerPointStubs.fragments, key)) {
			content[key] = convert.json2xml(powerPointStubs.fragments[key], { compact: false });
		}
	}
	return content;
};

module.exports = {
	build: build,
	contentType: require('./content-types.js'),
	docProps: require('./doc-props'),
	rels: require('./rels.js'),
	ppt: require('./ppt'),
};
