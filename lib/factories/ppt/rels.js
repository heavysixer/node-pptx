const fs = require('fs');
const xml2js = require('xml2js');

class PptRelsFactory {
	constructor(parentFactory, args) {
		this.parentFactory = parentFactory;
		this.content = parentFactory.content;
		this.args = args;
	}

	build() {
		xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/_rels/presentation.xml.rels`), (err, js) => {
			this.content['ppt/_rels/presentation.xml.rels'] = js;
		});

		// ***TEST*** ----------------------
		// let rId = `rId${this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].length + 1}`;
		//
		// this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].push({
		// 	$: {
		// 		Id: rId,
		// 		Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
		// 		Target: `slides/slide2.xml`,
		// 	},
		// });
		//----------------------------------
	}

	addPresentationToSlideRelationship(slideName) {
		let rId = `rId${this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].length + 1}`;

		this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].push({
			$: {
				Id: rId,
				Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
				Target: `slides/${slideName}.xml`,
			},
		});

		return rId;
	}
}

module.exports.PptRelsFactory = PptRelsFactory;
