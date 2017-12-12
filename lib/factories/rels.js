const fs = require('fs');
const xml2js = require('xml2js');

class RelsFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../fragments/_rels/.rels`), (err, js) => {
            this.content['_rels/.rels'] = js;
        });
    }
}

module.exports.RelsFactory = RelsFactory;
