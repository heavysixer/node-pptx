const PPTX = require('../index.js');
const fs = require('fs');
const path = require('path');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    beforeAll(() => {
        prepareTmpDir(tmpDir);
    });

    afterAll(() => {
        // emptyDir(tmpDir);
    });

    test('should be able to create a pptx file from scratch and add some shapes', () => {
        try {
            let presentation = new PPTX.Presentation();

            presentation.buildPowerPoint();

            let slide1 = presentation.getSlide('slide1');

            expect(slide1.content).toBeDefined();
            expect(slide1.content).not.toBeNull();

            slide1.addShape('triangle', { x: 50, y: 50, cx: 50, cy: 50 });
            slide1.addShape('triangle', { x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });
            slide1.addShape('ellipse', { x: 100, y: 200, cx: 200, cy: 100 });
            slide1.addShape('trapezoid', { x: 320, y: 200, cx: 150, cy: 150, color: 'FF0000' });
            slide1.addShape('leftArrow', { x: 500, y: 340, cx: 100, cy: 50, color: 'FF00FF' });

            slide1
                .addShape('rightArrow', { x: 500, y: 440, cx: 100, cy: 50, color: '0000FF' })
                .addShape('upArrow', { x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', url: 'www.google.com' });

            presentation.save(`${tmpDir}/shapes-test.pptx`);
            expect(fs.existsSync(`${tmpDir}/shapes-test.pptx`)).toBe(true);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });
});

function prepareTmpDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        emptyDir(dir);
    }
}

function emptyDir(dir) {
    for (const file of fs.readdirSync(dir)) {
        fs.unlink(path.join(dir, file), err => {
            if (err) throw err;
        });
    }
}
