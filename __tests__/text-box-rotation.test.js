const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('TextBox Rotation Module', () => {
    test('should be able to create some text boxes from scratch with different angles of rotation', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();

            pptx.compose(pres => {
                pres.addSlide(slide => {
                    slide.addText(text => {
                        text.value('Text box rotated counter-clockwise by 25 degrees')
                            .x(100)
                            .y(150)
                            .cx(425)
                            .fontFace('Alien Encounters')
                            .fontSize(20)
                            .textColor('CC0000')
                            .textWrap('none')
                            .textAlign('center')
                            .textVerticalAlign('center')
                            .line({ color: '0000FF', dashType: 'dash', width: 1.0 })
                            .margin(0)
                            .rotation(-25);
                    });

                    slide.addText(text => {
                        text.value('Italics with clockwise rotation by 25 degrees').x(100).y(325).fontItalic(true).rotation(25);
                    });

                    slide.addText(text => {
                        text.value('45 degree rotation (clockwise)').x(20).y(150).rotation(45);
                    });

                    slide.addText(text => {
                        text.value('45 degree rotation (counter-clockwise)').x(150).y(100).rotation(-45);
                    });

                    slide.addText(text => {
                        text.value('Vertical text read from bottom to top.')
                            .x(350)
                            .y(250)
                            .cx(375)
                            .line({ color: '0000FF', dashType: 'solid', width: 1.0 })
                            .margin(5)
                            .rotation(-90);
                    });

                    slide.addText(text => {
                        text.value('Vertical text read from top to bottom.')
                            .x(400)
                            .y(250)
                            .cx(375)
                            .line({ color: '0000FF', dashType: 'solid', width: 1.0 })
                            .margin(5)
                            .rotation(90);
                    });
                });

                // bullet points that are rotated as a whole group
                pres.addSlide(slide => {
                    slide.addText(text => {
                        text.bulletPoints([
                            { text: 'This entire bullet-point panel should be rotated clockwise by 10 degrees', fontUnderline: true },
                            { text: 'Order Breakfast:', fontBold: true },
                            [
                                { textSegments: [{ text: 'Type: ', fontBold: true }, { text: 'Task' }], bulletToTextGapSize: 0 },
                                { textSegments: [{ text: 'Overview: ordering breakfast is important.' }] },
                                { textSegments: [{ text: 'Cycle time: ', fontBold: true }, { text: '10.5 hours' }] },
                                { text: 'Responsibility assignments:', fontBold: true, indentSize: 45, bulletToTextGapSize: 0 },
                                [
                                    { text: 'Kitchen Porter (R): blaw.', fontFace: 'Arial', fontSize: 15 },
                                    'Sous Chef (A): blaw, blaw.',
                                    'Waiter (R)(A): more blaw...',
                                    'Customer (R): blaw.',
                                ],
                                { textSegments: [{ text: 'Comments: ', fontBold: true }, { text: 'some comments here...' }] },
                                { textSegments: [{ text: 'Repeating process: ', fontBold: true }, { text: 'No.' }] },
                            ],
                            { text: 'Take Order:', fontBold: true, bulletType: PPTX.BulletTypes.STAR },
                            [
                                {
                                    textSegments: [{ text: 'Type: ', fontBold: true }, { text: 'Task' }],
                                    bulletType: PPTX.BulletTypes.HOLLOW_ROUND,
                                },
                                {
                                    textSegments: [{ text: 'Overview: ', fontBold: true }, { text: 'Taking orders is very important.' }],
                                    bulletType: PPTX.BulletTypes.FILLED_SQUARE,
                                },
                                {
                                    textSegments: [{ text: 'Cycle time: ', fontBold: true }, { text: '12.5 hours' }],
                                    bulletType: PPTX.BulletTypes.HOLLOW_SQUARE,
                                },
                                { text: 'Responsibility assignments:', fontBold: true, bulletType: PPTX.BulletTypes.ARROW },
                                ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): stuff...'],
                                {
                                    textSegments: [{ text: 'Comments: ', fontBold: true }, { text: 'some more comments here...' }],
                                    bulletType: PPTX.BulletTypes.CHECKMARK,
                                },
                                { textSegments: [{ text: 'Repeating process: ', fontBold: true }, { text: 'No.' }] },
                            ],
                            { text: 'Prepare Ingredients:', fontBold: true, startAt: 6 },
                            [
                                { textSegments: [{ text: 'Type: ', fontBold: true, fontFace: 'Arial' }, { text: 'Task' }] },
                                {
                                    textSegments: [{ text: 'Overview: ', fontBold: true }, { text: 'this is very important to making breakfast.' }],
                                },
                                { textSegments: [{ text: 'Cycle time: ', fontBold: true }, { text: '3.71 hours' }], startAt: 9 },
                                { text: 'Responsibility assignments:', fontBold: true, startAt: 10 },
                                ['Kitchen Porter (R): blaw.', 'Sous Chef (A): blaw, blaw.', 'Waiter (R)(A): Waiter needs to be trained.'],
                                { textSegments: [{ text: 'Comments: ', fontBold: true }, { text: 'some more comments here...' }], startAt: 9 },
                                { textSegments: [{ text: 'Repeating process: ', fontBold: true }, { text: 'Yes.' }], startAt: 9 },
                            ],
                            [['Level 3 indented']],
                        ])
                            .fontFace('Calibri')
                            .textColor('002960')
                            .fontSize(10)
                            .textVerticalAlign('top')
                            .backgroundColor('DCE6F2')
                            .x(25)
                            .y(75)
                            .cx(675)
                            .cy(450)
                            .rotation(10);
                    });
                });
            });

            await pptx.save(`${tmpDir}/text-box-rotations-new.pptx`);
            expect(fs.existsSync(`${tmpDir}/text-box-rotations-new.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
