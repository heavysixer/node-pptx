const PPTX = require('../index.js');
const fs = require('fs');
const path = require('path');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    beforeAll(() => {
        prepareTmpDir(tmpDir);
    });

    describe('with an existing pptx file', () => {
        test('should be able to load it', async () => {
            try {
                expect.assertions(2);

                let pptx = new PPTX.Composer();

                await pptx.load(`${__dirname}/fixtures/basic.pptx`);
                await pptx.save(`${tmpDir}/presentation-existing-rewrite.pptx`);

                await pptx.load(`${__dirname}/fixtures/basic2.pptx`);
                await pptx.compose(pres => {
                    pres.getSlide('slide1').addImage(image => {
                        image.file(`${__dirname}/images/pizza.jpg`).x(500).y(100).cx(166).cy(100);
                    });

                    pres.addSlide(slide => {
                        slide.addImage(image => {
                            image.file(`${__dirname}/images/image1.png`);
                        });
                    });
                });
                await pptx.save(`${tmpDir}/presentation-existing-add-image.pptx`);

                expect(fs.existsSync(`${tmpDir}/presentation-existing-rewrite.pptx`)).toBe(true);
                expect(fs.existsSync(`${tmpDir}/presentation-existing-add-image.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });

    describe('when creating a presentation without an existing file', () => {
        test('should be able to add links to other slides', async () => {
            try {
                expect.assertions(1);

                let pptx = new PPTX.Composer();

                await pptx.compose(pres => {
                    pres.addSlide(slide => {
                        slide
                            .addText(text => {
                                text.value('This is slide 1');
                            })
                            .addText(text => {
                                text.value('Link to slide 3').href('#3').y(25);
                            })
                            .addText(text => {
                                text.value('Link to slide 4').href('#4').y(50);
                            });
                    });

                    pres.addSlide(slide => {
                        slide.addText({ value: 'This is slide 2.' }).addText({ value: 'Go to slide 5', href: '#5', y: 25 });
                    });

                    pres.addSlide(slide => {
                        slide
                            .addText(text => {
                                text.value('This is slide 3');
                            })
                            .addText(text => {
                                text.value('Go back to slide 1').href('#1').y(25);
                            })
                            .addText(text => {
                                text.value('Go to slide 2').y(50).href('#2');
                            });
                    });

                    pres.addSlide(slide => {
                        slide
                            .addText(text => {
                                text.value('This is slide 4.');
                            })
                            .addText(text => {
                                text.value('Go to slide 1').href('#1').x(25).y(25);
                            });
                    });

                    pres.addSlide(slide => {
                        slide
                            .addText(text => {
                                text.value('This is slide 5.').x(200).y(200);
                            })
                            .addText(text => {
                                text.value('Go back to slide 3').href('#3');
                            });
                    });
                });

                await pptx.save(`${tmpDir}/presentation-new-add-slide-links.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-new-add-slide-links.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });

        test('should be able to make a TOC', async () => {
            try {
                expect.assertions(1);

                let pptx = new PPTX.Composer();

                // using "object format" mixed in with DSL
                await pptx.compose(async pres => {
                    pres.addSlide(slide => {
                        slide
                            .addText({ value: 'Table of Contents', x: 200 })
                            .addText({ value: 'Introduction ............. 2', href: '#2', x: 20, y: 50 })
                            .addText({ value: 'Getting Started ...... 3', href: '#3', x: 40, y: 75 })
                            .addText({ value: 'Some More Info ..... 4', href: '#4', x: 40, y: 100 })
                            .addText({ value: 'Slide 5', href: '#5', x: 20, y: 125 })
                            .addText({ value: 'Slide 6', href: '#6', x: 20, y: 150 })
                            .addText({ value: 'Slide 7', href: '#7', x: 20, y: 175 })
                            .addText({ value: 'A bunch of links ..... 8', href: '#8', x: 20, y: 200 })
                            .addText({ value: 'Click the pizza to go to slide 3:', x: 100, y: 350, cx: 300 });

                        slide.addImage({ file: `${__dirname}/images/pizza.jpg`, href: '#3', x: 100, y: 385, cx: 166, cy: 100 });
                    });

                    pres.addSlide(slide => {
                        slide
                            .addText({ value: 'This is slide 2 (Introduction).', x: 20 })
                            .addText({ value: 'Go back to TOC.', href: '#1', x: 20, y: 45 });
                    });

                    pres.addSlide(slide => {
                        slide
                            .addText({ value: 'This is slide 3 (Getting Started).', x: 20, cx: 400 })
                            .addText({ value: 'Go back to TOC.', href: '#1', x: 20, y: 25 });
                    });

                    pres.addSlide(slide => {
                        slide
                            .addText({ value: 'This is slide 4 (Some More Info).', x: 20, cx: 400 })
                            .addText({ value: 'Go back to TOC.', href: '#1', x: 20, y: 25 });
                    });

                    pres.addSlide();
                    pres.addSlide();
                    pres.addSlide();

                    pres.getSlide('slide5').addText({ value: 'This is slide 5. Click to go back to the TOC.', href: '#1' });
                    pres.getSlide('slide6').addText({ value: 'This is slide 6. Click to go back to the TOC.', href: '#1' });
                    pres.getSlide('slide7').addText({ value: 'This is slide 7. Click to go back to the TOC.', href: '#1' });

                    pres.addSlide(slide => {
                        slide
                            .addText({ value: 'Random Links', x: 100 })
                            .addText({ value: 'Link to slide 1', x: 25, y: 50, href: '#1' })
                            .addText({ value: 'Link to slide 2', x: 25, y: 75, href: '#2' })
                            .addText({ value: 'Link to slide 3', x: 25, y: 100, href: '#3' })
                            .addText({ value: 'Link to slide 4', x: 25, y: 125, href: '#4' })
                            .addText({ value: 'Link to slide 5', x: 25, y: 150, href: '#5' })
                            .addText({ value: 'Link to slide 6', x: 25, y: 175, href: '#6' })
                            .addText({ value: 'Link to slide 7', x: 25, y: 200, href: '#7' });
                    });

                    // pptx can also be saved in the composer (doesn't have to be done at the end [pptx level])
                    // useful for saving one version, modifying it, then saving another
                    // (you could also save a version outside the composer, then call compose() again and add modifications)
                    await pres.save(`${tmpDir}/presentation-new-table-of-contents.pptx`);
                });

                expect(fs.existsSync(`${tmpDir}/presentation-new-table-of-contents.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });

        test('should be able successfully create two identical files; one as a direct file write and the second via a callback', async () => {
            try {
                expect.assertions(2);

                let pptx = new PPTX.Composer();

                await pptx.compose(async pres => {
                    pres.addSlide(); // this will be "slide1", which we'll grab later

                    pres.addSlide(slide => {
                        slide.addImage(image => {
                            image.file(`${__dirname}/images/image1.png`).href('www.github.com');
                        });

                        slide.addImage(image => {
                            image
                                .data(
                                    `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`
                                )
                                .x(25)
                                .y(25);
                        });
                    });

                    pres.addSlide(slide => {
                        slide.addImage(image => {
                            image.file(`${__dirname}/images/pizza.jpg`).x(50).y(50).cx(200);
                        });
                    });

                    let defaultSlide = pres.getSlide('slide1');

                    defaultSlide
                        .addText(text => {
                            text.value('Hello world!');
                        })
                        .addShape(shape => {
                            shape.type(PPTX.ShapeTypes.TRIANGLE).x(100).y(400).cx(100).cy(100).href('http://www.google.com');
                        })
                        .addShape(shape => {
                            shape.type(PPTX.ShapeTypes.TRIANGLE).x(300).y(400).cx(250).cy(100).text('link to slide 2').href('#2');
                        })
                        .addText(text => {
                            text.value('This is a hyperlink! Will this go to google?').x(0).y(25).cx(400).href('http://www.google.com');
                        })
                        .addText(text => {
                            text.value('Will this go to slide 3?').x(0).y(50).href('#3');
                        })
                        .addText(text => {
                            text.value('Another piece of text, non-default position, wide block.').x(100).y(100).cx(500).cy(50);
                        })
                        .addText(text => {
                            text.value('Text in skinny block, this should wrap.').textVerticalAlign('top').x(20).y(150).cx(200).cy(150);
                        })
                        .addText(text => {
                            text.value('Non-Latin (Cyrillic) character test: Привет мир!').textVerticalAlign('top').x(300).y(150).cx(400).cy(150);
                        })
                        .addText(text => {
                            text.value("Let's go crazy: оалмгцнйукрлмьтсмщфзйудлтлваывувыаитыбюяй").x(300).y(175).cx(400);
                        })
                        .addImage(image => {
                            image
                                .data(
                                    `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`
                                )
                                .x(25)
                                .y(350);
                        });

                    defaultSlide.addImage(image => {
                        image.file(`${__dirname}/images/pizza.jpg`).href('#3').x(100).y(200).cx(166).cy(100);
                    });

                    defaultSlide.addImage(image => {
                        image.file(`${__dirname}/images/image1.png`).x(400).y(250).cy(150);
                    });

                    pres.getSlide('slide3').addText(text => {
                        text.value('OMFG!!! The link worked!');
                    });
                });

                await pptx.save(`${tmpDir}/presentation-new-multiple-slides.pptx`);
                await pptx.save(function (content) {
                    fs.writeFileSync(`${tmpDir}/presentation-new-multiple-slides-buffered.pptx`, content);
                });

                expect(fs.existsSync(`${tmpDir}/presentation-new-multiple-slides.pptx`)).toBe(true);
                expect(fs.existsSync(`${tmpDir}/presentation-new-multiple-slides-buffered.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });
});

function prepareTmpDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        emptyDir(dir);
    }
}

function emptyDir(dir) {
    let testFiles = [
        `${tmpDir}/presentation-existing-rewrite.pptx`,
        `${tmpDir}/presentation-existing-add-image.pptx`,
        `${tmpDir}/presentation-new-add-slide-links.pptx`,
        `${tmpDir}/presentation-new-table-of-contents.pptx`,
        `${tmpDir}/presentation-new-multiple-slides.pptx`,
        `${tmpDir}/presentation-new-multiple-slides-buffered.pptx`,
    ];

    for (let file in testFiles) {
        if (fs.existsSync(file)) fs.unlinkSync(file);
    }
}
