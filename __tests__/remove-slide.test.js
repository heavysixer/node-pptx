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
                            .value('Slide 3 (which is now on slide 2 because the original slide 2 was removed)')
                            .x(50)
                            .y(100)
                            .cx(800);
                    });
                });

                pres.removeSlide(pres.getSlide('slide2'));
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
                let slide1 = await pres.addSlide();
                let slide2 = await pres.addSlide();
                let slide3 = await pres.addSlide();

                slide1.addText(text => {
                    text
                        .value('Slide 1')
                        .x(200)
                        .y(100);
                });

                slide2.addText(text => {
                    text
                        .value('Slide 2')
                        .x(200)
                        .y(100);
                });

                slide3.addText(text => {
                    text
                        .value('Slide 3')
                        .x(200)
                        .y(100);
                });

                pres.removeSlide(slide1);
                pres.removeSlide(slide2);
                pres.removeSlide(slide3);
                pres.removeSlide(slide1); // removing slide that was already removed - this should not crash
            });

            await pptx.save(`${tmpDir}/presentation-remove-all-slides.pptx`);
            expect(fs.existsSync(`${tmpDir}/presentation-remove-all-slides.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to add three slides, remove all of them, and add one', async () => {
        try {
            expect.assertions(1);

            if (fs.existsSync(`${tmpDir}/presentation-remove-all-then-add-one.pptx`)) {
                fs.unlinkSync(`${tmpDir}/presentation-remove-all-then-add-one.pptx`);
            }

            let pptx = new PPTX.Composer();

            await pptx.compose(async pres => {
                let slide1 = await pres.addSlide();
                let slide2 = await pres.addSlide();
                let slide3 = await pres.addSlide();

                slide1.addText({ value: 'Slide 1', x: 200, y: 100 });
                slide2.addText({ value: 'Slide 2', x: 200, y: 100 });
                slide3.addText({ value: 'Slide 3', x: 200, y: 100 });

                pres.removeSlide(slide1);
                pres.removeSlide(slide2);
                pres.removeSlide(slide3);

                let newSlide = await pres.addSlide();
                newSlide.addText({ value: 'New slide 1', x: 200, y: 100 });
            });

            await pptx.save(`${tmpDir}/presentation-remove-all-then-add-one.pptx`);
            expect(fs.existsSync(`${tmpDir}/presentation-remove-all-then-add-one.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to load an existing PPTX, remove a slide, add three, then remove the last slide', async () => {
        try {
            expect.assertions(1);

            if (fs.existsSync(`${tmpDir}/presentation-remove-existing-slide.pptx`)) {
                fs.unlinkSync(`${tmpDir}/presentation-remove-existing-slide.pptx`);
            }

            let pptx = new PPTX.Composer();

            await pptx.load(`${__dirname}/fixtures/raci-matrix.pptx`);
            await pptx.compose(async pres => {
                pres.removeSlide(pres.getSlide('slide1'));

                let slide1 = await pres.addSlide();
                let slide2 = await pres.addSlide();
                let slide3 = await pres.addSlide();

                slide1.addText(text => {
                    text
                        .value('Slide 1')
                        .x(200)
                        .y(100);
                });

                slide2.addText(text => {
                    text
                        .value('Slide 2')
                        .x(200)
                        .y(100);
                });

                slide3.addText(text => {
                    text
                        .value('Slide 3')
                        .x(200)
                        .y(100);
                });

                pres.removeSlide(slide3);

                await pptx.save(`${tmpDir}/presentation-remove-existing-slide.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-remove-existing-slide.pptx`)).toBe(true);
            });
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
