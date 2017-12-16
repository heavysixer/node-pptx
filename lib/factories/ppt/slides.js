const fs = require('fs');
const xml2js = require('xml2js');

let { PptxUnitHelper } = require('../../helpers/unit-helper');

class SlideFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slides/_rels/slide1.xml.rels`), (err, js) => {
            this.content['ppt/slides/_rels/slide1.xml.rels'] = js;
        });

        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slides/slide1.xml`), (err, js) => {
            this.content['ppt/slides/slide1.xml'] = js;
        });
    }

    addSlide(slideName, layoutName) {
        let relsKey = `ppt/slides/_rels/${slideName}.xml.rels`;
        let slideKey = `ppt/slides/${slideName}.xml`;
        let layoutKey = `ppt/slideLayouts/${layoutName}.xml`;

        this.content[relsKey] = {
            Relationships: {
                $: {
                    xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
                },
                Relationship: [
                    {
                        $: {
                            Id: 'rId1',
                            Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
                            Target: `../slideLayouts/${layoutName}.xml`,
                        },
                    },
                ],
            },
        };

        // add the actual slide itself (use the layout template as the source; note: layout templates are NOT the same as master slide templates)
        let baseSlideContent = this.content[layoutKey]['p:sldLayout'];

        delete baseSlideContent['$']['preserve'];
        delete baseSlideContent['$']['type'];

        let slideContent = {
            'p:sld': baseSlideContent,
        };

        slideContent = JSON.parse(JSON.stringify(slideContent));

        this.content[slideKey] = slideContent;

        return slideContent;
    }

    addImageToSlideRelationship(slide, target) {
        let relsKey = `ppt/slides/_rels/${slide.name}.xml.rels`;
        let rId = `rId${this.content[relsKey]['Relationships']['Relationship'].length + 1}`;

        this.content[relsKey]['Relationships']['Relationship'].push({
            $: {
                Id: rId,
                Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
                Target: target,
            },
        });

        return rId;
    }

    addHyperlinkToSlideRelationship(slide, target) {
        let relsKey = `ppt/slides/_rels/${slide.name}.xml.rels`;
        let rId = `rId${this.content[relsKey]['Relationships']['Relationship'].length + 1}`;

        this.content[relsKey]['Relationships']['Relationship'].push({
            $: {
                Id: rId,
                Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink',
                Target: target,
                TargetMode: 'External',
            },
        });

        return rId;
    }

    addImage(slide, imageFileName, rId, options = {}) {
        let slideKey = `ppt/slides/${slide.name}.xml`;
        let objectCount = 0;

        let imageX = options.x ? PptxUnitHelper.fromPixels(options.x) : 0;
        let imageY = options.y ? PptxUnitHelper.fromPixels(options.y) : 591502;
        let imageCx = options.cx ? PptxUnitHelper.fromPixels(options.cx) : 9144000;
        let imageCy = options.cy ? PptxUnitHelper.fromPixels(options.cy) : 5674995;

        //-----------------------------------------------------------------------------------------------------------------------------
        // TODO: Mark - something similar to this needs to be done in Factories/index.js -> PptxContentHelper.extractSlideObjectInfo():
        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:nvGrpSpPr'][0]['p:cNvPr'].forEach(function(element) {
            objectCount++;
        });

        let spTreeRoot = this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0];

        // won't have sp nodes on a blank slide
        if (spTreeRoot['p:sp']) {
            this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'].forEach(function(element) {
                if (element['p:nvSpPr'][0]['p:cNvPr']) {
                    objectCount++;
                }
            });
        }

        // count existing images already on the slide
        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'].forEach(function(element) {
            Object.keys(element).forEach(function(key) {
                if (key === 'p:pic') {
                    objectCount++;
                }
            });
        });
        //-----------------------------------------------------------------------------------------------------------------------------

        // TODO: once the object count extractor is done, use _this_ ID in the "p:cNvPr" node below... (instead of "objectCount+1")
        let picObjectId = slide.getNextObjectId();

        // start the p:pic root node if it doesn't exist (i.e. there are no images on the slide yet)
        if (!this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic']) {
            this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic'] = [];
        }

        let newImageBlock = {
            'p:nvPicPr': [
                {
                    'p:cNvPr': [{ $: { id: objectCount + 1, name: `${imageFileName} ${objectCount + 1}`, descr: imageFileName } }],
                    'p:cNvPicPr': [{ 'a:picLocks': [{ $: { noChangeAspect: '1' } }] }],
                    'p:nvPr': [{}],
                },
            ],
            'p:blipFill': [
                {
                    'a:blip': [{ $: { 'r:embed': rId, cstate: 'print' } }],
                    'a:stretch': [{ 'a:fillRect': [{}] }],
                },
            ],
            'p:spPr': [
                {
                    'a:xfrm': [
                        {
                            'a:off': [{ $: { x: imageX, y: imageY } }],
                            'a:ext': [{ $: { cx: imageCx, cy: imageCy } }],
                        },
                    ],
                    'a:prstGeom': [
                        {
                            $: { prst: 'rect' },
                            'a:avLst': [{}],
                        },
                    ],
                },
            ],
        };

        if (options.url) {
            newImageBlock['p:nvPicPr'][0]['p:cNvPr'][0]['a:hlinkClick'] = { $: { 'r:id': options.rIdForHyperlink } };
        }

        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic'].push(newImageBlock);

        return newImageBlock;
    }

    addText(slide, text, options = {}) {
        let slideKey = `ppt/slides/${slide.name}.xml`;
        let objectId = slide.getNextObjectId();

        let textX = options.x ? PptxUnitHelper.fromPixels(options.x) : 0;
        let textY = options.y ? PptxUnitHelper.fromPixels(options.y) : 0;
        let textCx = options.cx ? PptxUnitHelper.fromPixels(options.cx) : 2819400;
        let textCy = options.cy ? PptxUnitHelper.fromPixels(options.cy) : 381000;

        if (!this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp']) {
            this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'] = [];
        }

        let newTextBlock = {
            'p:nvSpPr': [
                {
                    'p:cNvPr': [{ $: { id: objectId, name: `Text ${objectId}` } }],
                    'p:cNvSpPr': [{ $: { txBox: '1' } }],
                    'p:nvPr': [{}],
                },
            ],
            'p:spPr': [
                {
                    'a:xfrm': [
                        {
                            'a:off': [{ $: { x: textX, y: textY } }],
                            'a:ext': [{ $: { cx: textCx, cy: textCy } }],
                        },
                    ],
                    'a:prstGeom': [
                        {
                            $: { prst: 'rect' },
                            'a:avLst': [{}],
                        },
                    ],
                    'a:noFill': [{}],
                },
            ],
            'p:txBody': [
                {
                    'a:bodyPr': [
                        {
                            $: { wrap: 'square', rtlCol: '0' },
                            'a:spAutoFit': [{}],
                        },
                    ],
                    'a:lstStyle': [{}],
                    'a:p': [
                        {
                            'a:r': [{ 'a:rPr': [{ $: { lang: 'en-US', smtClean: '0' } }], 'a:t': text }],
                            'a:endParaRPr': [{ $: { lang: 'en-US' } }],
                        },
                    ],
                },
            ],
        };

        if (options.url) {
            newTextBlock['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0]['a:hlinkClick'] = { $: { 'r:id': options.rIdForHyperlink } };
        }

        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'].push(newTextBlock);

        return newTextBlock;
    }
}

module.exports.SlideFactory = SlideFactory;
