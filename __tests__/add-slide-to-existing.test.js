const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    describe('with an existing pptx file', () => {
        test('should be able to add another slide', async () => {
            try {
                expect.assertions(1);

                if (fs.existsSync(`${tmpDir}/presentation-existing-add-slide.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-existing-add-slide.pptx`);
                }

                //let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
                //let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

                let pptx = new PPTX.Composer();

                await pptx.load(`${__dirname}/fixtures/basic.pptx`);
                await pptx.presentation.addSlide();
                await pptx.save(`${tmpDir}/presentation-existing-add-slide.pptx`);

                expect(fs.existsSync(`${tmpDir}/presentation-existing-add-slide.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });
});
