const fs = require('fs');
const xml2js = require('xml2js');

class CoreFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/docProps/core.xml`), (err, js) => {
            this.content['docProps/core.xml'] = js;
        });

        //this.updateTimeStamps(); // FIXME: doesn't work for some reason...
    }

    setProperties(props) {
        if (props.title) this.content['docProps/core.xml']['cp:coreProperties']['dc:title'] = props.title;
        if (props.author) this.content['docProps/core.xml']['cp:coreProperties']['dc:creator'] = props.author;
        //if (props.revision) this.content['docProps/core.xml']['cp:coreProperties']['dc:revision'] = props.revision; // FIXME: doesn't work for some reason, causes corrupt file
        if (props.subject) this.content['docProps/core.xml']['cp:coreProperties']['dc:subject'] = props.subject;
    }

    getProperties() {
        let props = {};

        props.title = this.content['docProps/core.xml']['cp:coreProperties']['dc:title'];
        props.author = this.content['docProps/core.xml']['cp:coreProperties']['dc:creator'];
        props.revision = this.content['docProps/core.xml']['cp:coreProperties']['dc:revision'];
        props.subject = this.content['docProps/core.xml']['cp:coreProperties']['dc:subject'];

        return props;
    }

    updateTimeStamps() {
        this.updateCreatedDateTimeStamp();
        this.updatedModifiedDateTimeStamp();
    }

    // for now we won't need to update created date without modified date because every save is considered a "new" pptx, but these functions are separated for future support
    updateCreatedDateTimeStamp() {
        this.content['docProps/core.xml']['cp:coreProperties']['dcterms:created'] = new Date().toISOString();
    }

    updatedModifiedDateTimeStamp() {
        this.content['docProps/core.xml']['cp:coreProperties']['dcterms:modified'] = new Date().toISOString();
    }
}

module.exports.CoreFactory = CoreFactory;
