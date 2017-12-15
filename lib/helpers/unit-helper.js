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

    static fromCm(val) {
        return Math.floor(val * 360000);
    }
}

module.exports.PptxUnitHelper = PptxUnitHelper;
