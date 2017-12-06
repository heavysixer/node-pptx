const docPropsApp = require('./stub-fragments/docProps/app.xml.js');
const docPropsCore = require('./stub-fragments/docProps/core.xml.js');

const slideLayout1 = require('./stub-fragments/ppt/slideLayouts/slideLayout1.xml.js');
const slideLayout2 = require('./stub-fragments/ppt/slideLayouts/slideLayout2.xml.js');
const slideLayout3 = require('./stub-fragments/ppt/slideLayouts/slideLayout3.xml.js');
const slideLayout4 = require('./stub-fragments/ppt/slideLayouts/slideLayout4.xml.js');
const slideLayout5 = require('./stub-fragments/ppt/slideLayouts/slideLayout5.xml.js');
const slideLayout6 = require('./stub-fragments/ppt/slideLayouts/slideLayout6.xml.js');
const slideLayout7 = require('./stub-fragments/ppt/slideLayouts/slideLayout7.xml.js');
const slideLayout8 = require('./stub-fragments/ppt/slideLayouts/slideLayout8.xml.js');
const slideLayout9 = require('./stub-fragments/ppt/slideLayouts/slideLayout9.xml.js');
const slideLayout10 = require('./stub-fragments/ppt/slideLayouts/slideLayout10.xml.js');
const slideLayout11 = require('./stub-fragments/ppt/slideLayouts/slideLayout11.xml.js');

const slideMaster1 = require('./stub-fragments/ppt/slideMasters/slideMaster1.xml.js');

const slide1 = require('./stub-fragments/ppt/slides/slide1.xml.js');
const theme1 = require('./stub-fragments/ppt/theme/theme1.xml.js');

const presentation = require('./stub-fragments/ppt/presentation.xml.js');
const presProps = require('./stub-fragments/ppt/presProps.xml.js');
const tableStyles = require('./stub-fragments/ppt/tableStyles.xml.js');
const viewProps = require('./stub-fragments/ppt/viewProps.xml.js');

const Content_Types = require('./stub-fragments/[Content_Types].xml.js');

module.exports.docProps = {};
module.exports.ppt = {};
module.exports.ppt.slideLayouts = {};
module.exports.ppt.slideMasters = {};
module.exports.ppt.slides = {};
module.exports.ppt.theme = {};

module.exports.docProps['app.xml.json'] = docPropsApp;
module.exports.docProps['core.xml.json'] = docPropsCore;

module.exports.ppt.slideLayouts['slideLayout1.xml.json'] = slideLayout1;
module.exports.ppt.slideLayouts['slideLayout2.xml.json'] = slideLayout2;
module.exports.ppt.slideLayouts['slideLayout3.xml.json'] = slideLayout3;
module.exports.ppt.slideLayouts['slideLayout4.xml.json'] = slideLayout4;
module.exports.ppt.slideLayouts['slideLayout5.xml.json'] = slideLayout5;
module.exports.ppt.slideLayouts['slideLayout6.xml.json'] = slideLayout6;
module.exports.ppt.slideLayouts['slideLayout7.xml.json'] = slideLayout7;
module.exports.ppt.slideLayouts['slideLayout8.xml.json'] = slideLayout8;
module.exports.ppt.slideLayouts['slideLayout9.xml.json'] = slideLayout9;
module.exports.ppt.slideLayouts['slideLayout10.xml.json'] = slideLayout10;
module.exports.ppt.slideLayouts['slideLayout11.xml.json'] = slideLayout11;

module.exports.ppt.slideMasters['slideMaster1.xml.json'] = slideMaster1;

module.exports.ppt.slides['slide1.xml.json'] = slide1;

module.exports.ppt.theme['theme1.xml.json'] = theme1;
module.exports.ppt['presentation.xml.json'] = presentation;
module.exports.ppt['presProps.xml.json'] = presProps;
module.exports.ppt['tableStyles.xml.json'] = tableStyles;
module.exports.ppt['viewProps.xml.json'] = viewProps;

module.exports['[Content_Types].xml'] = Content_Types;
