const PPTX = require('../index.js');
const fs = require('fs');
const path = require('path');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    beforeAll(() => {
        prepareTmpDir(tmpDir);
    });

    afterAll(() => {
        // emptyDir(tmpDir);
    });

    test('should be able to load an existing pptx file', () => {
        try {
            let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
            let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

            presentation.loadExistingPPTX(function(err) {
                if (err) fail(err);

                presentation.save(`${tmpDir}/rewrite-of-existing.pptx`);
                expect(fs.existsSync(`${tmpDir}/rewrite-of-existing.pptx`)).toBe(true);
            });

            fulltemplateFilePath = `${__dirname}/fixtures/basic2.pptx`;
            presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

            presentation.loadExistingPPTX(function(err) {
                if (err) fail(err);

                presentation
                    .getSlide('slide1')
                    .addImage(`${__dirname}/images/pizza.jpg`)
                    .x(500)
                    .y(100)
                    .cx(166)
                    .cy(100);

                presentation.addSlide('slideLayout6').addImage(`${__dirname}/images/image1.png`);

                presentation.save(`${tmpDir}/add-image-to-basic2.pptx`);
                expect(fs.existsSync(`${tmpDir}/add-image-to-basic2.pptx`)).toBe(true);
            });
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    test('should be able to load an existing pptx file and add another slide', () => {
        try {
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

    test('should be able to create a pptx file from scratch and add some links to other slides', () => {
        try {
            let presentation = new PPTX.Presentation();

            presentation.buildPowerPoint();

            let slide1 = presentation.getSlide('slide1');

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

            presentation.save(`${tmpDir}/slide-links.pptx`);
            expect(fs.existsSync(`${tmpDir}/slide-links.pptx`)).toBe(true);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    test('should be able to create a pptx file from scratch and make a TOC', () => {
        try {
            let presentation = new PPTX.Presentation();

            presentation.buildPowerPoint();

            let slide1 = presentation.getSlide('slide1');

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
                .addImage(`${__dirname}/images/pizza.jpg`, { url: '#3', x: 100, y: 385, cx: 166, cy: 100 })
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

            presentation.save(`${tmpDir}/table-of-contents.pptx`);
            expect(fs.existsSync(`${tmpDir}/table-of-contents.pptx`)).toBe(true);
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    test('should be able to create a pptx file from scratch', () => {
        try {
            let presentation = new PPTX.Presentation();

            presentation.buildPowerPoint(); // TODO: this function is needed for init, but is also used for building after adding objects to a pptx. Separate into two different functions...

            let newSlide = presentation.addSlide();

            expect(newSlide.content).toBeDefined();
            expect(newSlide.content).not.toBeNull();

            newSlide.addImage(`${__dirname}/images/image1.png`, { url: 'www.github.com' });
            presentation.addSlide('slideLayout3').addImage(`${__dirname}/images/pizza.jpg`);

            presentation
                .addSlide('slideLayout4')
                .addImage(`${__dirname}/images/pizza.jpg`)
                .x(50)
                .y(50)
                .cx(500)
                .cy(300);

            presentation.addSlide('slideLayout5');
            presentation.addSlide('slideLayout6');
            presentation.addSlide('slideLayout7');
            presentation.addSlide('slideLayout8');

            // since we always start with a blank slide by default, addSlide will always return slide #2 or more;
            // must grab slide 1 from the existing presentation
            let defaultSlide = presentation.getSlide('slide1');

            defaultSlide.addText('Hello world!');
            defaultSlide.addShape('triangle', { x: 400, cx: 100, cy: 100, url: 'http://www.google.com' });
            defaultSlide.addText('This is a hyperlink! Will this go to google?', { x: 0, y: 25, cx: 400, url: 'http://www.google.com' });
            defaultSlide.addText('Will this go to slide 3?', { x: 0, y: 50, url: '#3' });

            defaultSlide
                .addText('Another piece of text, non-default position, wide block.')
                .x(100)
                .y(100)
                .cx(500)
                .cy(50);

            defaultSlide
                .addText('Text in skinny block, this should wrap.')
                .x(20)
                .y(150)
                .cx(200)
                .cy(150);

            defaultSlide
                .addText('Non-Latin (Cyrillic) character test: Привет мир!')
                .x(300)
                .y(150)
                .cx(400)
                .cy(150)
                .addText("Let's go crazy: оалмгцнйукрлмьтсмщфзйудлтлваывувыаитыбюяй", { x: 300, y: 175, cx: 400 });

            defaultSlide
                .addImage(`${__dirname}/images/pizza.jpg`, { url: '#3' })
                .x(100)
                .y(200)
                .cx(166)
                .cy(100);

            defaultSlide
                .addImage(`${__dirname}/images/image1.png`)
                .x(400)
                .y(250)
                .cx(250)
                .cy(150);

            presentation.getSlide('slide3').addText('OMFG!!! The link worked!');
            presentation.save(`${tmpDir}/multiple_slides.pptx`);

            expect(fs.existsSync(`${tmpDir}/multiple_slides.pptx`)).toBe(true);
        } catch (err) {
            console.log(err);
            throw err;
        }
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

function fail(err) {
    expect(err).toBeNull();
}
