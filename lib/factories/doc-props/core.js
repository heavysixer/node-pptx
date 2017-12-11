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
    }

    setProperties(props) {
        // TODO: not sure why, but setting the title causes a corrupt file even though the output XML looks OK...
        //if (props.title) this.content['docProps/core.xml']['cp:coreProperties']['dc:title'] = props.title;
        if (props.author) this.content['docProps/core.xml']['cp:coreProperties']['dc:creator'] = props.author;
        //if (props.revision) this.content['docProps/core.xml']['cp:coreProperties']['dc:revision'] = props.revision;
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
}

module.exports.CoreFactory = CoreFactory;
