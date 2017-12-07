const appFactory = require('./app.js');
const coreFactory = require('./core.js');

let build = (content, args) => {
	appFactory.build(content, args);
	coreFactory.build(content, args);
};

module.exports = {
	build: build,
};
