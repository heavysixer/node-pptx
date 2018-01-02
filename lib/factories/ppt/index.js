/*
  Factories take a JSON payload and returns a hydrated fragment with the attributes of the
  JSON applied within.
*/
const uuidv4 = require('uuid/v4');
const path = require('path');

let { ExcelHelper } = require('../../helpers/excel-helper');
let { PresPropsFactory } = require('./pres-props');
let { PresentationFactory } = require('./presentation');
let { PptRelsFactory } = require('./rels');
let { SlideLayoutsFactory } = require('./slide-layouts');
let { SlideMastersFactory } = require('./slide-masters');
let { SlideFactory } = require('./slides');
let { TableStylesFactory } = require('./table-styles');
let { ThemeFactory } = require('./theme');
let { ViewPropsFactory } = require('./view-props');
let { MediaFactory } = require('./media');
let { EmbeddingsFactory } = require('./embeddings');
let { ChartFactory } = require('./charts');
let { PptFactoryHelper } = require('../../helpers/ppt-factory-helper');

class PptFactory {
    constructor(parentFactory, args) {
        this.content = parentFactory.content;
        this.parentFactory = parentFactory;
        this.args = args;
        this.pptRelsFactory = new PptRelsFactory(this, args);
        this.presentationFactory = new PresentationFactory(this, args);
        this.presPropsFactory = new PresPropsFactory(this, args);
        this.slideLayoutsFactory = new SlideLayoutsFactory(this, args);
        this.slideMastersFactory = new SlideMastersFactory(this, args);
        this.tableStylesFactory = new TableStylesFactory(this, args);
        this.themeFactory = new ThemeFactory(this, args);
        this.viewPropsFactory = new ViewPropsFactory(this, args);
        this.slideFactory = new SlideFactory(this, args);
        this.mediaFactory = new MediaFactory(this.content);
        this.embeddingsFactory = new EmbeddingsFactory(this, args);
        this.chartFactory = new ChartFactory(this, args);
    }

    build() {
        this.presPropsFactory.build();
        this.presentationFactory.build();
        this.pptRelsFactory.build();
        this.slideLayoutsFactory.build();
        this.slideMastersFactory.build();
        this.slideFactory.build();
        this.tableStylesFactory.build();
        this.themeFactory.build();
        this.viewPropsFactory.build();
        this.embeddingsFactory.build();
        this.chartFactory.build();
    }

    setLayout(layout) {
        this.presentationFactory.setLayout(layout);
    }

    setBackgroundColor(slide, color) {
        this.slideFactory.setBackgroundColor(slide, color);
    }

    addSlide(slideName, layoutName) {
        this.presentationFactory.addSlideRefIdToGlobalList(this.pptRelsFactory.addPresentationToSlideRelationship(slideName));
        return this.slideFactory.addSlide(slideName, layoutName);
    }

    addImage(slide, filePath, options = {}) {
        let mediaName = `image-${uuidv4()}${path.extname(filePath)}`;
        let rId = this.slideFactory.addImageToSlideRelationship(slide, `../media/${mediaName}`); // TODO: don't generate target string here, do it in the function

        PptFactoryHelper.handleHyperlinkOptions(this, PptFactoryHelper.HyperlinkType.IMAGE, slide, options);
        this.mediaFactory.addMedia(mediaName, filePath); // the image binary must be added to the "/media" folder
        return this.slideFactory.addImage(slide, path.basename(filePath), rId, options);
    }

    addText(slide, text, options = {}) {
        PptFactoryHelper.handleHyperlinkOptions(this, PptFactoryHelper.HyperlinkType.TEXT, slide, options);
        return this.slideFactory.addText(slide, text, options);
    }

    addShape(slide, type, options = {}) {
        PptFactoryHelper.handleHyperlinkOptions(this, PptFactoryHelper.HyperlinkType.IMAGE, slide, options);
        return this.slideFactory.addShape(slide, type, options);
    }

    async addChart(slide, chartName, type, data, options = {}) {
        this.slideFactory.addChartToSlideRelationship(slide, chartName);
        let chart = this.slideFactory.addChart(slide, chartName, type, data, options);

        let workbookJSZip = await ExcelHelper.createWorkbook(data);
        let workbookContentZipBinary = await workbookJSZip.generateAsync({ type: 'arraybuffer' });
        let worksheetName = `Microsoft_Excel_Sheet${this.parentFactory.getWorksheetCount() + 1}.xlsx`;

        this.embeddingsFactory.addExcelEmbed(worksheetName, workbookContentZipBinary);
        this.chartFactory.addChartToEmbeddedWorksheetRelationship(chartName, worksheetName);

        return chart;
    }
}

module.exports.PptFactory = PptFactory;
