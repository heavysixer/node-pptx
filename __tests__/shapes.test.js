const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Shape Module', () => {
    test('should be able to add shapes', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();

            pptx.compose(pres => {
                pres.addSlide(slide => {
                    slide.addShape(shape => {
                        shape
                            .type(PPTX.ShapeTypes.TRIANGLE)
                            .x(50)
                            .y(50)
                            .cx(50)
                            .cy(50);
                    });

                    slide.addShape({ type: PPTX.ShapeTypes.TRIANGLE, x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });
                    slide.addShape({ type: PPTX.ShapeTypes.OVAL, x: 100, y: 200, cx: 200, cy: 100, text: 'hello world!' });
                    slide.addShape({ type: PPTX.ShapeTypes.ELLIPSE, x: 450, y: 200, cx: 200, cy: 100, text: 'hello world!', color: '00FF00' }); // testing alias (ELLIPSE == OVAL)
                    slide.addShape({ type: PPTX.ShapeTypes.TRAPEZOID, x: 320, y: 200, cx: 150, cy: 150, color: 'FF0000' });
                    slide.addShape({ type: PPTX.ShapeTypes.LEFT_ARROW, x: 500, y: 340, cx: 100, cy: 50, color: 'FF00FF' });
                    slide.addShape({ type: PPTX.ShapeTypes.RIGHT_ARROW, x: 500, y: 440, cx: 100, cy: 50, color: '0000FF' });
                    slide.addShape({ type: PPTX.ShapeTypes.UP_ARROW, x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', href: 'www.google.com' });
                });
            });

            await pptx.save(`${tmpDir}/shapes-test.pptx`);
            expect(fs.existsSync(`${tmpDir}/shapes-test.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
