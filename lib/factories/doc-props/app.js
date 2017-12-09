// TODO: convert to class...

const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/docProps/app.xml`), (err, js) => {
		content['docProps/app.xml'] = js;
	});

	// ***TEST*** ----------------------
	content['docProps/app.xml']['Properties']['Slides'][0] = 2; // slide count
	//----------------------------------
};

let setProperties = (content, props) => {
	if (props.company) content['docProps/app.xml']['Properties']['Company'] = props.company;
};

let getProperties = content => {
	let props = {};

	try {
		props.company = content['docProps/app.xml']['Properties']['Company'];
	} catch (err) {} // this is OK

	return props;
};

module.exports = {
	build: build,
	setProperties: setProperties,
	getProperties: getProperties,
};
