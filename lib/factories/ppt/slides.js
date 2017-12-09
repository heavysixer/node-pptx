const convert = require('xml-js');
const fs = require('fs');

const relsFragment = fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/_rels/slide1.xml.rels`);//require('../../fragments/ppt/slides/_rels/slide1.xml.rels.js');
const fragment = fs.readFileSync(`${__dirname}../../../fragments/ppt/slides/slide1.xml`);//require('../../fragments/ppt/slides/slide1.xml.js');

//const relsFragmentSlide2Test = require('../../fragments/ppt/slides/_rels/slide2.xml.rels.js');
//const fragmentSlide2Test = require('../../fragments/ppt/slides/slide2.xml.js');

let build = (content, args) => {
	content['ppt/slides/_rels/slide1.xml.rels'] = relsFragment;//convert.json2xml(relsFragment, { compact: false });
//	content['ppt/slides/_rels/slide2.xml.rels'] = convert.json2xml(relsFragmentSlide2Test, { compact: false });
	content['ppt/slides/slide1.xml'] = fragment;//convert.json2xml(fragment, { compact: false });
//	content['ppt/slides/slide2.xml'] = convert.json2xml(fragmentSlide2Test, { compact: false });
};

module.exports = {
	build: build,
};
