/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/

const presPropsFactory = require('./pres-props');
const presentationFactory = require('./presentation');
const relsFactory = require('./rels');
const slideLayoutsFactory = require('./slide-layouts');
const slideMastersFactory = require('./slide-masters');
const slideFactory = require('./slides');
const tableStylesFactory = require('./table-styles');
const themeFactory = require('./theme');
const viewPropsFactory = require('./view-props');

let build = (content, args) => {
	presPropsFactory.build(content, args);
	presentationFactory.build(content, args);
	relsFactory.build(content, args);
	slideLayoutsFactory.build(content, args);
	slideMastersFactory.build(content, args);
	slideFactory.build(content, args);
	tableStylesFactory.build(content, args);
	themeFactory.build(content, args);
	viewPropsFactory.build(content, args);
};

module.exports = {
	build: build,
};
