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
                let slideTest2 = pres.getSlide(2);
                let slideTest3 = pres.getSlide(3);

                slideTest2.layoutName = 'slideLayout2';
                slideTest3.layoutName = 'slideLayout3';

                let slide = pres.getSlide(3);
                slide.moveTo(2);

                slide.addText(text => {
                    text
                        .value('If this slide says "original slide #3" but is in slide position 2, then it worked.')
                        .x(25)
                        .y(200)
                        .cx(600);
                });
            });

            await pptx.save(`${tmpDir}/${testFileName}`);
            expect(fs.existsSync(`${tmpDir}/${testFileName}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
