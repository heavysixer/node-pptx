const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

let { PptxUnitHelper } = require('../lib/helpers/unit-helper');

describe('Presentation Module', () => {
    test('should be able to load an existing pptx file', async () => {
        try {
            expect.assertions(3);

            let fulltemplateFilePath = `${__dirname}/fixtures/raci-matrix.pptx`;
            let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

            await presentation.loadExistingPPTX();
            let slide1 = presentation.getSlide('slide1');

            expect(slide1.content).toBeDefined();
            expect(slide1.content).not.toBeNull();

            let shapeContent = slide1.getShapeRawContent(5);

            if (shapeContent) {
                if (shapeContent['p:txBody'] && shapeContent['p:txBody'][0]['a:p']) {
                    if (shapeContent['p:txBody'][0]['a:p'][0]['a:r']) {
                        shapeContent['p:txBody'][0]['a:p'][0]['a:r'][0]['a:t'] = "Shape's new text!";
                        //shapeContent['p:txBody'][0]['a:p'][0]['a:endParaRPr'] = [{ $: { lang: 'en-US' } }]; // this MUST go last!
                    } else {
                        shapeContent['p:txBody'][0]['a:p'][0]['a:r'] = [
                            { 'a:rPr': [{ $: { lang: 'en-US', smtClean: '0' } }], 'a:t': 'Mod our own shape' },
                        ];

                        //shapeContent['p:txBody'][0]['a:p'][0]['a:endParaRPr'] = [{ $: { lang: 'en-US' } }]; // this MUST go last!
                    }
                }
            } else {
                console.log('Cound not find any shapes!');
            }

            let slide2 = presentation.addSlide('slideLayout7');

            makeProcessMapOnSlide(slide2);

            await presentation.save(`${tmpDir}/process-map-rewrite.pptx`);
            expect(fs.existsSync(`${tmpDir}/process-map-rewrite.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to create the process map from scratch', async () => {
        try {
            expect.assertions(3);

            let presentation = new PPTX.Presentation();

            presentation.buildPowerPoint();
            presentation.setLayout({ width: 13.33, height: 7.5 });

            let slide1 = presentation.getSlide('slide1');

            expect(slide1.content).toBeDefined();
            expect(slide1.content).not.toBeNull();

            // TODO's to support everything:
            //
            // DONE -Need to add different slide dimensions (like the 16x9 layout)
            // DONE -Need to add line color and line style support to shapes (so we can make those vertical dotted line separators)
            // DONE -Need to add font support to text
            // DONE -Need to add font size support to text/shapes
            // DONE -Need to add support for bold font to text/shapes
            // DONE -Need to add ability to center text
            // DONE -Optional: theme color support would be nice
            // DONE -Add line color to shapes (this is the same as the border color)
            // DONE -Need to control font size
            // DONE -Text alignment in shapes
            // DONE -Need margins and wrap-text for text boxes/shapes

            makeProcessMapOnSlide(slide1);

            await presentation.save(`${tmpDir}/new-process-map.pptx`);
            expect(fs.existsSync(`${tmpDir}/new-process-map.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});

function makeProcessMapOnSlide(slide) {
    slide.addText('Process map template', {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.12)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.52)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.43)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.34)),
        fontFace: 'Calibri Light',
        fontSize: 20,
        textWrap: 'none',
        textAlign: 'center',
        textVerticalAlign: 'center',
    });

    slide.addText('Cool Font Test', {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.1)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.1)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.43)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.34)),
        fontSize: 15,
        fontFace: 'Alien Encounters',
        textColor: 'FF0000',
        textWrap: 'none',
        textAlign: 'center',
        textVerticalAlign: 'center',
        line: { color: '0000FF', dashType: 'dash', width: 1.0 },
    });

    let customPentagon = PPTX.ShapeTypes.PENTAGON;
    customPentagon.avLst.adj = 17599;

    slide.addShape(customPentagon, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.75)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4',
        text: 'x',
        textColor: PPTX.SchemeColors.ACCENT6,
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });

    slide.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.69)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4',
        text: 'xx',
        textColor: PPTX.SchemeColors.ACCENT5,
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });
    slide.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.66)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4',
        text: 'x',
        textColor: PPTX.SchemeColors.TEXT1,
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });
    slide.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.63)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4',
        text: 'x',
        textColor: 'FF0000',
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });
    slide.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(7.6)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4',
        text: 'x',
        textColor: 'FF0000',
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });
    slide.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(8.58)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4', //'C5F484',
        text: 'x',
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });
    slide.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.55)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4',
        text: 'x',
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });
    slide.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.51)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
        color: 'C5E0B4',
        text: 'x',
        textAlign: 'left',
        fontFace: 'Calibri',
        fontSize: 12,
        line: { color: 'FFFFFF', width: 1.0 },
    });

    slide.addShape(PPTX.ShapeTypes.RECTANGLE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.53)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        color: 'DCDADA',
        text: 'x',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        textAlign: 'left',
    });

    slide.addShape(PPTX.ShapeTypes.RECTANGLE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.2)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        color: 'DCDADA',
        text: 'x',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        textAlign: 'left',
    });

    slide.addShape(PPTX.ShapeTypes.RECTANGLE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.87)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        color: 'DCDADA',
        text: 'x',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        textAlign: 'left',
    });

    slide.addShape(PPTX.ShapeTypes.RECTANGLE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.54)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        color: 'DCDADA',
        text: 'x',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        textAlign: 'left',
    });

    slide.addShape(PPTX.ShapeTypes.RECTANGLE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.21)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        color: 'DCDADA',
        text: 'x',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        textAlign: 'left',
    });

    slide.addShape(PPTX.ShapeTypes.RECTANGLE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.88)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        color: 'DCDADA',
        text: 'x',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        textAlign: 'left',
    });

    slide.addShape(PPTX.ShapeTypes.RECTANGLE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.55)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        color: 'DCDADA',
        text: 'x',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        textAlign: 'left',
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.13)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '1',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.05)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '2',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.04)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '3',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(7.01)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '4',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(7.97)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '5',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(8.96)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '6',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.92)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '7',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.88)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.11)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.32)),
        color: '70AD47',
        text: '8',
        textColor: 'FFFFFF',
        fontFace: 'Calibri',
        fontSize: 12,
        fontBold: true,
        line: { color: 'FFFFFF', width: 1.5 },
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.13)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.64)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        color: 'FFC000',
        text: 'R,A',
        textColor: 'FFFFFF',
        textWrap: 'none',
        fontFace: 'Calibri',
        fontSize: 12,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.13)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.31)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        color: 'FFC000',
        text: 'I',
        textColor: 'FFFFFF',
        textWrap: 'none',
        fontSize: 12,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.13)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.98)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        color: 'FFC000',
        text: 'I',
        textColor: 'FFFFFF',
        textWrap: 'none',
        fontFace: 'Calibri',
        fontSize: 12,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.08)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.98)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        color: 'FFC000',
        text: 'R',
        textColor: 'FFFFFF',
        textWrap: 'none',
        fontFace: 'Calibri',
        fontSize: 12,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.03)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.98)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        color: 'FFC000',
        text: 'I',
        textColor: 'FFFFFF',
        textWrap: 'none',
        fontFace: 'Calibri',
        fontSize: 12,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.98)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.98)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.4)),
        color: 'FFC000',
        text: 'R,A',
        textColor: 'FFFFFF',
        textWrap: 'none',
        fontFace: 'Calibri',
        fontSize: 12,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.53)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.6)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        color: PPTX.SchemeColors.ACCENT4,
        text: 'R',
        textColor: PPTX.SchemeColors.BACKGROUND1,
        fontFace: 'Calibri',
        fontSize: 10,
        fontBold: true,
        margin: 0,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.59)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.6)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        color: PPTX.SchemeColors.ACCENT4,
        text: 'A',
        textColor: PPTX.SchemeColors.BACKGROUND1,
        fontFace: 'Calibri',
        fontSize: 10,
        fontBold: true,
        margin: 0,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.53)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.81)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        color: PPTX.SchemeColors.ACCENT4,
        text: 'C',
        textColor: PPTX.SchemeColors.BACKGROUND1,
        fontFace: 'Calibri',
        fontSize: 10,
        fontBold: true,
        margin: 0,
    });

    slide.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.59)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.81)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        color: PPTX.SchemeColors.ACCENT4,
        text: 'I',
        textColor: PPTX.SchemeColors.BACKGROUND1,
        fontFace: 'Calibri',
        fontSize: 10,
        fontBold: true,
        margin: 0,
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.69)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
        line: { color: PPTX.SchemeColors.ACCENT2, width: 0.75, dashType: 'dash' },
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.65)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
        line: { color: PPTX.SchemeColors.ACCENT2, width: 0.75, dashType: 'dash' },
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.58)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
        line: { color: PPTX.SchemeColors.ACCENT2, width: 0.75, dashType: 'dash' },
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(7.53)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
        line: { color: PPTX.SchemeColors.ACCENT2, width: 0.75, dashType: 'dash' },
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(8.62)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
        line: { color: PPTX.SchemeColors.ACCENT2, width: 0.75, dashType: 'dash' },
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.58)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
        line: { color: PPTX.SchemeColors.ACCENT2, width: 0.75, dashType: 'dash' },
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.53)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
        line: { color: PPTX.SchemeColors.ACCENT2, width: 0.75, dashType: 'dash' },
    });

    slide.addShape(PPTX.ShapeTypes.LINE, {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.5)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
        line: { width: 1.0 },
    });

    slide.addText('Responsible', {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.74)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.68)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        fontFace: 'Calibri',
        fontSize: 10,
        textWrap: 'none',
        margin: 0,
    });

    slide.addText('Accountable', {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.81)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.71)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        fontFace: 'Calibri',
        fontSize: 10,
        textWrap: 'none',
        margin: { top: 0, bottom: 0, left: 0, right: 0 },
    });

    slide.addText('Consulted', {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.74)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.82)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.57)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        fontFace: 'Calibri',
        fontSize: 10,
        textWrap: 'none',
        margin: 0,
    });

    slide.addText('Informed', {
        x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.81)),
        y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.82)),
        cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.53)),
        cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
        fontFace: 'Calibri',
        fontSize: 10,
        textWrap: 'none',
        margin: 0,
    });
}

