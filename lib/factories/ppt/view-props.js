const fs = require('fs');
const xml2js = require('xml2js');

class ViewPropsFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/viewProps.xml`), (err, js) => {
            this.content['ppt/viewProps.xml'] = js;
        });
    }
}

module.exports.ViewPropsFactory = ViewPropsFactory;
