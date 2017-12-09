const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slideMasters/_rels/slideMaster1.xml.rels`), (err, js) => {
		content['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = js;
	});

	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slideMasters/slideMaster1.xml`), (err, js) => {
		content['ppt/slideMasters/slideMaster1.xml'] = js;
	});
};

module.exports = {
	build: build,
};
