const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Shape Module', () => {
    test('should be able to add shapes', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();

            pptx.compose(pres => {
                pres.addSlide(slide => {
                    slide.addShape(shape => {
                        shape
                            .type(PPTX.ShapeTypes.TRIANGLE)
                            .x(50)
                            .y(50)
                            .cx(50)
                            .cy(50);
                    });

                    slide.addShape({ type: PPTX.ShapeTypes.TRIANGLE, x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });
                    slide.addShape({ type: PPTX.ShapeTypes.OVAL, x: 100, y: 200, cx: 200, cy: 100, text: 'hello world!' });
                    slide.addShape({ type: PPTX.ShapeTypes.ELLIPSE, x: 450, y: 200, cx: 200, cy: 100, text: 'hello world!', color: '00FF00' }); // testing alias (ELLIPSE == OVAL)
                    slide.addShape({ type: PPTX.ShapeTypes.TRAPEZOID, x: 320, y: 200, cx: 150, cy: 150, color: 'FF0000' });
                    slide.addShape({ type: PPTX.ShapeTypes.LEFT_ARROW, x: 500, y: 340, cx: 100, cy: 50, color: 'FF00FF' });
                    slide.addShape({ type: PPTX.ShapeTypes.RIGHT_ARROW, x: 500, y: 440, cx: 100, cy: 50, color: '0000FF' });
                    slide.addShape({ type: PPTX.ShapeTypes.UP_ARROW, x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', href: 'www.google.com' });
                    slide.addShape({
                        type: PPTX.ShapeTypes.OVAL,
                        x: 50,
                        y: 325,
                        text:
                            'Auto-fit test - width and height of shape object should not be specified. This shape should auto-grow to fit this text. ',
                        autoFit: true,
                    });
                    // TODO: FIXME: auto-shrink text broke (well, it didn't work perfectly before either - when opening a PPTX with an auto-shrink text shape, the text
                    //              never auto-shrunk until you changed a property on _any_ other shape manually [this was with an older Office version though]; then
                    //              PowerPoint would re-render the slide and auto-resize the text.) _Now_, the entire PPTX gets corrupted and it opens up blank. This
                    //              seems to coincide with a Windows 10 Office update which also broke the slide linking hack of being able to use "#<slide num>" as
                    //              the URL of a hyperlink to link to another slide. However, the slide link hack doesn't corrupt the PPTX, it simply makes the link
                    //              not do anything.
                    // slide.addShape({
                    //     type: PPTX.ShapeTypes.TRIANGLE,
                    //     x: 250,
                    //     y: 400,
                    //     cx: 200,
                    //     cy: 100,
                    //     text: 'auto-shrink text: this text should shrink',
                    //     shrinkText: true,
                    //     color: 'FF00AA',
                    // });

                    slide.addShape({
                        type: PPTX.ShapeTypes.RECTANGLE,
                        x: 250,
                        y: 25,
                        cx: 200,
                        cy: 100,
                        text: { textSegments: [{ text: 'Hello ', fontBold: true }, { text: 'world!' }] },
                        color: 'D9D9D9',
                        textVerticalAlign: 'top',
                    });
                });
            });

            await pptx.save(`${tmpDir}/shapes-test.pptx`);
            expect(fs.existsSync(`${tmpDir}/shapes-test.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
