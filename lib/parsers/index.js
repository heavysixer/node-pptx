/*
  Parsers take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/

module.exports = {
	contentType: require('./content-types.js'),
	docProps: require('./doc-props'),
	rels: require('./rels.js'),
	ppt: require('./ppt'),
};
