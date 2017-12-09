const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/_rels/presentation.xml.rels`), (err, js) => {
		content['ppt/_rels/presentation.xml.rels'] = js;
	});

	// ***TEST*** ----------------------
	let rId = `rId${content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].length + 1}`;

	content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].push({
		$: {
			Id: rId,
			Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
			Target: `slides/slide2.xml`,
		},
	});
	//----------------------------------
};

module.exports = {
	build: build,
};
