const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

let { PptxUnitHelper } = require('../lib/helpers/unit-helper');

describe('Presentation Module', () => {
    test('should be able to load an existing pptx file', () => {
        try {
            let fulltemplateFilePath = `${__dirname}/fixtures/raci-matrix.pptx`;
            let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

            presentation.loadExistingPPTX(function(err) {
                if (err) fail(err);

                let slide1 = presentation.getSlide('slide1');

                expect(slide1.content).toBeDefined();
                expect(slide1.content).not.toBeNull();

                let slide2 = presentation.addSlide();

                slide2.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 50, y: 50, cx: 50, cy: 50 });
                slide2.addText('Hello world!');

                slide2.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });
                slide2.addShape(PPTX.ShapeTypes.OVAL, { x: 100, y: 200, cx: 200, cy: 100, text: 'hello world!' });
                slide2.addShape(PPTX.ShapeTypes.ELLIPSE, { x: 450, y: 200, cx: 200, cy: 100, text: 'hello world!', color: '00FF00' }); // testing alias (ELLIPSE == OVAL)
                slide2.addShape(PPTX.ShapeTypes.TRAPEZOID, { x: 320, y: 200, cx: 150, cy: 150, color: 'FF0000' });
                slide2.addShape(PPTX.ShapeTypes.LEFT_ARROW, { x: 500, y: 340, cx: 100, cy: 50, color: 'FF00FF' });

                slide2.addShape(PPTX.ShapeTypes.RIGHT_ARROW, { x: 500, y: 440, cx: 100, cy: 50, color: '0000FF' });
                slide2.addShape(PPTX.ShapeTypes.UP_ARROW, { x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', url: 'www.google.com' });

                slide2.addText('Hello world!');
                slide2.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 400, cx: 100, cy: 100, url: 'http://www.google.com' });
                slide2.addText('This is a hyperlink! Will this go to google?', { x: 0, y: 25, cx: 400, url: 'http://www.google.com' });
                slide2.addText('Will this go to slide 3?', { x: 0, y: 50, url: '#3' });

                slide2
                    .addText('Another piece of text, non-default position, wide block.')
                    .x(100)
                    .y(100)
                    .cx(500)
                    .cy(50);

                slide2
                    .addText('Text in skinny block, this should wrap.')
                    .x(20)
                    .y(150)
                    .cx(200)
                    .cy(150);

                slide2
                    .addText('Non-Latin (Cyrillic) character test: Привет мир!')
                    .x(300)
                    .y(150)
                    .cx(400)
                    .cy(150)
                    .addText("Let's go crazy: оалмгцнйукрлмьтсмщфзйудлтлваывувыаитыбюяй", { x: 300, y: 175, cx: 400 });

                slide2
                    .addImage(`${__dirname}/images/pizza.jpg`, { url: '#3' })
                    .x(100)
                    .y(200)
                    .cx(166)
                    .cy(100);

                slide2
                    .addImage(`${__dirname}/images/image1.png`)
                    .x(400)
                    .y(250)
                    .cx(250)
                    .cy(150);

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

                presentation.save(`${tmpDir}/process-map-rewrite.pptx`);
                expect(fs.existsSync(`${tmpDir}/process-map-rewrite.pptx`)).toBe(true);
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    test('should be able to create the process map from scratch', () => {
        try {
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
            // -Need to add ability to center text
            // -Optional: theme color support would be nice
            // DONE -Add line color to shapes (this is the same as the border color)
            // DONE -Need to control font size
            // -Text alignment in shapes
            // DONE -Need margins and wrap-text for text boxes/shapes

            slide1.addText('Process map template', {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.12)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.52)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.43)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.34)),
                fontFace: 'Alien Encounters', //'Calibri Light',
                fontSize: 32,
                textColor: 'FF0000',
                textWrap: 'none',
                textVerticalAlign: 'center',
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.51)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5F484',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.55)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5E0B4',
                text: 'test',
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(8.58)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5F484',
                text: 'xxxx',
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(7.6)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5E0B4',
                text: 'x',
                textColor: 'FF0000',
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.63)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5F484',
                text: 'x',
                textColor: 'FF0000',
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.66)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5E0B4',
                text: 'x',
                textColor: PPTX.SchemeColors.TEXT1,
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.69)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5F484',
                text: 'xx',
                textColor: PPTX.SchemeColors.ACCENT5,
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.75)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5E0B4',
                text: 'x',
                textColor: PPTX.SchemeColors.ACCENT6,
                fontFace: 'Calibri',
                fontSize: 12,
                line: { color: 'FFFFFF', width: 1.0 },
            });

            slide1.addShape(PPTX.ShapeTypes.RECTANGLE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.53)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                color: 'DCDADA',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
            });

            slide1.addShape(PPTX.ShapeTypes.RECTANGLE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.2)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                color: 'DCDADA',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
            });

            slide1.addShape(PPTX.ShapeTypes.RECTANGLE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.87)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                color: 'DCDADA',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
            });

            slide1.addShape(PPTX.ShapeTypes.RECTANGLE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.54)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                color: 'DCDADA',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
            });

            slide1.addShape(PPTX.ShapeTypes.RECTANGLE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.21)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                color: 'DCDADA',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
            });

            slide1.addShape(PPTX.ShapeTypes.RECTANGLE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.88)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                color: 'DCDADA',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
            });

            slide1.addShape(PPTX.ShapeTypes.RECTANGLE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.55)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                color: 'DCDADA',
                text: 'x',
                fontFace: 'Calibri',
                fontSize: 12,
            });

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.97)),
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.89)),
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(7.81)),
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(8.73)),
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.65)),
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.57)),
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
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

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.53)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.6)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                color: PPTX.SchemeColors.ACCENT4,
                text: 'R',
                textColor: PPTX.SchemeColors.BACKGROUND1,
                fontFace: 'Calibri',
                fontSize: 10,
            });

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.59)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.6)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                color: PPTX.SchemeColors.ACCENT4,
                text: 'A',
                textColor: PPTX.SchemeColors.BACKGROUND1,
                fontFace: 'Calibri',
                fontSize: 10,
            });

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.53)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.81)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                color: PPTX.SchemeColors.ACCENT4,
                text: 'C',
                textColor: PPTX.SchemeColors.BACKGROUND1,
                fontFace: 'Calibri',
                fontSize: 10,
            });

            slide1.addShape(PPTX.ShapeTypes.FLOWCHART_CONNECTOR, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.59)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.81)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                color: PPTX.SchemeColors.ACCENT4,
                text: 'I',
                textColor: PPTX.SchemeColors.BACKGROUND1,
                fontFace: 'Calibri',
                fontSize: 10,
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(4.69)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
                line: { color: PPTX.SchemeColors.ACCENT4, width: 0.75, dashType: 'dash' },
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.65)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
                line: { color: PPTX.SchemeColors.ACCENT4, width: 0.75, dashType: 'dash' },
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(6.58)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
                line: { color: PPTX.SchemeColors.ACCENT4, width: 0.75, dashType: 'dash' },
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(7.53)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
                line: { color: PPTX.SchemeColors.ACCENT4, width: 0.75, dashType: 'dash' },
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(8.62)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
                line: { color: PPTX.SchemeColors.ACCENT4, width: 0.75, dashType: 'dash' },
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.58)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
                line: { color: PPTX.SchemeColors.ACCENT4, width: 0.75, dashType: 'dash' },
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.53)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.13)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(5.03)),
                line: { color: PPTX.SchemeColors.ACCENT4, width: 0.75, dashType: 'dash' },
            });

            slide1.addShape(PPTX.ShapeTypes.LINE, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.99)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(2.5)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0)),
                line: { width: 1.0 },
            });

            slide1.addText('Responsible', {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.74)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.68)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                fontFace: 'Calibri',
                fontSize: 10,
                textWrap: 'none',
                margin: 0,
            });

            slide1.addText('Accountable', {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.81)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.61)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.71)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                fontFace: 'Calibri',
                fontSize: 10,
                textWrap: 'none',
                margin: { top: 0, bottom: 0, left: 0, right: 0 },
            });

            slide1.addText('Consulted', {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(9.74)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.82)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.57)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                fontFace: 'Calibri',
                fontSize: 10,
                textWrap: 'none',
                margin: 0,
            });

            slide1.addText('Informed', {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(10.81)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.82)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.53)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(0.17)),
                fontFace: 'Calibri',
                fontSize: 10,
                textWrap: 'none',
                margin: 0,
            });

            presentation.save(`${tmpDir}/new-process-map.pptx`);
            expect(fs.existsSync(`${tmpDir}/new-process-map.pptx`)).toBe(true);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
});

function fail(err) {
    expect(err).toBeNull();
}