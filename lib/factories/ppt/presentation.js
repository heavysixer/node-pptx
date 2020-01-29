const fs = require('fs');
const xml2js = require('xml2js');

let { PptxContentHelper } = require('../../helpers/pptx-content-helper');
let { PptxUnitHelper } = require('../../helpers/unit-helper');

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
        let originalCx = this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].cx;
        let originalCy = this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].cy;

        this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].cx = layout.width;
        this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].cy = layout.height;
        this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$'].type = layout.type;

        // note: seems like there is no "type" attribute on the note sizes
        this.content['ppt/presentation.xml']['p:presentation']['p:notesSz'][0]['$'].cx = layout.width;
        this.content['ppt/presentation.xml']['p:presentation']['p:notesSz'][0]['$'].cy = layout.height;

        delete this.content['ppt/presentation.xml']['p:presentation']['p:sldSz'][0]['$']['type'];

        if (originalCx !== layout.width || originalCy !== layout.height) {
            let slideNumberOffsetInches = 0.25; // number of inches of padding between slide number and right side of slide
            let size = this.getSlideNumberShapeSizeFromLayout('slideLayout1');

            // cx and cy props will be -1 if the slide number shape doesn't exist (it exists when making a pptx from
            // scratch using this library, but probably won't exist when loading an external PPTX - there's no way
            // for this library to detect whether a third-party PPTX has an auto slide number shape without knowing
            // the object name and the layout name in which it would reside)
            if (size.cx !== -1 && size.cy !== -1) {
                let newX = layout.width - size.cx - PptxUnitHelper.fromInches(slideNumberOffsetInches);
                let newY = layout.height - size.cy;

                this.moveSlideNumberOnLayoutTemplate('slideLayout1', newX, newY);
            }
        }
    }

    moveSlideNumberOnLayoutTemplate(layoutName, x, y) {
        let slideNumberNode = this.getSlideNumberShapeNodeFromLayout(layoutName);

        if (slideNumberNode !== undefined) {
            slideNumberNode['p:spPr'][0]['a:xfrm'][0]['a:off'][0]['$'].x = x;
            slideNumberNode['p:spPr'][0]['a:xfrm'][0]['a:off'][0]['$'].y = y;
        }
    }

    getSlideNumberShapeSizeFromLayout(layoutName) {
        let slideNumberNode = this.getSlideNumberShapeNodeFromLayout(layoutName);

        if (slideNumberNode !== undefined) {
            return {
                cx: slideNumberNode['p:spPr'][0]['a:xfrm'][0]['a:ext'][0]['$'].cx,
                cy: slideNumberNode['p:spPr'][0]['a:xfrm'][0]['a:ext'][0]['$'].cy,
            };
        }

        return { cx: -1, cy: -1 };
    }

    getSlideNumberShapeNodeFromLayout(layoutName) {
        let layoutKey = `ppt/slideLayouts/${layoutName}.xml`;

        if (this.content[layoutKey] !== undefined) {
            let templateSlideLayoutContent = this.content[layoutKey]['p:sldLayout'];
            let shapesRoot = templateSlideLayoutContent['p:cSld'][0]['p:spTree'][0]['p:sp'];

            if (shapesRoot !== undefined) {
                let slideNumberShapeIndex = -1;

                shapesRoot.forEach(function(node, index) {
                    if (node['p:nvSpPr'][0]['p:cNvPr'][0]['$'].name === 'Slide Number Placeholder 1') {
                        slideNumberShapeIndex = index;
                        return;
                    }
                });

                if (slideNumberShapeIndex !== -1) return shapesRoot[slideNumberShapeIndex];
            }
        }
    }
}

module.exports.PresentationFactory = PresentationFactory;
