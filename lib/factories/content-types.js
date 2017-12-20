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

        this.addDefaultMediaContentTypes();
    }

    addDefaultMediaContentTypes() {
        // it's OK to have these content type definitions in the file even if they are not used anywhere in the pptx
        this.addDefaultContentType('png', 'image/png');
        this.addDefaultContentType('gif', 'image/gif');
        this.addDefaultContentType('jpg', 'image/jpg');
    }

    addDefaultContentType(extension, contentType) {
        let contentTypeExists = false;

        this.content['[Content_Types].xml']['Types']['Default'].forEach(function(element) {
            if (element['$'].Extension === extension) {
                contentTypeExists = true;
                return;
            }
        });

        if (!contentTypeExists) {
            this.content['[Content_Types].xml']['Types']['Default'].push({
                $: {
                    Extension: extension,
                    ContentType: contentType,
                },
            });
        }
    }

    addContentType(partName, contentType) {
        let contentTypeExists = false;

        this.content['[Content_Types].xml']['Types']['Override'].forEach(function(element) {
            if (element['$'].PartName === partName && element['$'].ContentType === contentType) {
                contentTypeExists = true;
                return;
            }
        });

        if (!contentTypeExists) {
            this.content['[Content_Types].xml']['Types']['Override'].push({
                $: {
                    PartName: partName,
                    ContentType: contentType,
                },
            });
        }
    }
}

module.exports.ContentTypeFactory = ContentTypeFactory;
