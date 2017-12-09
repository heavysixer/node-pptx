const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/docProps/core.xml`), (err, js) => {
		content['docProps/core.xml'] = js;
	});
};

module.exports = {
	build: build,
};