const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    describe('with an existing pptx file', () => {
        test('should be able to load a pptx with no slides and add slide #1', async () => {
            try {
                expect.assertions(3);

                if (fs.existsSync(`${tmpDir}/presentation-existing-blank-add-slide.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-existing-blank-add-slide.pptx`);
                }

                let fulltemplateFilePath = `${__dirname}/fixtures/blank.pptx`;
                let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

                await presentation.loadExistingPPTX();

                let slide = presentation.addSlide();

                expect(slide.content).toBeDefined();
                expect(slide.content).not.toBeNull();

                await presentation.save(`${tmpDir}/presentation-existing-blank-add-slide.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-existing-blank-add-slide.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });

    describe('when creating a presentation without an existing file', () => {
        test('should be able to create a pptx with NO slides', async () => {
            try {
                expect.assertions(1);

                let presentation = new PPTX.Presentation();

                await presentation.save(`${tmpDir}/presentation-new-no-slides.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-new-no-slides.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });
});
