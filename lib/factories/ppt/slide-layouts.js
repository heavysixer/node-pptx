const convert = require('xml-js');

let build = (content, args) => {
	for (let x = 1; x < 12; x++) {
		content[`ppt/slideLayouts/_rels/slideLayout${x}.xml.rels`] = convert.json2xml(require(`../../fragments/ppt/slideLayouts/_rels/slideLayout${x}.xml.rels.js`), { compact: false });
		content[`ppt/slideLayouts/slideLayout${x}.xml`] = convert.json2xml(require(`../../fragments/ppt/slideLayouts/slideLayout${x}.xml.js`), { compact: false });
	}
};

module.exports = {
	build: build,
};
