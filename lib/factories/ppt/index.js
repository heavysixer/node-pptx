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

    removeSlide(slideName) {
        this.presentationFactory.removeSlideRefIdFromGlobalList(this.pptRelsFactory.removePresentationToSlideRelationship(slideName));
        this.slideFactory.removeSlide(slideName);
    }

    moveSlide(sourceSlideNum, destinationSlideNum) {
        this.slideFactory.moveSlide(sourceSlideNum, destinationSlideNum);
    }

    addImage(slide, image) {
        let mediaName = '';
        let source = image.source;

        if (image.sourceType === 'file') {
            mediaName = `image-${uuidv4()}${path.extname(source)}`;
        } else if (image.sourceType === 'base64') {
            let imageExt = 'png'; // assume png unless otherwise specified

            if (source && /image\/(\w+);/.exec(source) && /image\/(\w+);/.exec(source).length > 0) imageExt = /image\/(\w+);/.exec(source)[1];
            if (source.indexOf(';') > -1) source = source.split(';').pop();

            mediaName = `image-${uuidv4()}.${imageExt}`;
        } else if (image.sourceType === 'url') {
            mediaName = `image-${uuidv4()}${path.extname(image.downloadUrl)}`;
        } else {
            throw new Error('Invalid "sourceType" specified in PptFactory.addImage(). Possible values: "base64," "file," or "binary."');
        }

        let rId = this.slideFactory.addImageToSlideRelationship(slide, `../media/${mediaName}`); // TODO: don't generate target string here, do it in the function

        PptFactoryHelper.handleHyperlinkOptions(this, PptFactoryHelper.HyperlinkType.IMAGE, slide, image.options);
        this.mediaFactory.addMedia(mediaName, source, image.sourceType === 'url' ? 'binary' : image.sourceType); // the image binary must be added to the "/media" folder
        image.autoSize();

        return this.slideFactory.addImage(slide, image, mediaName, rId, image.options);
    }

    addText(slide, textBox) {
        PptFactoryHelper.handleHyperlinkOptions(this, PptFactoryHelper.HyperlinkType.TEXT, slide, textBox.options);
        return this.slideFactory.addText(slide, textBox);
    }

    addShape(slide, shape) {
        PptFactoryHelper.handleHyperlinkOptions(this, PptFactoryHelper.HyperlinkType.IMAGE, slide, shape.options);
        return this.slideFactory.addShape(slide, shape);
    }

    async addChart(slide, chart) {
        this.slideFactory.addChartToSlideRelationship(slide, chart.name);

        let workbookJSZip = await ExcelHelper.createWorkbook(chart.chartData);
        let workbookContentZipBinary = await workbookJSZip.generateAsync({ type: 'arraybuffer' });
        let worksheetName = `Microsoft_Excel_Sheet${this.parentFactory.getWorksheetCount() + 1}.xlsx`;

        this.embeddingsFactory.addExcelEmbed(worksheetName, workbookContentZipBinary);
        this.chartFactory.addChartToEmbeddedWorksheetRelationship(chart.name, worksheetName);

        return this.slideFactory.addChart(slide, chart);
    }
}

module.exports.PptFactory = PptFactory;
