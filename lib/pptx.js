let POWERPOINT_LAYOUTS = require('./layout-types').Layouts;
let LayoutTypeStrings = {};

// This is so you can do stuff like "presentation.layout(PPTX.LayoutTypes.LAYOUT_WIDE);"
// You could also just do "presentation.layout('LAYOUT_WIDE')" but I much prefer the "enum" method.
// The enum name will always match the name of the keys in layout-types.js (e.g. LAYOUT_4x3, LAYOUT_16x9, etc.)
Object.keys(POWERPOINT_LAYOUTS).forEach(key => {
    LayoutTypeStrings[key] = key;
});

// Sorry lint, but I see no other way to fix the mod operator. What is the "%" operator in javascript? Is it modulo, or remainder? (There's a difference!)
// When dealing with positive integers, the modulo and remainder operations are the same; but when dealing with negative numbers, such as "-5 % 4", the
// remainder operation results in -1, but the modulo operation results in 3 (which is correct, try it on a calculator). When dealing with negative numbers
// there seems to be different definitions of the modulo operation (given the context and programming language):
//
// https://en.wikipedia.org/wiki/Modulo_operation
//
// In my opinion, the description on this page captures the true operation the best and works with either operand being positive or negative:
//
// https://web.archive.org/web/20090717035140if_/javascript.about.com/od/problemsolving/a/modulobug.htm
//
// This matches Donald Knuth's equivalent formula, which is:
// r = a - b * floor(a / b)
//
// I used the following formula instead:
//
// r = ((a % b) + b) % b
//
// ...only because my speed tests showed it performed about twice as fast. Both should produce the exact same results.
//
// Why do you need to work with negative operand modulo operations, you ask? At this point, it's just one case, but more may come in the future: dealing
// with negative angles of rotation on the Shape object. Shape.rotation (prop or setter function) expects a value representing the number of degrees
// you want to rotate a shape. A positive value indicates a clockwise rotation, while a negative value represents a counter-clockwise rotation. While I
// could've manually checked for negative numbers and greater than 360 degree rotations, and handled each special case individually, it's simply a lot
// cleaner just to take the angle value provided by the caller, modulo it by 360, and be done. This simple formula takes care of all the special cases!
// Of course, the modulo operation needs to work like a calculator's modulo (not javascript's "%" operator), hence this function. Example: -90 degree
// rotation (so rotate 90 degrees counter-clockwise) == a 270 degree clockwise rotation, and also -90 MOD 360 == 270! Another example: 370 degree
// rotation is what? Well, you're going past the circle by 10 extra degrees, so a 370 degree rotation == 10 degrees, and also 370 MOD 360 == 10, obviously.
// What about -370? Same thing as -10, which is also +350, and -370 MOD 360 == 350! I like it when a single math formula handles the regular and
// special/edge cases at the same time. That way everything is guaranteed to be consistent.
//
// -Greg Dolley (9/1/2020)
// eslint-disable-next-line no-extend-native
Number.prototype.mod = function(n) {
    return ((this%n)+n)%n;
}

module.exports = {
    Presentation: require('./presentation').Presentation,
    Composer: require('./composer').Composer,
    Slide: require('./slide').Slide,
    ShapeTypes: require('./shape-types').ShapeTypes, // TODO: I don't like this here...
    SchemeColors: require('./color-types').SchemeColors,
    LayoutTypes: LayoutTypeStrings,
    BulletTypes: require('./bullet-types').BulletTypes,
};
