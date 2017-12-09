const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/presentation.xml`), (err, js) => {
		content['ppt/presentation.xml'] = js;
	});
	// ***TEST*** ---------------
	// I removed the "hard-coded" second slide entry in the presentation.xml stub; let's see if we can add it dynamically and have it still generate a valid two-slide PowerPoint...
	// let maxId = 0;
	// let testContent;
	//
	// xml2js.parseString(content['ppt/presentation.xml'], (err, js) => {
	// 	testContent = js;
	// });
	//
	// console.log('test fragment as json object = ', testContent);
	// content['ppt/presentation.xml'] = testContent;
	//
	// console.log('xml', content['ppt/presentation.xml']['p:presentation']);
	//
	// content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].forEach(node => {
	// 	if (+node['$']['id'] > maxId) {
	// 		maxId = +node['$']['id'];
	// 	}
	// });
	//
	// console.log(`maxId = ${maxId}`);
	//
	// content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].push({
	// 	$: {
	// 		id: `${+maxId + 1}`,
	// 		'r:id': 'rId7', // <--- this is a test for now since we know this will be the ID //rId,
	// 	},
	// });
	// --------------------------

	// ***TEST*** ----------------------
	let maxId = 0;

	content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].forEach(function(node) {
		if (+node['$']['id'] > maxId) maxId = +node['$']['id'];
	});

	content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].push({
		$: {
			id: `${+maxId + 1}`,
			'r:id': 'rId7', //rId,
		},
	});
	//----------------------------------
};

module.exports = {
	build: build,
};
