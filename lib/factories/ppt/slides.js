const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/_rels/slide1.xml.rels`), (err, js) => {
		content['ppt/slides/_rels/slide1.xml.rels'] = js;
	});

	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/slide1.xml`), (err, js) => {
		content['ppt/slides/slide1.xml'] = js;
	});

	// ***TEST*** ---------------
	content['ppt/slides/_rels/slide2.xml.rels'] = {
		Relationships: {
			$: {
				xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
			},
			Relationship: [
				{
					$: {
						Id: 'rId1',
						Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
						Target: '../slideLayouts/slideLayout1.xml',
					},
				},
			],
		},
	};

	// add the actual slide itself (use slideLayout1 as the source)
	let layoutKey = 'ppt/slideLayouts/slideLayout1.xml';
	let sld = content[layoutKey]['p:sldLayout'];

	delete sld['$']['preserve'];
	delete sld['$']['type'];

	// if you just want a copy of slide 1, uncomment this line below and comment out the three lines above
	//let sld = content['ppt/slides/slide1.xml']['p:sld'];

	let slideContent = {
		'p:sld': sld,
	};

	slideContent = JSON.parse(JSON.stringify(slideContent));

	content['ppt/slides/slide2.xml'] = slideContent; //{ "p:sld": slideContent};
	// --------------------------
};

module.exports = {
	build: build,
};
