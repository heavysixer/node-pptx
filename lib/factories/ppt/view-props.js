let fragment = require('../../fragments/ppt/viewProps.xml.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['ppt/viewProps.xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
