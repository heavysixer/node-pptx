const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/presProps.xml`), (err, js) => {
		content['ppt/presProps.xml'] = js;
	});
};

module.exports = {
	build: build,
};
