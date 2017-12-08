let fragment = require('../../fragments/ppt/_rels/presentation.xml.rels.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['ppt/_rels/presentation.xml.rels'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
