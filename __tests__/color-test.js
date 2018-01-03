const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    describe('with an existing pptx file', () => {
        test('should be able to add another slide, change the background color of each slide, and add a default text foreground color', async () => {
            try {
                expect.assertions(1);

                if (fs.existsSync(`${tmpDir}/presentation-existing-non-default-colors.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-existing-non-default-colors.pptx`);
                }

                let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
                let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

                await presentation.loadExistingPPTX();

                let slide = presentation.getSlide('slide1');

                slide.setTextColor('00AAFF');
                slide.setBackgroundColor('C5E0B4');
                slide.addText('Hello world!', { x: 450, y: 100, cx: 400, cy: 25, fontSize: 24 });

                slide = presentation.addSlide();

                slide.setBackgroundColor('FFD777');
                slide.setTextColor('FF0000');
                slide.addText('Hello world!');

                await presentation.save(`${tmpDir}/presentation-existing-non-default-colors.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-existing-non-default-colors.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });

    describe('when creating a presentation without an existing file', () => {
        test('should be able to create a slide with a non-default background color and set a default text foreground color', async () => {
            try {
                expect.assertions(3);

                if (fs.existsSync(`${tmpDir}/presentation-new-non-default-colors.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-new-non-default-colors.pptx`);
                }

                let presentation = new PPTX.Presentation();
                let slide = presentation.addSlide();

                expect(slide.content).toBeDefined();
                expect(slide.content).not.toBeNull();

                slide.setTextColor('00AAFF');
                slide.setBackgroundColor('FFD777');
                slide.addText('Hello World!');

                slide = presentation.addSlide();
                slide.setBackgroundColor('C5E0B4');

                await presentation.save(`${tmpDir}/presentation-new-non-default-colors.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-new-non-default-colors.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });
});
