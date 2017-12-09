//let fragment = require('../../fragments/docProps/app.xml.js');
const convert = require('xml-js');
const fs = require('fs');

let build = (content, args) => {
	content['docProps/app.xml'] = fs.readFileSync(`${__dirname}../../../fragments/docProps/app.xml`);//convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
