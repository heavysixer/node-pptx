const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('TextBox Module', () => {
    test('should be able to create a simple text box from scratch', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();

            await pptx.compose(async pres => {
                await pres.addSlide(slide => {
                    // declarative way of adding an object
                    slide.addText(text => {
                        text
                            .value('Hello World!')
                            .x(100)
                            .y(50)
                            .fontFace('Alien Encounters')
                            .fontSize(20)
                            .textColor('CC0000')
                            .textWrap('none')
                            .textAlign('left')
                            .textVerticalAlign('center')
                            .line({ color: '0000FF', dashType: 'dash', width: 1.0 })
                            .margin(0);
                    });

                    // plain "config" method of adding an object
                    slide.addText({ value: 'Link to google.com', x: 200, y: 300, href: 'http://www.google.com' });
                });
            });

            await pptx.save(`${tmpDir}/text-box-new-simple.pptx`);
            expect(fs.existsSync(`${tmpDir}/text-box-new-simple.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
