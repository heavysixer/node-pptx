const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    test('should be able to add three slides and remove the second', async () => {
        try {
            expect.assertions(1);

            if (fs.existsSync(`${tmpDir}/presentation-remove-slide.pptx`)) {
                fs.unlinkSync(`${tmpDir}/presentation-remove-slide.pptx`);
            }

            let pptx = new PPTX.Composer();

            await pptx.compose(async pres => {
                pres.addSlide(slide => {
                    slide.addText(text => {
                        text
                            .value('Slide 1')
                            .x(200)
                            .y(100);
                    });
                });

                pres.addSlide(slide => {
                    slide.addText(text => {
                        text
                            .value('Slide 2')
                            .x(200)
                            .y(100);
                    });
                });

                pres.addSlide(slide => {
                    slide.addText(text => {
                        text
                            .value('Slide 3')
                            .x(200)
                            .y(100);
                    });
                });

                pres.removeSlide('slide2');
            });

            await pptx.save(`${tmpDir}/presentation-remove-slide.pptx`);
            expect(fs.existsSync(`${tmpDir}/presentation-remove-slide.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to add three slides and remove all of them', async () => {
        try {
            expect.assertions(1);

            if (fs.existsSync(`${tmpDir}/presentation-remove-all-slides.pptx`)) {
                fs.unlinkSync(`${tmpDir}/presentation-remove-all-slides.pptx`);
            }

            let pptx = new PPTX.Composer();

            await pptx.compose(async pres => {
                pres.addSlide(slide => {
                    slide.addText(text => {
                        text
                            .value('Slide 1')
                            .x(200)
                            .y(100);
                    });
                });

                pres.addSlide(slide => {
                    slide.addText(text => {
                        text
                            .value('Slide 2')
                            .x(200)
                            .y(100);
                    });
                });

                pres.addSlide(slide => {
                    slide.addText(text => {
                        text
                            .value('Slide 3')
                            .x(200)
                            .y(100);
                    });
                });

                pres.removeSlide('slide1');
                pres.removeSlide('slide2');
                pres.removeSlide('slide3');
            });

            await pptx.save(`${tmpDir}/presentation-remove-all-slides.pptx`);
            expect(fs.existsSync(`${tmpDir}/presentation-remove-all-slides.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
