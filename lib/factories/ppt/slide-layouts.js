const fs = require('fs');
const xml2js = require('xml2js');

class SlideLayoutsFactory {
	constructor(parentFactory, args) {
		this.parentFactory = parentFactory;
		this.content = parentFactory.content;
		this.args = args;
	}

	build() {
		for (let x = 1; x < 12; x++) {
			xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slideLayouts/_rels/slideLayout${x}.xml.rels`), (err, js) => {
				this.content[`ppt/slideLayouts/_rels/slideLayout${x}.xml.rels`] = js;
			});

			xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slideLayouts/slideLayout${x}.xml`), (err, js) => {
				this.content[`ppt/slideLayouts/slideLayout${x}.xml`] = js;
			});
		}
	}
}

module.exports.SlideLayoutsFactory = SlideLayoutsFactory;
