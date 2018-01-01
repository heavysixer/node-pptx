const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    describe('with an existing pptx file', () => {
        test('should be able to add another slide and change the background color of each slide', () => {
            try {
                if (fs.existsSync(`${tmpDir}/presentation-existing-non-default-colors.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-existing-non-default-colors.pptx`);
                }

                let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
                let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

                presentation.loadExistingPPTX(function(err) {
                    if (err) fail(err);

                    let slide = presentation.getSlide('slide1');
                    slide.setBackgroundColor('C5E0B4');
                    slide = presentation.addSlide();
                    slide.setBackgroundColor('FFD777');
                    presentation.save(`${tmpDir}/presentation-existing-non-default-colors.pptx`);
                    expect(fs.existsSync(`${tmpDir}/presentation-existing-non-default-colors.pptx`)).toBe(true);
                });
            } catch (err) {
                console.log(err);
                throw err;
            }
        });
    });

    describe('when creating a presentation without an existing file', () => {
        test('should be able to create a slide with a non-default background color', () => {
            try {
                if (fs.existsSync(`${tmpDir}/presentation-new-non-default-colors.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-new-non-default-colors.pptx`);
                }

                let presentation = new PPTX.Presentation();
                let slide = presentation.getSlide('slide1');

                expect(slide.content).toBeDefined();
                expect(slide.content).not.toBeNull();

                slide.setBackgroundColor('FFD777');

                slide = presentation.addSlide();

                slide.setBackgroundColor('C5E0B4');
                presentation.save(`${tmpDir}/presentation-new-non-default-colors.pptx`);

                expect(fs.existsSync(`${tmpDir}/presentation-new-non-default-colors.pptx`)).toBe(true);
            } catch (err) {
                console.log(err);
                throw err;
            }
        });
    });
});

function fail(err) {
    expect(err).toBeNull();
}
