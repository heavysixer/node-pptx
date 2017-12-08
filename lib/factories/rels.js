let fragment = require('../fragments/_rels/.rels.xml.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['_rels/.rels'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
