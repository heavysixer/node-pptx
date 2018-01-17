let { Presentation } = require('./presentation');

class Composer {
    constructor() {
        this.presentation = new Presentation();
    }

    getSlide(slideName) {
        return this.presentation.getSlide(slideName);
    }

    async load(filePath) {
        this.presentation.templateFilePath = filePath;

        await this.presentation.loadExistingPPTX();
        return this;
    }

    async compose(func) {
        await func(this.presentation);
        return this;
    }

    async save(destination) {
        await this.presentation.save(destination);
        return this;
    }
}

module.exports.Composer = Composer;
