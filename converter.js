// I made this converter to debug unit positions/dimensions of elements on slides.
// Converts from pixels, inches, or points into DXA's - PowerPoint's unit of measurement.
//
// Usage example:
//
// node converter.js --from-pixels=1 --from-inches=2 --from-points=72
//
// Output:
//
// 1 pixel(s) = 12700 dxa(s)
// 2 inch(es) = 1828800 dxa(s)
// 72 point(s) = 914400 dxa(s)

let { PptxUnitHelper } = require('./lib/helpers/unit-helper');
let argv = require('yargs').argv;
let fromPixels;
let fromInches;
let fromPoints;

if (commandLineParamsOK()) {
    if (fromPixels !== undefined) {
        if (isNaN(Number(fromPixels))) {
            console.log('Value for --from-pixels is not a number.');
        } else {
            console.log(`${fromPixels} pixel(s) = ${PptxUnitHelper.fromPixels(fromPixels)} dxa(s)`);
        }
    }

    if (fromInches !== undefined) {
        if (isNaN(Number(fromInches))) {
            console.log('Value for --from-inches is not a number.');
        } else {
            console.log(`${fromInches} inch(es) = ${PptxUnitHelper.fromInches(fromInches)} dxa(s)`);
        }
    }

    if (fromPoints !== undefined) {
        if (isNaN(Number(fromPoints))) {
            console.log('Value for --from-points is not a number.');
        } else {
            console.log(`${fromPoints} point(s) = ${PptxUnitHelper.fromPoints(fromPoints)} dxa(s)`);
        }
    }
}

function commandLineParamsOK() {
    fromPixels = argv['from-pixels'];
    fromInches = argv['from-inches'];
    fromPoints = argv['from-points'];

    if (
        (fromPixels === undefined || isNaN(Number(fromPixels))) &&
        (fromInches === undefined || isNaN(Number(fromInches))) &&
        (fromPoints === undefined || isNaN(Number(fromPoints)))
    ) {
        console.log('Usage: node converter.js [--from-pixels=<PIXELS>] [--from-inches=<INCHES>] [--from-points=<POINTS>]');

        return false;
    }

    return true;
}
