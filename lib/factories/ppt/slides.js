const fs = require('fs');
const xml2js = require('xml2js');

class SlideFactory {
	constructor(parentFactory, args) {
		this.parentFactory = parentFactory;
		this.content = parentFactory.content;
		this.args = args;
	}

	build() {
		xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/_rels/slide1.xml.rels`), (err, js) => {
			this.content['ppt/slides/_rels/slide1.xml.rels'] = js;
		});

		xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/slide1.xml`), (err, js) => {
			this.content['ppt/slides/slide1.xml'] = js;
		});

		// ***TEST*** ---------------
		// this.content['ppt/slides/_rels/slide2.xml.rels'] = {
		// 	Relationships: {
		// 		$: {
		// 			xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
		// 		},
		// 		Relationship: [
		// 			{
		// 				$: {
		// 					Id: 'rId1',
		// 					Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
		// 					Target: '../slideLayouts/slideLayout1.xml',
		// 				},
		// 			},
		// 		],
		// 	},
		// };
		//
		// // add the actual slide itself (use slideLayout1 as the source)
		// let layoutKey = 'ppt/slideLayouts/slideLayout1.xml';
		// let sld = this.content[layoutKey]['p:sldLayout'];
		//
		// delete sld['$']['preserve'];
		// delete sld['$']['type'];
		//
		// // if you just want a copy of slide 1, uncomment this line below and comment out the three lines above
		// //let sld = this.content['ppt/slides/slide1.xml']['p:sld'];
		//
		// let slideContent = {
		// 	'p:sld': sld,
		// };
		//
		// slideContent = JSON.parse(JSON.stringify(slideContent));
		//
		// this.content['ppt/slides/slide2.xml'] = slideContent; //{ "p:sld": slideContent};
		// --------------------------
	}

	addSlide(slideName, layoutName) {
		let relsKey = `ppt/slides/_rels/${slideName}.xml.rels`;
		let slideKey = `ppt/slides/${slideName}.xml`;
		let layoutKey = `ppt/slideLayouts/${layoutName}.xml`;

		this.content[relsKey] = {
			Relationships: {
				$: {
					xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
				},
				Relationship: [
					{
						$: {
							Id: 'rId1',
							Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
							Target: `../slideLayouts/${layoutName}.xml`,
						},
					},
				],
			},
		};

		// add the actual slide itself (use the layout template as the source; note: layout templates are NOT the same as master slide templates)
		let baseSlideContent = this.content[layoutKey]['p:sldLayout'];

		delete baseSlideContent['$']['preserve'];
		delete baseSlideContent['$']['type'];

		let slideContent = {
			'p:sld': baseSlideContent,
		};

		slideContent = JSON.parse(JSON.stringify(slideContent));

		this.content[slideKey] = slideContent;
	}
}

module.exports.SlideFactory = SlideFactory;
