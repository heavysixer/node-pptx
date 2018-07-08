const fs = require('fs');
const xml2js = require('xml2js');

class AppFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/docProps/app.xml`), (err, js) => {
            this.content['docProps/app.xml'] = js;
        });
    }

    setProperties(props) {
        if (props.company) this.content['docProps/app.xml']['Properties']['Company'] = props.company;
    }

    getProperties() {
        let props = {};
        let propertiesRef = this.content['docProps/app.xml']['Properties'];

        if (propertiesRef && propertiesRef['Company']) {
            props.company = propertiesRef['Company'];
        }

        return props;
    }

    incrementSlideCount() {
        if (this.content['docProps/app.xml']['Properties']['Slides'] === undefined) {
            this.content['docProps/app.xml']['Properties']['Slides'] = ['0'];
        }

        let slideCount = +this.content['docProps/app.xml']['Properties']['Slides'][0];
        this.content['docProps/app.xml']['Properties']['Slides'][0] = slideCount + 1;
    }

    decrementSlideCount() {
        if (this.content['docProps/app.xml']['Properties']['Slides'] !== undefined) {
            let slideCount = +this.content['docProps/app.xml']['Properties']['Slides'][0];
            this.content['docProps/app.xml']['Properties']['Slides'][0] = slideCount !== 0 ? slideCount - 1 : 0;
        }
    }

    setSlideCount(count) {
        if (this.content['docProps/app.xml']['Properties']['Slides'] === undefined) {
            this.content['docProps/app.xml']['Properties']['Slides'] = [];
        }

        this.content['docProps/app.xml']['Properties']['Slides'][0] = count;
    }

    // getSlideCount() {
    // 	return Object.keys(this.content).filter(function(key) {
    // 		return key.substr(0, 16) === 'ppt/slides/slide';
    // 	}).length;
    // }
}

module.exports.AppFactory = AppFactory;
