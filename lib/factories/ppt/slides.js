const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/_rels/slide1.xml.rels`), (err, js) => {
		content['ppt/slides/_rels/slide1.xml.rels'] = js;
	});

	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/slide1.xml`), (err, js) => {
		content['ppt/slides/slide1.xml'] = js;
	});
};

module.exports = {
	build: build,
};
