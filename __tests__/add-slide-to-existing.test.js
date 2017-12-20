const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    test('should be able to load an existing pptx file and add another slide', () => {
        try {
            if (fs.existsSync(`${tmpDir}/add-slide-to-existing.pptx`)) {
                fs.unlink(`${tmpDir}/add-slide-to-existing.pptx`);
            }

            let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
            let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

            presentation.loadExistingPPTX(function(err) {
                if (err) fail(err);

                presentation.addSlide();
                presentation.save(`${tmpDir}/add-slide-to-existing.pptx`);
                expect(fs.existsSync(`${tmpDir}/add-slide-to-existing.pptx`)).toBe(true);
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
