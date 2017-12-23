const fs = require('fs');
const xml2js = require('xml2js');

class SlideLayoutsFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slideLayouts/_rels/slideLayout1.xml.rels`), (err, js) => {
            this.content[`ppt/slideLayouts/_rels/slideLayout1.xml.rels`] = js;
        });

        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slideLayouts/slideLayout1.xml`), (err, js) => {
            this.content[`ppt/slideLayouts/slideLayout1.xml`] = js;
        });
    }
}

module.exports.SlideLayoutsFactory = SlideLayoutsFactory;
