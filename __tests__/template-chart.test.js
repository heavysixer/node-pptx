const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;
const tmpFile = 'charts-new-add-chart-apply-template.pptx'
const categories1 = ['Category 1', 'Category 2', 'Category 3', 'Category 4']
const barChartData1 = [
  {
    name: 'Series 1',
    labels: categories1,
    values: [6.3, 4.5, 2.5, 4.5],
  },
  {
    name: 'Series 2',
    labels: categories1,
    values: [3.4, 1.4, 1.8, 2.8],
  },
  {
    name: 'Series 3',
    labels: categories1,
    values: [2.0, 2.0, 1.0, 55.5],
  },
];

const pieChartData = [
    {
      name: 'Series 1',
      labels: categories1,
      values: [20, 30, 40, 10],
    }
];

  
const pptxTemplateFile = `${__dirname}/fixtures/template-charts.pptx`
describe('Charts Module', () => {
    beforeAll(() => {
        prepareTmpDir(tmpDir);
    });

    test('should be able to create a simple chart and apply a bar chart template', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();
            let promise = (await pptx.compose(async pres => {
                await pres.layout('LAYOUT_4x3').addSlide(async slide => {
                    await slide.addChart(chart => {
                        chart
                            .template({
                                pptxFile: pptxTemplateFile,
                                xmlFile: 'ppt/charts/chart1.xml'
                            })
                            .data(barChartData1)
                            .x(100)
                            .y(100)
                            .cx(400)
                            .cy(300);
                    });
                });

            })).save(`${tmpDir}/${tmpFile}`);

            await promise;

            expect(fs.existsSync(`${tmpDir}/${tmpFile}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to create a chart and apply a pie chart template', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();
            let promise = (await pptx.compose(async pres => {
                await pres.layout('LAYOUT_4x3').addSlide(async slide => {
                    await slide.addChart(chart => {
                        chart
                            .template({
                                pptxFile: pptxTemplateFile,
                                xmlFile: 'ppt/charts/chart2.xml'
                            })
                            .data(pieChartData)
                            .x(100)
                            .y(100)
                            .cx(400)
                            .cy(300);
                    });
                });

            })).save(`${tmpDir}/${tmpFile}`);

            await promise;

            expect(fs.existsSync(`${tmpDir}/${tmpFile}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
    });

    test('should be able to create a chart and apply a combo chart template', async () => {
        try {
            expect.assertions(1);

            let pptx = new PPTX.Composer();
            let promise = (await pptx.compose(async pres => {
                await pres.layout('LAYOUT_4x3').addSlide(async slide => {
                    await slide.addChart(chart => {
                        chart
                            .template({
                                pptxFile: pptxTemplateFile,
                                xmlFile: 'ppt/charts/chart3.xml',
                                callback: (template, { newChartSpaceBlock, TemplateHelper, chart }) => {
                                    // First we replace chartSpace by our template 
                                    TemplateHelper.applyChartSpace(template, newChartSpaceBlock)

                                    // We need to extract the different series templates using their chart type names
                                    let seriesTemplateBar = TemplateHelper.getSeriesTemplate(template, 'barChart')
                                    let seriesTemplateLine = TemplateHelper.getSeriesTemplate(template, 'lineChart')

                                    // Combined, the templates will be passed to the creator
                                    seriesTemplate = [
                                        seriesTemplateBar[0], seriesTemplateBar[1], seriesTemplateLine[0]
                                    ]

                                    // The series have to be calculated based on the passed series templates
                                    let series = TemplateHelper.createSeriesFromTemplate(chart.chartData, seriesTemplate)
                                    
                                    // We will override the template series with our created ones
                                    TemplateHelper.applySeriesToChart([series[0], series[1]], newChartSpaceBlock, 'barChart')
                                    TemplateHelper.applySeriesToChart([series[2]], newChartSpaceBlock, 'lineChart')
                                }
                            })
                            .data(barChartData1)
                            .x(100)
                            .y(100)
                            .cx(400)
                            .cy(300)
                    });
                });

            })).save(`${tmpDir}/${tmpFile}`);

            await promise;

            expect(fs.existsSync(`${tmpDir}/${tmpFile}`)).toBe(true);
        } catch (err) {
            console.warn(err);
            throw err;
        }
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
    if (fs.existsSync(`${__dirname}/tmp/${tmpFile}`)) {
        fs.unlink(`${__dirname}/tmp/${tmpFile}`, err => {
            if (err) throw err;
        });
    }
}
