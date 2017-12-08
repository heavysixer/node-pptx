let fragment = require('../../fragments/ppt/tableStyles.xml.js');
const convert = require('xml-js');

let build = (content, args) => {
	content['ppt/tableStyles.xml'] = convert.json2xml(fragment, { compact: false });
};

module.exports = {
	build: build,
};
