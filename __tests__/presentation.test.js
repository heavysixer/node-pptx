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

            expect(newSlide.rId).toBeDefined();
            expect(newSlide.rId).not.toBeNull();

            let newImage = newSlide.addImage(`${__dirname}/images/image1.png`, { x: 200, y: 200 });
            newImage
                .x(25)
                .y(50)
                .cx(800)
                .cy(300); // reposition

            console.log('Image x = ', newImage.x());
            console.log('Image y = ', newImage.y());
            console.log('Image cx = ', newImage.cx());
            console.log('Image cy = ', newImage.cy());

            presentation.addSlide('slideLayout3');
            presentation.addSlide('slideLayout4');
            presentation.addSlide('slideLayout5');
            presentation.addSlide('slideLayout6');
            presentation.addSlide('slideLayout7');
            presentation.addSlide('slideLayout8');

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
