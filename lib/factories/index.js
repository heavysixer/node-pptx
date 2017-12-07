/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
const convert = require('xml-js');
const powerPointStubs = require('../power-point-stubs');

let content = {};
let build = args => {
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
