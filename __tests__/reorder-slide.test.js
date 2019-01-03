const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

// given a PPTX object with slides and a PPTX file to compare against, this function will check
// if the "slideNumber" slide in "pptx" matches the XML of the same slide in "validationFileName"
async function verifySlideMatch(slideNumber, pptx, validationFileName) {
    let comparisonPptx = new PPTX.Composer();
    await comparisonPptx.load(validationFileName);
    let comparisonXml = comparisonPptx.getSlide(slideNumber).getSlideXmlAsString();
    let xml = pptx.getSlide(slideNumber).getSlideXmlAsString();

    expect(xml).toEqual(comparisonXml);
}

describe('Presentation Module', () => {
    test("should be able to load an existing PPTX (containing three slides) and swap slide #'s 2 and 3", async () => {
        try {
            let testFileName = 'presentation-swap-existing-slides-small.pptx';

            expect.assertions(3);

            if (fs.existsSync(`${tmpDir}/${testFileName}`)) {
                fs.unlinkSync(`${tmpDir}/${testFileName}`);
            }

            let pptx = new PPTX.Composer();

            await pptx.load(`${__dirname}/fixtures/three-slides.pptx`);
            await pptx.compose(async pres => {
                let slide = pres.getSlide(3);
                slide.moveTo(2);

                slide.addText(text => {
                    text
                        .value('If this slide says "original slide #3" but is in slide position 2, then it worked.')
                        .x(25)
                        .y(200)
                        .cx(600);
                });
            });

            await pptx.save(`${tmpDir}/${testFileName}`);
            await verifySlideMatch(2, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);
            await verifySlideMatch(3, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);

            expect(fs.existsSync(`${tmpDir}/${testFileName}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to load an existing PPTX (containing six slides) and move slide #5 to slide #2', async () => {
        try {
            let testFileName = 'presentation-swap-existing-slides-large-5-to-2.pptx';

            expect.assertions(3);

            if (fs.existsSync(`${tmpDir}/${testFileName}`)) {
                fs.unlinkSync(`${tmpDir}/${testFileName}`);
            }

            let pptx = new PPTX.Composer();

            await pptx.load(`${__dirname}/fixtures/six-slides.pptx`);
            await pptx.compose(async pres => {
                let slide = pres.getSlide(5);
                slide.moveTo(2);
            });

            await pptx.save(`${tmpDir}/${testFileName}`);
            await verifySlideMatch(5, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);
            await verifySlideMatch(2, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);

            expect(fs.existsSync(`${tmpDir}/${testFileName}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to load an existing PPTX (containing six slides) and move slide #2 to slide #6', async () => {
        try {
            let testFileName = 'presentation-swap-existing-slides-large-2-to-6.pptx';

            expect.assertions(3);

            if (fs.existsSync(`${tmpDir}/${testFileName}`)) {
                fs.unlinkSync(`${tmpDir}/${testFileName}`);
            }

            let pptx = new PPTX.Composer();

            await pptx.load(`${__dirname}/fixtures/six-slides.pptx`);
            await pptx.compose(async pres => {
                let slide = pres.getSlide(2);
                slide.moveTo(6);
            });

            await pptx.save(`${tmpDir}/${testFileName}`);
            await verifySlideMatch(6, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);
            await verifySlideMatch(2, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);

            expect(fs.existsSync(`${tmpDir}/${testFileName}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to create a PPTX, add six slides, and move slide #5 to slide #2', async () => {
        try {
            let testFileName = 'presentation-create-new-swap-slides-5-to-2.pptx';
            let pptx = new PPTX.Composer();

            expect.assertions(3);

            await pptx.compose(async pres => {
                let slide1 = await pres.addSlide();
                let slide2 = await pres.addSlide();
                let slide3 = await pres.addSlide();
                let slide4 = await pres.addSlide();
                let slide5 = await pres.addSlide();
                let slide6 = await pres.addSlide();

                slide1.addText({ value: 'Slide 1', x: 200, y: 100 });
                slide2.addText({ value: 'Slide 2', x: 200, y: 100 });
                slide3.addText({ value: 'Slide 3', x: 200, y: 100 });
                slide4.addText({ value: 'Slide 4', x: 200, y: 100 });
                slide5.addText({ value: 'Slide 5', x: 200, y: 100 });
                slide6.addText({ value: 'Slide 6', x: 200, y: 100 });

                slide5.moveTo(2);
            });

            await pptx.save(`${tmpDir}/${testFileName}`);
            await verifySlideMatch(5, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);
            await verifySlideMatch(2, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);

            expect(fs.existsSync(`${tmpDir}/${testFileName}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to create a PPTX, add six slides, and move slide #2 to slide #6', async () => {
        try {
            let testFileName = 'presentation-create-new-swap-slides-2-to-6.pptx';
            let pptx = new PPTX.Composer();

            expect.assertions(3);

            await pptx.compose(async pres => {
                let slide1 = await pres.addSlide();
                let slide2 = await pres.addSlide();
                let slide3 = await pres.addSlide();
                let slide4 = await pres.addSlide();
                let slide5 = await pres.addSlide();
                let slide6 = await pres.addSlide();

                slide1.addText({ value: 'Slide 1', x: 200, y: 100 });
                slide2.addText({ value: 'Slide 2', x: 200, y: 100 });
                slide3.addText({ value: 'Slide 3', x: 200, y: 100 });
                slide4.addText({ value: 'Slide 4', x: 200, y: 100 });
                slide5.addText({ value: 'Slide 5', x: 200, y: 100 });
                slide6.addText({ value: 'Slide 6', x: 200, y: 100 });

                slide2.moveTo(6);
            });

            await pptx.save(`${tmpDir}/${testFileName}`);
            await verifySlideMatch(2, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);
            await verifySlideMatch(6, pptx, `${__dirname}/fixtures/verifications/${testFileName}`);

            expect(fs.existsSync(`${tmpDir}/${testFileName}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to create a PPTX and attempt an invalid slide move - should throw the correct exception and not crash', async () => {
        try {
            let pptx = new PPTX.Composer();

            expect.assertions(1);

            await pptx.compose(async pres => {
                let slide1 = await pres.addSlide();
                let slide2 = await pres.addSlide();
                let slide3 = await pres.addSlide();

                slide1.addText({ value: 'Slide 1', x: 200, y: 100 });
                slide2.addText({ value: 'Slide 2', x: 200, y: 100 });
                slide3.addText({ value: 'Slide 3', x: 200, y: 100 });

                try {
                    slide2.moveTo(10);
                } catch (err) {
                    expect(err.message).toContain('Destination slide number does not exist');
                }
            });
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
