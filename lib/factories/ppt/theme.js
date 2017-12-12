const fs = require('fs');
const xml2js = require('xml2js');

class ThemeFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/theme/theme1.xml`), (err, js) => {
            this.content['ppt/theme/theme1.xml'] = js;
        });
    }
}

module.exports.ThemeFactory = ThemeFactory;
