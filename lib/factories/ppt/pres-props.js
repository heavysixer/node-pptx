const fs = require('fs');
const xml2js = require('xml2js');

class PresPropsFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/presProps.xml`), (err, js) => {
            this.content['ppt/presProps.xml'] = js;
        });
    }
}

module.exports.PresPropsFactory = PresPropsFactory;
