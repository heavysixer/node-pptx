const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    test('should be able to load an existing pptx file', () => {
        try {
            let fulltemplateFilePath = `${__dirname}/fixtures/process-map-template.pptx`;
            let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

            presentation.loadExistingPPTX(function(err) {
                if (err) fail(err);

                let slide1 = presentation.getSlide('slide1');

                expect(slide1.content).toBeDefined();
                expect(slide1.content).not.toBeNull();

                slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 50, y: 50, cx: 50, cy: 50 });

                let slide2 = presentation.addSlide();

                presentation.save(`${tmpDir}/process-map-rewrite.pptx`);
                expect(fs.existsSync(`${tmpDir}/process-map-rewrite.pptx`)).toBe(true);
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
