const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../fragments/[Content_Types].xml`), (err, js) => {
		content['[Content_Types].xml'] = js;
	});

	// ***TEST*** ---------------
	content['[Content_Types].xml']['Types']['Override'].push({
		$: {
			PartName: '/ppt/slides/slide2.xml',
			ContentType: 'application/vnd.openxmlformats-officedocument.presentationml.slide+xml',
		},
	});
	// --------------------------
};

module.exports = {
	build: build,
};
