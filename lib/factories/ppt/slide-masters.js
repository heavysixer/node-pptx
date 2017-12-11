const fs = require('fs');
const xml2js = require('xml2js');

class SlideMastersFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slideMasters/_rels/slideMaster1.xml.rels`), (err, js) => {
            this.content['ppt/slideMasters/_rels/slideMaster1.xml.rels'] = js;
        });

        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slideMasters/slideMaster1.xml`), (err, js) => {
            this.content['ppt/slideMasters/slideMaster1.xml'] = js;
        });
    }
}

module.exports.SlideMastersFactory = SlideMastersFactory;
