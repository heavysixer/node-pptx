const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    describe('with an existing pptx file', () => {
        test('should be able to add another slide', () => {
            try {
                if (fs.existsSync(`${tmpDir}/presentation-existing-add-slide.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-existing-add-slide.pptx`);
                }

                let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
                let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

                presentation.loadExistingPPTX(function(err) {
                    if (err) fail(err);

                    presentation.addSlide();
                    presentation.save(`${tmpDir}/presentation-existing-add-slide.pptx`);
                    expect(fs.existsSync(`${tmpDir}/presentation-existing-add-slide.pptx`)).toBe(true);
                });
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
