// TODO: these calculations are correct for 72dpi, but what if you're printing to a different pixel density?
class PptxUnitHelper {
    static fromInches(val) {
        return Math.floor(val * 914400);
    }

    static fromPoints(val) {
        return Math.floor(val * 914400 / 72);
    }

    static fromPixels(val) {
        return Math.floor(val * 914400 / 72);
    }

    static toPixels(val) {
        return val * 72 / 914400;
    }

    static toInches(val) {
        return val / 914400;
    }

    static toPoints(val) {
        return val / 914400 * 72;
    }

    static fromCm(val) {
        return Math.floor(val * 360000);
    }
}

const Units = {
    EMU: 914400,
    ONE_POINT: 12700,
};

module.exports.PptxUnitHelper = PptxUnitHelper;
module.exports.PptxUnitHelper.Units = Units;
