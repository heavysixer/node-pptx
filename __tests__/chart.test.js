const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

let { PptxUnitHelper } = require('../lib/helpers/unit-helper');

describe('Presentation Module', () => {
    beforeAll(() => {
        prepareTmpDir(tmpDir);
    });

    test('should be able to create a simple chart from scratch', async () => {
        try {
            let presentation = new PPTX.Presentation();

            presentation.buildPowerPoint();
            presentation.setSlideSize(PptxUnitHelper.fromInches(13.33), PptxUnitHelper.fromInches(7.5));

            let slide1 = presentation.getSlide('slide1');

            expect(slide1.content).toBeDefined();
            expect(slide1.content).not.toBeNull();

            let barChartData = {
                title: 'Sample bar chart',
                renderType: 'bar',
                data: [
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
                ],
            };

            await slide1.addChart(barChartData, { x: 100, y: 100, cx: 400, cy: 300 });

            let slide2 = presentation.addSlide();

            barChartData.title = 'Sample chart #2';
            barChartData.data = [
                {
                    name: 'Series 1',
                    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
                    values: [1.3, 4.5, 3.5, 4.5],
                },
                {
                    name: 'Series 2',
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

            await slide2.addChart(barChartData, { x: 0, y: 0, cx: 600, cy: 400 });

            presentation.save(`${tmpDir}/chart.pptx`);
            expect(fs.existsSync(`${tmpDir}/chart.pptx`)).toBe(true);
        } catch (err) {
            throw err;
        }
    });

    test('should be able to add a chart to an existing PowerPoint', () => {
        console.log('TODO...');
    });
});

function fail(err) {
    expect(err).toBeNull();
}

function prepareTmpDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
    } else {
        emptyDir(dir);
    }
}

function emptyDir(dir) {
    if (fs.existsSync(`${__dirname}/tmp/chart.pptx`)) {
        fs.unlink(`${__dirname}/tmp/chart.pptx`, err => {
            if (err) throw err;
        });
    }
}
