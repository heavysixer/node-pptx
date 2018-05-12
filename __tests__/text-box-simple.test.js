const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('TextBox Module', () => {
    test('should be able to create a simple text box from scratch', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();

            pptx.compose(pres => {
                pres.addSlide(slide => {
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
                    slide.addText({ value: 'Link to google.com', x: 200, y: 200, href: 'http://www.google.com' });

                    slide.addText(text => {
                        text
                            .value('Italics')
                            .x(100)
                            .y(325)
                            .fontItalic(true);
                    });

                    slide.addText(text => {
                        text
                            .value('Underlined text')
                            .x(100)
                            .y(350)
                            .fontUnderline(true);
                    });

                    slide.addText(text => {
                        text
                            .value('Subscript')
                            .x(100)
                            .y(375)
                            .fontSubscript(true);
                    });

                    slide.addText(text => {
                        text
                            .value('Superscript')
                            .x(100)
                            .y(400)
                            .fontSuperscript(true);
                    });

                    slide.addText({
                        value: 'Italic bold underlined text',
                        x: 100,
                        y: 425,
                        cx: 400,
                        fontItalic: true,
                        fontBold: true,
                        fontUnderline: true,
                    });
                });

                pres.addSlide(slide => {
                    slide.addText(text => {
                        text
                            .bulletPoints([
                                { text: 'Order Breakfast:', fontBold: true },
                                [
                                    { textSegments: [{ text: 'Type: ', fontBold: true }, { text: 'Task' }] },
                                    //{ textSegments: [{ text: 'Overview: ', fontBold: true }, { text: 'ordering breakfast is important.' }] },
                                    { textSegments: [{ text: 'Overview: ordering breakfast is important.' }] },
                                    { textSegments: [{ text: 'Cycle time: ', fontBold: true }, { text: '10.5 hours' }] },
                                    { text: 'Responsibility assignments:', fontBold: true },
                                    ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): more blaw...', 'Customer (R): blaw.'],
                                    { textSegments: [{ text: 'Comments: ', fontBold: true }, { text: 'some comments here...' }] },
                                    { textSegments: [{ text: 'Repeating process: ', fontBold: true }, { text: 'No.' }] },
                                ],
                                { text: 'Take Order:', fontBold: true },
                                [
                                    { textSegments: [{ text: 'Type: ', fontBold: true }, { text: 'Task' }] },
                                    { textSegments: [{ text: 'Overview: ', fontBold: true }, { text: 'Taking orders is very important.' }] },
                                    { textSegments: [{ text: 'Cycle time: ', fontBold: true }, { text: '12.5 hours' }] },
                                    { text: 'Responsibility assignments:', fontBold: true },
                                    ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): stuff...'],
                                    { textSegments: [{ text: 'Comments: ', fontBold: true }, { text: 'some more comments here...' }] },
                                    { textSegments: [{ text: 'Repeating process: ', fontBold: true }, { text: 'No.' }] },
                                ],
                                { text: 'Prepare Ingredients:', fontBold: true },
                                [
                                    { textSegments: [{ text: 'Type: ', fontBold: true, fontFace: 'Arial' }, { text: 'Task' }] },
                                    {
                                        textSegments: [
                                            { text: 'Overview: ', fontBold: true },
                                            { text: 'this is very important to making breakfast.' },
                                        ],
                                    },
                                    { textSegments: [{ text: 'Cycle time: ', fontBold: true }, { text: '3.71 hours' }] },
                                    { text: 'Responsibility assignments:', fontBold: true },
                                    ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): Waiter needs to be trained.'],
                                    { textSegments: [{ text: 'Comments: ', fontBold: true }, { text: 'some more comments here...' }] },
                                    { textSegments: [{ text: 'Repeating process: ', fontBold: true }, { text: 'Yes.' }] },
                                ],
                            ])
                            .fontFace('Calibri')
                            .fontSize(10)
                            .textVerticalAlign('top')
                            .backgroundColor('DCE6F2')
                            .x(25)
                            .y(25)
                            .cx(675)
                            .cy(500);
                    });
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
