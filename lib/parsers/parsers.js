/*
  Parsers take a JSON payload and return XML fragments with the attributes of the
  JSON applied within.
*/

module.exports = {
	contentType: require('./content-types.js'),
	docProps: require('./doc-props.js'),
	rels: require('./rels.js'),
	ppt: require('./ppt/ppt.js'),
};
