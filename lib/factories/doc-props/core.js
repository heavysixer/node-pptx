// TODO: convert to class...

const fs = require('fs');
const xml2js = require('xml2js');

let build = (content, args) => {
	xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/docProps/core.xml`), (err, js) => {
		content['docProps/core.xml'] = js;
	});
};

let setProperties = (content, props) => {
	// TODO: not sure why, but setting the title causes a corrupt file even though the output XML looks OK...
	//if (props.title) content['docProps/core.xml']['cp:coreProperties']['dc:title'] = props.title;
	if (props.author) content['docProps/core.xml']['cp:coreProperties']['dc:creator'] = props.author;
	//if (props.revision) content['docProps/core.xml']['cp:coreProperties']['dc:revision'] = props.revision;
	if (props.subject) content['docProps/core.xml']['cp:coreProperties']['dc:subject'] = props.subject;
};

let getProperties = content => {
	let props = {};

	props.title = content['docProps/core.xml']['cp:coreProperties']['dc:title'];
	props.author = content['docProps/core.xml']['cp:coreProperties']['dc:creator'];
	props.revision = content['docProps/core.xml']['cp:coreProperties']['dc:revision'];
	props.subject = content['docProps/core.xml']['cp:coreProperties']['dc:subject'];

	return props;
};

module.exports = {
	build: build,
	setProperties: setProperties,
	getProperties: getProperties,
};
