let fragment = require('../../fragments/docProps/core.xml.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['docProps/core.xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
