const fs = require('fs');
const xml2js = require('xml2js');

let { PptxUnitHelper } = require('../../helpers/unit-helper');
let { PptFactoryHelper } = require('../../helpers/ppt-factory-helper');

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

    addChartToSlideRelationship(slide, chartName) {
        let relsKey = `ppt/slides/_rels/${slide.name}.xml.rels`;
        let rId = `rId${this.content[relsKey]['Relationships']['Relationship'].length + 1}`;

        this.content[relsKey]['Relationships']['Relationship'].push({
            $: {
                Id: rId,
                Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart',
                Target: `../charts/${chartName}.xml`,
            },
        });

        return rId;
    }

    addImage(slide, imageFileName, rId, options = {}) {
        let slideKey = `ppt/slides/${slide.name}.xml`;
        let objectCount = 0;

        options = Object.assign(
            {
                // defaults
                x: 100,
                y: 100,
                cx: 350,
                cy: 200,
            },
            options
        );

        options.x = PptxUnitHelper.fromPixels(options.x);
        options.y = PptxUnitHelper.fromPixels(options.y);
        options.cx = PptxUnitHelper.fromPixels(options.cx);
        options.cy = PptxUnitHelper.fromPixels(options.cy);

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
                            'a:off': [{ $: { x: options.x, y: options.y } }],
                            'a:ext': [{ $: { cx: options.cx, cy: options.cy } }],
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
            newImageBlock['p:nvPicPr'][0]['p:cNvPr'][0]['a:hlinkClick'] = [{ $: { 'r:id': options.rIdForHyperlink } }];
        }

        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic'].push(newImageBlock);

        return newImageBlock;
    }

    addText(slide, text, options = {}) {
        let slideKey = `ppt/slides/${slide.name}.xml`;
        let objectId = slide.getNextObjectId();

        options = Object.assign(
            {
                // defaults
                x: 100,
                y: 100,
                cx: 300,
                cy: 25,
            },
            options
        );

        options.x = PptxUnitHelper.fromPixels(options.x);
        options.y = PptxUnitHelper.fromPixels(options.y);
        options.cx = PptxUnitHelper.fromPixels(options.cx);
        options.cy = PptxUnitHelper.fromPixels(options.cy);

        if (!this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp']) {
            this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'] = [];
        }

        // construct the bare minimum structure of a shape block (text objects are a special case of shape)
        let newTextBlock = PptFactoryHelper.createBaseShapeBlock(objectId, 'Text', options.x, options.y, options.cx, options.cy);

        // now add the nodes which turn a shape block into a text block
        newTextBlock['p:nvSpPr'][0]['p:cNvSpPr'] = [{ $: { txBox: '1' } }];
        newTextBlock['p:spPr'][0]['a:noFill'] = [{}];
        newTextBlock['p:txBody'][0]['a:bodyPr'] = [{ $: { rtlCol: '0' } }];

        PptFactoryHelper.addParagraphPropertiesToBlock(newTextBlock['p:txBody'][0]['a:p'][0], options);

        newTextBlock['p:txBody'][0]['a:p'][0]['a:r'] = [{ 'a:rPr': [{ $: { lang: 'en-US', smtClean: '0' } }], 'a:t': text }];
        newTextBlock['p:txBody'][0]['a:bodyPr'][0]['a:spAutoFit'] = [{}];

        let textRunPropertyBlock = newTextBlock['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0];
        let textBodyPropertyBlock = newTextBlock['p:txBody'][0]['a:bodyPr'][0];
        let endParagraphRun = [{ $: { lang: 'en-US' } }];

        PptFactoryHelper.addLinePropertiesToBlock(newTextBlock['p:spPr'][0], options.line);

        if (options.textColor !== undefined) {
            textRunPropertyBlock['a:solidFill'] = PptFactoryHelper.createColorBlock(options.textColor);
        }

        if (options.fontFace !== undefined) {
            PptFactoryHelper.addFontFaceToBlock(options.fontFace, textRunPropertyBlock);
            PptFactoryHelper.addFontFaceToBlock(options.fontFace, endParagraphRun[0]);
        }

        PptFactoryHelper.setTextBodyProperties(textBodyPropertyBlock, options);
        PptFactoryHelper.setTextRunProperties(textRunPropertyBlock, options);

        newTextBlock['p:txBody'][0]['a:p'][0]['a:endParaRPr'] = endParagraphRun; // this MUST go last!

        if (options.url) {
            newTextBlock['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0]['a:hlinkClick'] = [{ $: { 'r:id': options.rIdForHyperlink } }];
        }

        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'].push(newTextBlock);

        return newTextBlock;
    }

    addShape(slide, type, options = {}) {
        let slideKey = `ppt/slides/${slide.name}.xml`;
        let objectId = slide.getNextObjectId();

        options = Object.assign(
            {
                // defaults
                x: 100,
                y: 100,
                cx: 100,
                cy: 100,
            },
            options
        );

        options.x = PptxUnitHelper.fromPixels(options.x);
        options.y = PptxUnitHelper.fromPixels(options.y);
        options.cx = PptxUnitHelper.fromPixels(options.cx);
        options.cy = PptxUnitHelper.fromPixels(options.cy);

        let shapeColor = options.color || '00AA00';

        if (options.textAlign === undefined) {
            options.textAlign = 'center'; // for shapes, we always want text defaulted to the center
        }

        if (!this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp']) {
            this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'] = [];
        }

        let newShapeBlock = PptFactoryHelper.createBaseShapeBlock(objectId, 'Shape', options.x, options.y, options.cx, options.cy);

        newShapeBlock['p:spPr'][0]['a:prstGeom'][0]['$'].prst = type.name;
        newShapeBlock['p:spPr'][0]['a:solidFill'] = PptFactoryHelper.createColorBlock(shapeColor);
        newShapeBlock['p:txBody'][0]['a:bodyPr'] = [{ $: { rtlCol: '0' } }];

        PptFactoryHelper.addParagraphPropertiesToBlock(newShapeBlock['p:txBody'][0]['a:p'][0], options);
        PptFactoryHelper.addAvLstToBlock(newShapeBlock['p:spPr'][0]['a:prstGeom'][0], type.avLst);
        PptFactoryHelper.addLinePropertiesToBlock(newShapeBlock['p:spPr'][0], options.line);

        let endParagraphRun = [{ $: { lang: 'en-US' } }];

        if (options.text) {
            newShapeBlock['p:txBody'][0]['a:p'][0]['a:r'] = [{ 'a:rPr': [{ $: { lang: 'en-US', smtClean: '0' } }], 'a:t': options.text }];

            if (options.textColor !== undefined) {
                newShapeBlock['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0]['a:solidFill'] = PptFactoryHelper.createColorBlock(options.textColor);
            }

            let textBodyPropertyBlock = newShapeBlock['p:txBody'][0]['a:bodyPr'][0];
            let textRunPropertyBlock = newShapeBlock['p:txBody'][0]['a:p'][0]['a:r'][0]['a:rPr'][0];

            if (options.fontFace) {
                PptFactoryHelper.addFontFaceToBlock(options.fontFace, textRunPropertyBlock);
                PptFactoryHelper.addFontFaceToBlock(options.fontFace, endParagraphRun[0]);
            }

            PptFactoryHelper.setTextBodyProperties(textBodyPropertyBlock, options);
            PptFactoryHelper.setTextRunProperties(textRunPropertyBlock, options);
        }

        newShapeBlock['p:txBody'][0]['a:p'][0]['a:endParaRPr'] = endParagraphRun; // this MUST go last!

        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'].push(newShapeBlock);

        if (options.url) {
            newShapeBlock['p:nvSpPr'][0]['p:cNvPr'][0]['a:hlinkClick'] = [{ $: { 'r:id': options.rIdForHyperlink } }];
        }

        return newShapeBlock;
    }

    addChart(slide, chartName, type, data, options = {}) {
        let slideKey = `ppt/slides/${slide.name}.xml`;
        let chartKey = `ppt/charts/${chartName}.xml`;

        options = Object.assign(
            {
                // defaults
                x: 0,
                y: 0,
                cx: 600,
                cy: 400,
            },
            options
        );

        options.x = PptxUnitHelper.fromPixels(options.x);
        options.y = PptxUnitHelper.fromPixels(options.y);
        options.cx = PptxUnitHelper.fromPixels(options.cx);
        options.cy = PptxUnitHelper.fromPixels(options.cy);

        let newGraphicFrameBlock = PptFactoryHelper.createBaseChartFrameBlock(options.x, options.y, options.cx, options.cy); // goes onto the slide
        let newChartSpaceBlock = PptFactoryHelper.createBaseChartSpaceBlock(); // goes into the chart XML
        let seriesDataBlock = PptFactoryHelper.createSeriesDataBlock(data);

        newChartSpaceBlock['c:chartSpace']['c:chart'][0]['c:plotArea'][0]['c:barChart'][0]['c:ser'] = seriesDataBlock['c:ser'];

        this.content[chartKey] = newChartSpaceBlock;
        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:graphicFrame'] = newGraphicFrameBlock['p:graphicFrame'];

        return newGraphicFrameBlock;
    }
}

module.exports.SlideFactory = SlideFactory;
