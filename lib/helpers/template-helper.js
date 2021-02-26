/* eslint-disable no-prototype-builtins */
const xml2js = require('xml2js');
const JSZip = require('jszip');
const fs = require('fs');

class TemplateHelper {

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

    static applyChartTemplate(template, {newChartSpaceBlock, chart, chartType}) {
        chartType = (chartType === undefined) 
            ? TemplateHelper.detectChartType(template) 
            : chartType

        TemplateHelper.applyChartSpace(template, newChartSpaceBlock)

        let seriesTemplate = TemplateHelper.getSeriesTemplate(template, chartType)
        let seriesData = TemplateHelper.createSeriesFromTemplate(chart.chartData, seriesTemplate)

        TemplateHelper.applySeriesToChart(seriesData, newChartSpaceBlock, chartType)
    }
    
    static createSeriesFromTemplate(chartData, seriesTemplate) {
        const callback = TemplateHelper.getPptFactoryHelper().createSingleSeriesDataNode
        return chartData.map(callback, { template: seriesTemplate })
    }

    static detectChartType(template) {
        const plotArea = template['c:chartSpace']['c:chart'][0]['c:plotArea'][0]
        for(let tag in plotArea) {
            if(plotArea[tag][0]['c:ser']) {
                return tag.replace('c:', '')
            }
        }
        return 'barChart'
    }

    static applyChartSpace(template, newChartSpaceBlock) {
        newChartSpaceBlock['c:chartSpace'] = template['c:chartSpace']
    }

    static getSeriesTemplate(template, chartType) {
        return template['c:chartSpace']['c:chart'][0]['c:plotArea'][0]['c:'+chartType][0]['c:ser']
    }

    static applySeriesToChart(series, newChartSpaceBlock, chartType) {
        newChartSpaceBlock['c:chartSpace']['c:chart'][0]['c:plotArea'][0]['c:'+chartType][0]['c:ser'] = series
    }

    static setTemplateSeriesDefault(templateSeries) {
        let series = JSON.parse(JSON.stringify(templateSeries))
        if(typeof series['c:cat'] === undefined) {
            series['c:cat'] = [ '' ]
        }
        return series
    }
    
    static setTemplateSeriesData(series, {i, tx, cat, val}) {
        series['c:idx'][0]['$']['val'] = i
        series['c:order'][0]['$']['val'] = i
        series['c:tx'][0] = tx
        series['c:cat'][0] = cat
        series['c:val'][0] = val
    }

    static getPptFactoryHelper() {
        const { PptFactoryHelper } = require('./ppt-factory-helper');
        return PptFactoryHelper
    }

}
  
module.exports.TemplateHelper = TemplateHelper;