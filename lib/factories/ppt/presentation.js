let fragment = require('../../fragments/ppt/presentation.xml.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['ppt/presentation.xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
