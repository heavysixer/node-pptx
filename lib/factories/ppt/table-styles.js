//let fragment = require('../../fragments/ppt/tableStyles.xml.js');
const convert = require('xml-js');
const fs = require('fs');

let build = (content, args) => {
	content['ppt/tableStyles.xml'] = fs.readFileSync(`${__dirname}../../../fragments/ppt/tableStyles.xml`);//convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
