const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Shape Rotation Module', () => {
    test('should be able to create some shapes and rotate them both clockwise and counter-clockwise', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();

            pptx.compose(pres => {
                pres.addSlide(slide => {
                    slide.addShape(shape => {
                        shape
                            .type(PPTX.ShapeTypes.RECTANGLE)
                            .x(50)
                            .y(50)
                            .cx(50)
                            .cy(50)
                            .rotation(45);
                    });

                    slide.addShape({ type: PPTX.ShapeTypes.ACTION_BUTTON_MOVIE, x: 150, y: 50, cx: 50, cy: 50, color: '00FF00', rotation: 75 });
                    slide.addShape({ type: PPTX.ShapeTypes.BENT_ARROW, x: 250, y: 50, cx: 50, cy: 50, color: '00FF00', rotation: 35.51 });
                    slide.addShape({ type: PPTX.ShapeTypes.BENT_ARROW, x: 350, y: 50, cx: 50, cy: 50, color: '00FF00', rotation: -35 });
                    slide.addShape({ type: PPTX.ShapeTypes.BENT_ARROW, x: 450, y: 50, cx: 50, cy: 50, color: '00FF00', rotation: 120 });
                    slide.addShape({ type: PPTX.ShapeTypes.BEVEL, x: 550, y: 50, cx: 50, cy: 50, color: '00FF00', rotation: 35.5 });
                    slide.addShape({ type: PPTX.ShapeTypes.BEVEL, x: 650, y: 50, cx: 50, cy: 50, color: '00FF00', rotation: 65});
                    slide.addShape({ type: PPTX.ShapeTypes.CAN, x: 50, y: 150, cx: 50, cy: 50, color: '00FF00', rotation: 10});
                    slide.addShape({ type: PPTX.ShapeTypes.CUBE, x: 150, y: 150, cx: 50, cy: 50, color: '00FF00', rotation: 20});
                    slide.addShape({ type: PPTX.ShapeTypes.FLOWCHART_MULTIDOCUMENT, x: 250, y: 150, cx: 50, cy: 50, color: '00FF00', rotation: 30});
                    slide.addShape({ type: PPTX.ShapeTypes.GEAR_6, x: 350, y: 150, cx: 50, cy: 50, color: '00FF00', rotation: 40});
                    slide.addShape({ type: PPTX.ShapeTypes.DIAMOND, x: 450, y: 150, cx: 50, cy: 50, color: '00FF00', rotation: 50});
                    slide.addShape({ type: PPTX.ShapeTypes.DOUBLE_BRACE, x: 550, y: 150, cx: 50, cy: 50, color: '00FF00', rotation: 180});
                    slide.addShape({ type: PPTX.ShapeTypes.DOWN_ARROW_CALLOUT, x: 650, y: 150, cx: 50, cy: 50, color: '00FF00', rotation: 200});
                    slide.addShape({ type: PPTX.ShapeTypes.DOWN_RIBBON, x: 50, y: 250, cx: 50, cy: 50, color: '00FF00', rotation: 230});
                    slide.addShape({ type: PPTX.ShapeTypes.BLOCK_ARC, x: 150, y: 250, cx: 50, cy: 50, color: '00FF00', rotation: 300});
                    slide.addShape({ type: PPTX.ShapeTypes.CROSS, x: 250, y: 250, cx: 50, cy: 50, color: '00FF00', rotation: -0});
                    slide.addShape({ type: PPTX.ShapeTypes.CROSS, x: 350, y: 250, cx: 50, cy: 50, color: '00FF00', rotation: Number.POSITIVE_INFINITY});
                });
            });

            await pptx.save(`${tmpDir}/shape-rotations-new.pptx`);
            expect(fs.existsSync(`${tmpDir}/shape-rotations-new.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });
});
