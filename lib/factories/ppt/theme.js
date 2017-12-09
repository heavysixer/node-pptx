//let fragment = require('../../fragments/ppt/theme/theme1.xml.js');
const convert = require('xml-js');
const fs = require('fs');

let build = (content, args) => {
	content['ppt/theme/theme1.xml'] = fs.readFileSync(`${__dirname}../../../fragments/ppt/theme/theme1.xml`);//convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
