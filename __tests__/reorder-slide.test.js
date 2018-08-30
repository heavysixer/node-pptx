const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    test("should be able to load an existing PPTX (containing three slides) and swap slide #'s 2 and 3", async () => {
        try {
            let testFileName = 'presentation-swap-existing-slides.pptx';

            expect.assertions(1);

            if (fs.existsSync(`${tmpDir}/${testFileName}`)) {
                fs.unlinkSync(`${tmpDir}/${testFileName}`);
            }

            let pptx = new PPTX.Composer();

            await pptx.load(`${__dirname}/fixtures/three-slides.pptx`);
            await pptx.compose(async pres => {
                let slide = pres.getSlide(3);
                slide.moveTo(2);

                slide.addText({ value: 'If this slide says "original slide #3" but is in slide position 2, then it worked.', x: 25, y: 200 });
            });

            await pptx.save(`${tmpDir}/${testFileName}`);
            expect(fs.existsSync(`${tmpDir}/${testFileName}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
