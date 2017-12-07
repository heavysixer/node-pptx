const convert = require('xml-js');

const relsFragment = require('../../fragments/ppt/slides/_rels/slide1.xml.rels.js');
const fragment = require('../../fragments/ppt/slides/slide1.xml.js');

let build = (content, args) => {
	content['ppt/slides/_rels/slide1.xml.rels'] = convert.json2xml(relsFragment, { compact: false });
	content['ppt/slides/slide1.xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
