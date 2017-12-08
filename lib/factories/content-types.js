let fragment = require('../fragments/[Content_Types].xml.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['[Content_Types].xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
