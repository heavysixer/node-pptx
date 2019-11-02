const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

describe('Charts Module', () => {
    beforeAll(() => {
        prepareTmpDir(tmpDir);
    });

    test('should be able to create a simple chart from scratch', async () => {
        try {
            expect.assertions(1);

            let barChartData1 = [
                {
                    name: 'Series 1',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [4.3, 2.5, 3.5, 4.5],
                },
                {
                    name: 'Series 2',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [2.4, 4.4, 1.8, 2.8],
                },
                {
                    name: 'Series 3',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [2.0, 2.0, 3.0, 5.0],
                },
            ];

            let barChartData2 = [
                {
                    name: 'Series 1',
                    color: 'FF0000',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [1.3, 4.5, 3.5, 4.5],
                },
                {
                    name: 'Series 2',
                    color: PPTX.SchemeColors.ACCENT6,
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [6.4, 2.4, 3.8, 5.8],
                },
                {
                    name: 'Series 3',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [1.2, 3.7, 2.5, 1.0],
                },
                {
                    name: 'Series 4',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [2.4, 0.8, 0.2, 6.0],
                },
                {
                    name: 'Series 5',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [3.0, 4.0, 5.0, 6.0],
                },
            ];

            let pptx = new PPTX.Composer();
            let promise = (await pptx.compose(async pres => {
                await pres.layout('LAYOUT_4x3').addSlide(async slide => {
                    await slide.addChart(chart => {
                        chart
                            .type('bar')
                            .data(barChartData1)
                            .x(100)
                            .y(100)
                            .cx(400)
                            .cy(300);
                    });
                });

                await pres.addSlide(async slide => {
                    await slide.addChart(chart => {
                        chart.data(barChartData2);
                    });
                });
            })).save(`${tmpDir}/charts-new-add-chart.pptx`);

            await promise;

            expect(fs.existsSync(`${tmpDir}/charts-new-add-chart.pptx`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    xtest('should be able to add a chart to an existing PowerPoint', () => {
    // TODO: test the following:
    //      1) load existing with no chart, then add a chart
    //      2) load existing with a chart, then add a chart (you _might_ need to parse out worksheet counts for this)
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
    if (fs.existsSync(`${__dirname}/tmp/charts-new-add-chart.pptx`)) {
        fs.unlink(`${__dirname}/tmp/charts-new-add-chart.pptx`, err => {
            if (err) throw err;
        });
    }
}
