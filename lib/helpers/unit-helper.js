class PptxUnitHelper {
    static inch(val) {
        return Math.floor(val * 914400);
    }

    static point(val) {
        return Math.floor(val * 914400 / 72);
    }

    static px(val) {
        return Math.floor(val * 914400 / 72);
    }

    static cm(val) {
        return Math.floor(val * 360000);
    }
}

module.exports.PptxUnitHelper = PptxUnitHelper;

