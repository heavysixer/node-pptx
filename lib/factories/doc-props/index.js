const appFactory = require('./app.js');
const coreFactory = require('./core.js');
const fs = require('fs');

let build = (content, args) => {
	appFactory.build(content, args);
	coreFactory.build(content, args);

	content["docProps/thumbnail.jpeg"] = fs.readFileSync(`${__dirname}../../../fragments/docProps/thumbnail.jpeg`);
};

module.exports = {
	build: build,
};
