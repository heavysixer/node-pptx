const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/docProps/app.xml`), (err, js) => {
		content['docProps/app.xml'] = js;
	});

	// ***TEST*** ----------------------
	content['docProps/app.xml']['Properties']['Slides'][0] = 2; // slide count
	//----------------------------------
};

module.exports = {
	build: build,
};
