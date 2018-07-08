const fs = require('fs');
const xml2js = require('xml2js');

let { PptxContentHelper } = require('../../helpers/pptx-content-helper');

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
        let maxId = 255; // slide ID #'s start at some magic number of 256 (so init to 255, then the first slide will have 256)
        let presentationContent = this.content['ppt/presentation.xml']['p:presentation'];

        if (presentationContent['p:sldIdLst'] === undefined) {
            // if we don't have a <p:sldIdLst> node yet (i.e. no slides), insert a new sldIdLst node under the sldMasterIdLst node
            let existingNodes = PptxContentHelper.extractNodes(presentationContent);
            let masterIdLstIndex = existingNodes.findIndex(node => node.key === 'p:sldMasterIdLst');

            presentationContent['p:sldMasterIdLst'] = existingNodes[masterIdLstIndex].node;

            existingNodes.splice(masterIdLstIndex, 1); // delete <p:sldMasterIdLst> from the list so the call to restoreNodes() doesn't add it again

            presentationContent['p:sldIdLst'] = [{}];
            presentationContent['p:sldIdLst'][0]['p:sldId'] = [];

            PptxContentHelper.restoreNodes(presentationContent, existingNodes);
        } else {
            if (presentationContent['p:sldIdLst'][0]['p:sldId'] !== undefined) {
                presentationContent['p:sldIdLst'][0]['p:sldId'].forEach(function(node) {
                    if (+node['$']['id'] > maxId) maxId = +node['$']['id'];
                });
            }
        }

        presentationContent['p:sldIdLst'][0]['p:sldId'].push({
            $: {
                id: `${+maxId + 1}`,
                'r:id': rId,
            },
        });
    }

    removeSlideRefIdFromGlobalList(rId) {
        let slideIdListIndex = -1;
        let presentationContent = this.content['ppt/presentation.xml']['p:presentation'];

        if (presentationContent['p:sldIdLst'] !== undefined) {
            presentationContent['p:sldIdLst'][0]['p:sldId'].forEach(function(node, index) {
                if (node['$']['r:id'] === rId) {
                    slideIdListIndex = index;
                    return;
                }
            });
        }

        if (slideIdListIndex !== -1) {
            presentationContent['p:sldIdLst'][0]['p:sldId'].splice(slideIdListIndex, 1);

            if (presentationContent['p:sldIdLst'][0]['p:sldId'].length === 0) {
                delete presentationContent['p:sldIdLst'];
            }
        }
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
