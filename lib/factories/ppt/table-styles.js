const fs = require('fs');
const xml2js = require('xml2js');

class TableStylesFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/tableStyles.xml`), (err, js) => {
            this.content['ppt/tableStyles.xml'] = js;
        });
    }
}

module.exports.TableStylesFactory = TableStylesFactory;
