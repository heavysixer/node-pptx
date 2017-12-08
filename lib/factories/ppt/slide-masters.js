const convert = require('xml-js');

const relsFragment = require('../../fragments/ppt/slideMasters/_rels/slideMaster1.xml.rels.js');
const fragment = require('../../fragments/ppt/slideMasters/slideMaster1.xml.js');

let build = (content, args) => {
	content['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = convert.json2xml(relsFragment, { compact: false });
	content['ppt/slideMasters/slideMaster1.xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
