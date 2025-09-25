const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
    describe('when creating a presentation without an existing file', () => {
        test('should be able to add an image via a base64 encoded string', async () => {
            try {
                expect.assertions(1);

                if (fs.existsSync(`${tmpDir}/presentation-new-add-base64-image.pptx`)) {
                    fs.unlinkSync(`${tmpDir}/presentation-new-add-base64-image.pptx`);
                }

                let pptx = new PPTX.Composer();

                await pptx.compose(async pres => {
                    await pres
                        .title('base64 Image Testing')
                        .author('Greg Dolley')
                        .addSlide(async slide => {
                            slide.addImage(image => {
                                image
                                    .file(`${__dirname}/images/pizza.jpg`)
                                    .x(100)
                                    .cx(200);
                            });

                            await slide.addImage({
                                src: 'https://www.kernel.org/theme/images/logos/tux.png',
                                href: 'https://www.kernel.org',
                                x: 10,
                                y: 400,
                                cx: 50,
                            });

                            slide.addImage({ file: `${__dirname}/images/pizza.jpg`, y: 300, cx: 75 });

                            slide.addImage(image => {
                                image
                                    .data(
                                        `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`
                                    )
                                    .x(350)
                                    .y(200);
                            });

                            slide.addImage({
                                data: `image/jpg;/9j/4AAQSkZJRgABAQEAYABgAAD/2wBDAAMCAgMCAgMDAwMEAwMEBQgFBQQEBQoHBwYIDAoMDAsKCwsNDhIQDQ4RDgsLEBYQERMUFRUVDA8XGBYUGBIUFRT/2wBDAQMEBAUEBQkFBQkUDQsNFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBT/wAARCAAgACADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD0P4zfGZfh1HFp2nRJda5OglAmBMUMeSNzYIyTggAH3PYN8x+IPHPiDxTJK2q6vd3iyEFomkIi4xjEYwo6DoOvNek+ANK0b4qfFfxP4k8VztL4U0eC41m+RH8qS4gjISGBDx8zExrjKkjIDBiDUTfHO71DULmLTPh/4XPhsKYo9FOjpN5cRQooa4UCYyY+bzNwJYE8dK/dcny6jltOMKdBTqpKU5Oys3qoq+t12sujbueTWqycmlKy1WnXp0/4J534f8ceIPC0kTaVq93ZrGSViWQmLnOcocqep6ivqH4N/GSP4jwzWV7ClnrNsgdlRvknXoXUHkYPUc4yOTnj5PXSL2e+S2Fo8VxLlkiddmRyeN3bg/lXbXnhvW/gT8UtPi1dDZXNjcxtKwZHzGyqzj5GYcpJjg9/WuzPsnwWY0ZKCSr2cotbu2r0W99utm7onD1pqSjN3jt6dFq9vw2Oh8Aato3wr+K3ifw34rgaPwpq8Fxo186R+bJbwSEPDOg5+ZSI2zhiBkhSwArS8N/C3V/BviSW70D4q6Ho3hqYfvPEljrKQzNa4382yuJjJgAeTj74Azj5q9F+Mnwbj+I0MN9YzJaazboUDOvyTp1CMeoIPQ89Tx6fL/iDwTr/AIWkkTVdJurMRkBpHjJj5xjDjKnr2NeflGYYfNaStWUKriozi7O7Wikubdv/ALeWyabsaVqcoycoxvHfTp1a06fcd5+0x8UrT4rfEn7bptxLfaVptnFplrfXEYjmu1QszTOoAALO7kYVeNvyqciuK8K6bc+OvG+mWUwNzLeXEay4wv7sY3njHRATx6VX8P8AgnXvFMkaaVpN1eCQkCRIyI+PVz8o6dzX1D8G/g2nw5hmvr6ZLvWbhAhZF+SBOpRT1JJ6n2HHr15pmmCyLAfVcPJOoo8sUnqul3ba2/S7Vl5RRozqVPaTWm/69d/xP//Z`,
                                x: 350,
                                y: 250,
                            });

                            await slide.addImage({
                                src: 'https://www.kernel.org/theme/images/logos/tux.png',
                                href: 'https://www.kernel.org',
                                x: 350,
                                y: 350,
                                cx: 50,
                            });

                            await slide.addImage(image => {
                                image
                                    .src('https://www.kernel.org/theme/images/logos/tux.png')
                                    .href('https://www.kernel.org')
                                    .x(350)
                                    .y(425)
                                    .cx(50);
                            });

                            await slide.addImage(image => {
                                image
                                    .src('https://www.kernel.org/theme/images/logos/tux.png')
                                    .x(400)
                                    .y(350)
                                    .cy(35);
                            });

                            await slide.addImage({
                                src: 'https://www.kernel.org/theme/images/logos/tux.png',
                                x: 450,
                                y: 350,
                                cy: 75,
                            });
                        });
                });

                pptx.presentation.addSlide(slide => {
                    slide.addImage(image => {
                        image.file(`${__dirname}/images/pizza.jpg`); // image will be big because the actual size will be detected
                    });
                });

                pptx.presentation.addSlide(slide => {
                    slide.addImage({ file: `${__dirname}/images/image1.png` }); // this image will also be big
                });

                await pptx.save(`${tmpDir}/presentation-new-add-base64-image.pptx`);
                expect(fs.existsSync(`${tmpDir}/presentation-new-add-base64-image.pptx`)).toBe(true);
            } catch (err) {
                console.warn(err);
                throw err;
            }
        });
    });
});
