const fs = require('fs');
const xml2js = require('xml2js');

class ContentTypeFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../fragments/[Content_Types].xml`), (err, js) => {
            this.content['[Content_Types].xml'] = js;
        });
    }

    addContentType(partName, contentType) {
        this.content['[Content_Types].xml']['Types']['Override'].push({
            $: {
                PartName: partName,
                ContentType: contentType,
            },
        });
    }
}

module.exports.ContentTypeFactory = ContentTypeFactory;
