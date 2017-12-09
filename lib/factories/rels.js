const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../fragments/_rels/.rels`), (err, js) => {
		content['_rels/.rels'] = js;
	});
};

module.exports = {
	build: build,
};
