const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Shape Module', () => {
    test('should be add shapes', async () => {
        try {
            expect.assertions(3);

            let presentation = new PPTX.Presentation();
            let slide1 = presentation.addSlide();

            expect(slide1.content).toBeDefined();
            expect(slide1.content).not.toBeNull();

            slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 50, y: 50, cx: 50, cy: 50 });
            slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });
            slide1.addShape(PPTX.ShapeTypes.OVAL, { x: 100, y: 200, cx: 200, cy: 100, text: 'hello world!' });
            slide1.addShape(PPTX.ShapeTypes.ELLIPSE, { x: 450, y: 200, cx: 200, cy: 100, text: 'hello world!', color: '00FF00' }); // testing alias (ELLIPSE == OVAL)
            slide1.addShape(PPTX.ShapeTypes.TRAPEZOID, { x: 320, y: 200, cx: 150, cy: 150, color: 'FF0000' });
            slide1.addShape(PPTX.ShapeTypes.LEFT_ARROW, { x: 500, y: 340, cx: 100, cy: 50, color: 'FF00FF' });

            slide1
                .addShape(PPTX.ShapeTypes.RIGHT_ARROW, { x: 500, y: 440, cx: 100, cy: 50, color: '0000FF' })
                .addShape(PPTX.ShapeTypes.UP_ARROW, { x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', url: 'www.google.com' });

            await presentation.save(`${tmpDir}/shapes-test.pptx`);
            expect(fs.existsSync(`${tmpDir}/shapes-test.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
