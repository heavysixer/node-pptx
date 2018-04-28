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
                            .value([
                                'Order Breakfast:',
                                [
                                    'Type: Task',
                                    'Overview: ordering breakfast is important.',
                                    'Cycle time: 10.5 hours',
                                    'Responsibility assignments:',
                                    ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): more blaw...', 'Customer (R): blaw.'],
                                    'Comments: some comments here...',
                                    'Repeating process: No.',
                                ],
                                'Take Order:',
                                [
                                    'Type: Task',
                                    'Overview: Taking orders is very important.',
                                    'Cycle time: 12.5 hours',
                                    'Responsibility assignments:',
                                    ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): stuff...'],
                                    'Comments: some more comments here...',
                                    'Repeating process: No.',
                                ],
                                'Prepare Ingredients:',
                                [
                                    'Type: Task',
                                    'Overview: this is very important to making breakfast.',
                                    'Cycle time: 3.71 hours',
                                    'Responsibility assignments:',
                                    ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): Waiter needs to be trained.'],
                                    'Comments: some more comments here...',
                                    'Repeating process: Yes.',
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
