const fs = require('fs');
const xml2js = require('xml2js');

class PresentationFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/presentation.xml`), (err, js) => {
            this.content['ppt/presentation.xml'] = js;
        });
    }

    addSlideRefIdToGlobalList(rId) {
        let maxId = 0;

        this.content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].forEach(function(node) {
            if (+node['$']['id'] > maxId) maxId = +node['$']['id'];
        });

        this.content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].push({
            $: {
                id: `${+maxId + 1}`,
                'r:id': rId,
            },
        });
    }

    setLayout(layout) {
        this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].cx = layout.width;
        this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].cy = layout.height;
        this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].type = layout.type;

        // note: seems like there is no "type" attribute on the note sizes
        this.content['ppt/presentation.xml']['p:presentation']['p:notesSz'][0]['$'].cx = layout.width;
        this.content['ppt/presentation.xml']['p:presentation']['p:notesSz'][0]['$'].cy = layout.height;

        delete this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$']['type'];
    }
}

module.exports.PresentationFactory = PresentationFactory;
