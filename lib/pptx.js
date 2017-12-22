let { Slide } = require('./slide');

module.exports = {
    Presentation: require('./presentation'),
    Slide: Slide,
    ShapeTypes: require('./shape-types').ShapeTypes, // TODO: I don't like this here...
    SchemeColors: require('./color-types').SchemeColors,
};
