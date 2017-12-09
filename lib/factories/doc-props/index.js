// TODO: convert to class...

const appFactory = require('./app.js');
const coreFactory = require('./core.js');
const fs = require('fs');

let build = (content, args) => {
	appFactory.build(content, args);
	coreFactory.build(content, args);

	content['docProps/thumbnail.jpeg'] = fs.readFileSync(`${__dirname}../../../fragments/docProps/thumbnail.jpeg`);
};

let setProperties = (content, props) => {
	coreFactory.setProperties(content, props);
	appFactory.setProperties(content, props);
};

let getProperties = content => {
	let coreProps = coreFactory.getProperties(content);
	let appProps = appFactory.getProperties(content);

	return {
		company: appProps.company,
		title: coreProps.title,
		author: coreProps.author,
		revision: coreProps.revision,
		subject: coreProps.subject,
	};
};

module.exports = {
	build: build,
	setProperties: setProperties,
	getProperties: getProperties,
};
