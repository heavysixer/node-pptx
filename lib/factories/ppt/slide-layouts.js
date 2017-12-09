const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	for (let x = 1; x < 12; x++) {
		xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slideLayouts/_rels/slideLayout${x}.xml.rels`), (err, js) => {
			content[`ppt/slideLayouts/_rels/slideLayout${x}.xml.rels`] = js;
		});

		xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slideLayouts/slideLayout${x}.xml`), (err, js) => {
			content[`ppt/slideLayouts/slideLayout${x}.xml`] = js;
		});
	}
};

module.exports = {
	build: build,
};
