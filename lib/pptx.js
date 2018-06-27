let POWERPOINT_LAYOUTS = require('./layout-types').Layouts;
let LayoutTypeStrings = {};

// This is so you can do stuff like "presentation.layout(PPTX.LayoutTypes.LAYOUT_WIDE);"
// You could also just do "presentation.layout('LAYOUT_WIDE')" but I much prefer the "enum" method.
// The enum name will always match the name of the keys in layout-types.js (e.g. LAYOUT_4x3, LAYOUT_16x9, etc.)
Object.keys(POWERPOINT_LAYOUTS).forEach(key => {
    LayoutTypeStrings[key] = key;
});

module.exports = {
    Presentation: require('./presentation').Presentation,
    Composer: require('./composer').Composer,
    Slide: require('./slide').Slide,
    ShapeTypes: require('./shape-types').ShapeTypes, // TODO: I don't like this here...
    SchemeColors: require('./color-types').SchemeColors,
    LayoutTypes: LayoutTypeStrings,
    BulletTypes: require('./bullet-types').BulletTypes,
};
