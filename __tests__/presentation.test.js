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

    test('should be able to create a pptx file from scratch', () => {
        try {
            let presentation = new PPTX.Presentation();

            presentation.buildPowerPoint(); // TODO: this function is needed for init, but is also used for building after adding objects to a pptx. Separate into two different functions...

            let newSlide = presentation.addSlide();

            expect(newSlide.content).toBeDefined();
            expect(newSlide.content).not.toBeNull();

            newSlide.addImage(`${__dirname}/images/image1.png`);
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

            // works with just text on the slide, but when adding images, the xml generator has weird behavior
            // which prevents objects from getting counted (some nodes should be in arrays when they aren't,
            // but this doesn't happen without the text, so something is confusion the xml generator...)
            // defaultSlide
            //     .addImage(`${__dirname}/images/pizza.jpg`)
            //     .x(100)
            //     .y(200)
            //     .cx(166)
            //     .cy(100);

            // defaultSlide
            //     .addImage(`${__dirname}/images/image1.png`)
            //     .x(400)
            //     .y(250)
            //     .cx(250)
            //     .cy(150);

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
