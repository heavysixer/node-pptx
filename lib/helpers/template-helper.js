/* eslint-disable no-prototype-builtins */
const xml2js = require('xml2js');
const JSZip = require('jszip');
const fs = require('fs');

// This helper class bundles functions needed to read, transform and apply xml templates.
class TemplateHelper {

    // We need to load, extract and parse xml data from a given pptx file
    // Currently, only charts can be edited this way.
    // TODO: also non-zipped xml data should be processed.
    static async applyTemplateXml(params, target) {
        const parser = new xml2js.Parser({});
        const zip = new JSZip();
        
        const content = fs.readFileSync(params.pptxFile)
        const unzipped = await zip.loadAsync(content)
        const xmlBuffer = await unzipped.files[params.xmlFile].async('nodebuffer')
        const callback = TemplateHelper.getTemplateCallback(params, target)

        parser.parseString(xmlBuffer, function (err, templateXml) {
            callback(templateXml, target)
        })
    }

    // When there is no callback defined, we will apply a default callback.
    // The default callback will depend on the type of shape; atm only charts are supported.
    static getTemplateCallback(params, target) {
        if(params.callback === undefined) {
            if(target.chart) {
                return TemplateHelper.applyChartTemplate
            }
        } else {
            target.TemplateHelper = TemplateHelper
            return params.callback
        }
    }

    // This is the default callback to inject template xml data into a newChartSpaceBlock
    static applyChartTemplate(template, {newChartSpaceBlock, chart, chartType}) {
        chartType = (chartType === undefined) 
            ? TemplateHelper.detectChartType(template) 
            : chartType

        TemplateHelper.applyChartSpace(template, newChartSpaceBlock)

        let seriesTemplate = TemplateHelper.getSeriesTemplate(template, chartType)
        let seriesData = TemplateHelper.createSeriesFromTemplate(chart.chartData, seriesTemplate)

        TemplateHelper.applySeriesToChart(seriesData, newChartSpaceBlock, chartType)
    }
    
    // This will refer to getPptFactoryHelper.createSingleSeriesDataNode.
    // A check for this.template will fork back here and call TemplateHelper.setTemplateSeriesData
    static createSeriesFromTemplate(chartData, seriesTemplate) {
        const callback = TemplateHelper.getPptFactoryHelper().createSingleSeriesDataNode
        return chartData.map(callback, { template: seriesTemplate })
    }

    // If we don't have to deal with combo charts, the chart type can be auto-detected.
    // The first parent of a series will return the cart type.
    static detectChartType(template) {
        const plotArea = template['c:chartSpace']['c:chart'][0]['c:plotArea'][0]
        for(let tag in plotArea) {
            if(plotArea[tag][0]['c:ser']) {
                return tag.replace('c:', '')
            }
        }
        return 'barChart'
    }

    // This will replace the entire chartSpace by the given template xml.
    static applyChartSpace(template, newChartSpaceBlock) {
        newChartSpaceBlock['c:chartSpace'] = template['c:chartSpace']
    }

    // We want to pick the series by chart type.
    static getSeriesTemplate(template, chartType) {
        return template['c:chartSpace']['c:chart'][0]['c:plotArea'][0]['c:'+chartType][0]['c:ser']
    }

    // This is to replace the template series by a calculated one.
    static applySeriesToChart(series, newChartSpaceBlock, chartType) {
        newChartSpaceBlock['c:chartSpace']['c:chart'][0]['c:plotArea'][0]['c:'+chartType][0]['c:ser'] = series
    }

    // We have to clone the template series get a fresh copy.
    static setTemplateSeriesDefault(templateSeries) {
        let series = JSON.parse(JSON.stringify(templateSeries))
        if(typeof series['c:cat'] === undefined) {
            series['c:cat'] = [ '' ]
        }
        return series
    }
    
    // This will apply the data from PptFactoryHelper.createSingleSeriesDataNode
    static setTemplateSeriesData(series, {i, tx, cat, val}) {
        series['c:idx'][0]['$']['val'] = i
        series['c:order'][0]['$']['val'] = i
        series['c:tx'][0] = tx
        series['c:cat'][0] = cat
        series['c:val'][0] = val
    }

    // We need this, because 
    // const { PptFactoryHelper } = require('./ppt-factory-helper') 
    // on top of this file will return undefined and I have no clue why.
    static getPptFactoryHelper() {
        const { PptFactoryHelper } = require('./ppt-factory-helper');
        return PptFactoryHelper
    }

}
  
module.exports.TemplateHelper = TemplateHelper;