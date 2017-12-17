let { Slide } = require('./slide');

module.exports = {
    Presentation: require('./presentation'),
    Slide: Slide,
    ShapeTypes: require('./shape-types').ShapeTypes, // TODO: I don't like this here...
};

// Some aliases I like for shape types (Greg D.):
module.exports.ShapeTypes.TRIANGLE = module.exports.ShapeTypes.ISOSCELES_TRIANGLE;
module.exports.ShapeTypes.ELLIPSE = module.exports.ShapeTypes.OVAL;
