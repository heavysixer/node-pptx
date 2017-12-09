const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	//	content['ppt/_rels/presentation.xml.rels'] = fs.readFileSync(`${__dirname}../../../fragments/ppt/_rels/presentation.xml.rels`);//convert.json2xml(fragment, { compact: false });
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/_rels/presentation.xml.rels`), (err, js) => {
		content['ppt/_rels/presentation.xml.rels'] = js;
	});
};

module.exports = {
	build: build,
};
