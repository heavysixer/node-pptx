let fragment = require('../../fragments/ppt/presProps.xml.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['ppt/presProps.xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
