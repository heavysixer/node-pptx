const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

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

                slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 50, y: 50, cx: 50, cy: 50 });
                slide1.addText('Hello world!');
                slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });
                slide1.addShape(PPTX.ShapeTypes.OVAL, { x: 100, y: 200, cx: 200, cy: 100, text: 'hello world!' });
                slide1.addShape(PPTX.ShapeTypes.ELLIPSE, { x: 450, y: 200, cx: 200, cy: 100, text: 'hello world!', color: '00FF00' }); // testing alias (ELLIPSE == OVAL)
                slide1.addShape(PPTX.ShapeTypes.TRAPEZOID, { x: 320, y: 200, cx: 150, cy: 150, color: 'FF0000' });
                slide1.addShape(PPTX.ShapeTypes.LEFT_ARROW, { x: 500, y: 340, cx: 100, cy: 50, color: 'FF00FF' });

                slide1
                    .addShape(PPTX.ShapeTypes.RIGHT_ARROW, { x: 500, y: 440, cx: 100, cy: 50, color: '0000FF' })
                    .addShape(PPTX.ShapeTypes.UP_ARROW, { x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', url: 'www.google.com' });

                //----------------------------------------------------------------------------------------------------------------------------
                // copied from anotehr test, let's see if we can overlay everything and not get a corrupt file...
                // (and, yes, the resulting first slide will look stupid...)
                slide1.addText('Hello world!');
                slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 400, cx: 100, cy: 100, url: 'http://www.google.com' });
                slide1.addText('This is a hyperlink! Will this go to google?', { x: 0, y: 25, cx: 400, url: 'http://www.google.com' });
                slide1.addText('Will this go to slide 3?', { x: 0, y: 50, url: '#3' });

                slide1
                    .addText('Another piece of text, non-default position, wide block.')
                    .x(100)
                    .y(100)
                    .cx(500)
                    .cy(50);

                slide1
                    .addText('Text in skinny block, this should wrap.')
                    .x(20)
                    .y(150)
                    .cx(200)
                    .cy(150);

                slide1
                    .addText('Non-Latin (Cyrillic) character test: Привет мир!')
                    .x(300)
                    .y(150)
                    .cx(400)
                    .cy(150)
                    .addText("Let's go crazy: оалмгцнйукрлмьтсмщфзйудлтлваывувыаитыбюяй", { x: 300, y: 175, cx: 400 });

                slide1
                    .addImage(`${__dirname}/images/pizza.jpg`, { url: '#3' })
                    .x(100)
                    .y(200)
                    .cx(166)
                    .cy(100);

                slide1
                    .addImage(`${__dirname}/images/image1.png`)
                    .x(400)
                    .y(250)
                    .cx(250)
                    .cy(150);
                //----------------------------------------------------------------------------------------------------------------------------
                let slide3 = presentation.addSlide().addSlide();
                slide3.addText('The linked worked...');

                presentation.save(`${tmpDir}/process-map-rewrite.pptx`);
                expect(fs.existsSync(`${tmpDir}/process-map-rewrite.pptx`)).toBe(true);
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
});

function fail(err) {
    expect(err).toBeNull();
}
