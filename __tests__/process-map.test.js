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

                // trying to access the process template data via our object tree and some direct XML injection:
                // let shape = slide1.getShapeObject(0);
                //
                // console.log('shape = ', shape.content);
                // console.log('slide 1 all elements = ', slide1.elements);
                //
                // if (shape.content['p:txBody'][0]['a:p'][0]['a:r']) {
                //     console.log('inside new text');
                //     shape.content['p:txBody'][0]['a:p'][0]['a:r'][0]['a:t'] = "Shape's new text!";
                // } else {
                //     console.log('inside new shape block text');
                //     shape.content['p:txBody'][0]['a:p'][0]['a:r'] = [
                //         { 'a:rPr': [{ $: { lang: 'en-US', smtClean: '0' } }], 'a:t': 'Mod our own shape' },
                //     ];
                //
                //     // major problem: this node is NOT being written out last in the node order! Causes a corrupt file.
                //     shape.content['p:txBody'][0]['a:p'][0]['a:endParaRPr'] = [{ $: { lang: 'en-US' } }]; // this MUST go last!
                // }

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
            presentation.setSlideSize(PptxUnitHelper.fromInches(13.33), PptxUnitHelper.fromInches(7.5));

            let slide1 = presentation.getSlide('slide1');

            expect(slide1.content).toBeDefined();
            expect(slide1.content).not.toBeNull();

            // TODO's to support everything:
            //
            // -Need to add different slide dimensions (like the 16x9 layout)
            // -Need to add line color and line style support to shapes (so we can make those vertical dotted line separators)
            // -Need to add font support to text
            // -Need to add ability to center text
            // -Optional: theme color support would be nice
            // -Add line color to shapes (this is the same as the border color)

            slide1.addText('Process map template', { x: 100, y: 50, cx: 500, cy: 20 });
            slide1.addShape(PPTX.ShapeTypes.GREGS_CHEVRON_PENTAGON, {
                x: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(3.75)),
                y: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.23)),
                cx: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.24)),
                cy: PptxUnitHelper.toPixels(PptxUnitHelper.fromInches(1.16)),
                color: 'C5F484',
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
