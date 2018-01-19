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

                let pptx = new PPTX.Composer();
                await pptx.load(`${__dirname}/fixtures/basic.pptx`);

                let slide = pptx.getSlide('slide1');

                slide.textColor('00AAFF');
                slide.backgroundColor('C5E0B4');
                slide.addText({ value: 'Hello world!', x: 450, y: 100, cx: 400, cy: 25, fontSize: 24 });

                pptx.compose(pres => {
                    pres.addSlide(slide => {
                        slide.backgroundColor('FFD777');
                        slide.textColor('FF0000');
                        slide.addText(text => {
                            text.value('Hello world!');
                        });
                    });
                });

                await pptx.save(`${tmpDir}/presentation-existing-non-default-colors.pptx`);
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
                expect.assertions(1);

                if (fs.existsSync(`${tmpDir}/presentation-new-non-default-colors.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-new-non-default-colors.pptx`);
                }

                let pptx = new PPTX.Composer();

                pptx.compose(pres => {
                    pres.addSlide(slide => {
                        slide.textColor('00AAFF');
                        slide.backgroundColor('FFD777');
                        slide.addText(text => {
                            text.value('Hello World!');
                        });
                    });

                    pres.addSlide(slide => {
                        slide.backgroundColor('C5E0B4');
                    });
                });

                await pptx.save(`${tmpDir}/presentation-new-non-default-colors.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-new-non-default-colors.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });
});
