//let fragment = require('../../fragments/docProps/core.xml.js');
const convert = require('xml-js');
const fs = require('fs');

let build = (content, args) => {
	content['docProps/core.xml'] = fs.readFileSync(`${__dirname}../../../fragments/docProps/core.xml`);//convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
