const PPTX = require('../index.js');
const fs = require('fs');
const path = require('path');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    beforeAll(() => {
        prepareTmpDir(tmpDir);
    });

    afterAll(() => {
        //emptyDir(tmpDir);
    });

    describe('with an existing pptx file', () => {
        test('should be able to load it', async () => {
            try {
                expect.assertions(2);

                let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
                let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

                await presentation.loadExistingPPTX();
                await presentation.save(`${tmpDir}/presentation-existing-rewrite.pptx`);

                fulltemplateFilePath = `${__dirname}/fixtures/basic2.pptx`;
                presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

                await presentation.loadExistingPPTX();
                presentation.getSlide('slide1').addImage(`${__dirname}/images/pizza.jpg`, { x: 500, y: 100, cx: 166, cy: 100 });
                presentation.addSlide().addImage(`${__dirname}/images/image1.png`);
                await presentation.save(`${tmpDir}/presentation-existing-add-image.pptx`);

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
                expect.assertions(3);

                let presentation = new PPTX.Presentation();
                let slide1 = presentation.addSlide();

                expect(slide1.content).toBeDefined();
                expect(slide1.content).not.toBeNull();

                slide1
                    .addText('This is slide 1')
                    .addText('Link to slide 3', { url: '#3', y: 25 })
                    .addText('Link to slide 4', { url: '#4', y: 50 });

                presentation
                    .addSlide()
                    .addText('This is slide 2.')
                    .addText('Go to slide 5', { url: '#5', y: 25 })
                    .addSlide()
                    .addText('This is slide 3')
                    .addText('Go back to slide 1', { url: '#1', y: 25 })
                    .addText('Go to slide 2', { y: 50, url: '#2' })
                    .addSlide()
                    .addText('This is slide 4.')
                    .addText('Go to slide 1', { url: '#1', x: 25, y: 25 })
                    .addSlide()
                    .addText('This is slide 5.')
                    .x(200)
                    .y(200)
                    .addText('Go back to slide 3', { url: '#3' });

                await presentation.save(`${tmpDir}/presentation-new-add-slide-links.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-new-add-slide-links.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });

        test('should be able to make a TOC', async () => {
            try {
                expect.assertions(3);

                let presentation = new PPTX.Presentation();
                let slide1 = presentation.addSlide();

                expect(slide1.content).toBeDefined();
                expect(slide1.content).not.toBeNull();

                slide1
                    .addText('Table of Contents', { x: 200 })
                    .addText('Introduction ............. 2', { url: '#2', x: 20, y: 50 })
                    .addText('Getting Started ...... 3', { url: '#3', x: 40, y: 75 })
                    .addText('Some More Info ..... 4', { url: '#4', x: 40, y: 100 })
                    .addText('Slide 5', { url: '#5', x: 20, y: 125 })
                    .addText('Slide 6', { url: '#6', x: 20, y: 150 })
                    .addText('Slide 7', { url: '#7', x: 20, y: 175 })
                    .addText('A bunch of links ..... 8', { url: '#8', x: 20, y: 200 })
                    .addText('Click the pizza to go to slide 3:', { x: 100, y: 350, cx: 300 })
                    .addImage(`${__dirname}/images/pizza.jpg`, { url: '#3', x: 100, y: 385, cx: 166, cy: 100 });

                slide1
                    .addSlide()
                    .addText('This is slide 2 (Introduction).', { x: 20 })
                    .addText('Go back to TOC.', { url: '#1', x: 20, y: 25 })
                    .addSlide()
                    .addText('This is slide 3 (Getting Started).', { x: 20, cx: 400 })
                    .addText('Go back to TOC.', { url: '#1', x: 20, y: 25 })
                    .addSlide()
                    .addText('This is slide 4 (Some More Info).', { x: 20, cx: 400 })
                    .addText('Go back to TOC.', { url: '#1', x: 20, y: 25 })
                    .addSlide()
                    .addSlide()
                    .addSlide();

                presentation.getSlide('slide5').addText('This is slide 5. Click to go back to the TOC.', { url: '#1' });
                presentation.getSlide('slide6').addText('This is slide 6. Click to go back to the TOC.', { url: '#1' });
                presentation.getSlide('slide7').addText('This is slide 7. Click to go back to the TOC.', { url: '#1' });

                presentation
                    .addSlide()
                    .addText('Random Links', { x: 100 })
                    .addText('Link to slide 1', { x: 25, y: 50, url: '#1' })
                    .addText('Link to slide 2', { x: 25, y: 75, url: '#2' })
                    .addText('Link to slide 3', { x: 25, y: 100, url: '#3' })
                    .addText('Link to slide 4', { x: 25, y: 125, url: '#4' })
                    .addText('Link to slide 5', { x: 25, y: 150, url: '#5' })
                    .addText('Link to slide 6', { x: 25, y: 175, url: '#6' })
                    .addText('Link to slide 7', { x: 25, y: 200, url: '#7' });

                await presentation.save(`${tmpDir}/presentation-new-table-of-contents.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-new-table-of-contents.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });

        test('should be able successfully create two identical files; one as a direct file write and the second via a callback', async () => {
            try {
                expect.assertions(4);

                let presentation = new PPTX.Presentation();
                presentation.addSlide(); // this will be "slide1", which we'll grab later
                let newSlide = presentation.addSlide(); // slide #2

                expect(newSlide.content).toBeDefined();
                expect(newSlide.content).not.toBeNull();

                newSlide.addImage(`${__dirname}/images/image1.png`, { url: 'www.github.com' });
                newSlide.addImage(
                    {
                        data: `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`,
                    },
                    { x: 25, y: 25 }
                );

                presentation.addSlide().addImage(`${__dirname}/images/pizza.jpg`);
                presentation.addSlide().addImage(`${__dirname}/images/pizza.jpg`, { x: 50, y: 50, cx: 500, cy: 300 });

                let defaultSlide = presentation.getSlide('slide1');

                defaultSlide.addText('Hello world!');
                defaultSlide.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 400, cx: 100, cy: 100, url: 'http://www.google.com' });
                defaultSlide.addText('This is a hyperlink! Will this go to google?', { x: 0, y: 25, cx: 400, url: 'http://www.google.com' });
                defaultSlide.addText('Will this go to slide 3?', { x: 0, y: 50, url: '#3' });
                defaultSlide.addImage(
                    {
                        data: `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`,
                    },
                    { x: 25, y: 350 }
                );

                defaultSlide
                    .addText('Another piece of text, non-default position, wide block.')
                    .x(100)
                    .y(100)
                    .cx(500)
                    .cy(50);

                defaultSlide
                    .addText('Text in skinny block, this should wrap.', { textVerticalAlign: 'top' })
                    .x(20)
                    .y(150)
                    .cx(200)
                    .cy(150);

                defaultSlide
                    .addText('Non-Latin (Cyrillic) character test: Привет мир!', { textVerticalAlign: 'top' })
                    .x(300)
                    .y(150)
                    .cx(400)
                    .cy(150)
                    .addText("Let's go crazy: оалмгцнйукрлмьтсмщфзйудлтлваывувыаитыбюяй", { x: 300, y: 175, cx: 400 });

                defaultSlide.addImage(`${__dirname}/images/pizza.jpg`, { url: '#3', x: 100, y: 200, cx: 166, cy: 100 });
                defaultSlide.addImage(`${__dirname}/images/image1.png`, { x: 400, y: 250, cx: 250, cy: 150 });
                presentation.getSlide('slide3').addText('OMFG!!! The link worked!');

                await presentation.save(`${tmpDir}/presentation-new-multiple-slides.pptx`);
                await presentation.save(function(content) {
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
    for (const file of fs.readdirSync(dir)) {
        fs.unlink(path.join(dir, file), err => {
            if (err) throw err;
        });
    }
}
