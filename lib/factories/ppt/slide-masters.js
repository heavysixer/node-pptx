const convert = require('xml-js');
const fs = require('fs');

const relsFragment = fs.readFileSync(`${__dirname}../../../fragments/ppt/slideMasters/_rels/slideMaster1.xml.rels`);//require('../../fragments/ppt/slideMasters/_rels/slideMaster1.xml.rels.js');
const fragment = fs.readFileSync(`${__dirname}../../../fragments/ppt/slideMasters/slideMaster1.xml`);//require('../../fragments/ppt/slideMasters/slideMaster1.xml.js');

let build = (content, args) => {
	content['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = relsFragment;//convert.json2xml(relsFragment, { compact: false });
	content['ppt/slideMasters/slideMaster1.xml'] = fragment;//convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
