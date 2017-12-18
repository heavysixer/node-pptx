/*
Some notes:

officgen:

    -uses excelbuilder object which looks like it is generating a zip file in memory

won21:

    -also uses some excelbuilder object (looks like the same as whatever officegen is using)

pptxgenjs:

    -doesn't use ANY dependencies, BUT that guy actually coded a full xlsx generator himself!

--------------

Some random notes on adding a chart from the won21 lib:

-create content["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:graphicFrame"]:
    -clone /fragments/js/chartFrame (get this from the won21 lib)
    -this becomes jsChartFrame; modify it like:
        jsChartFrame["p:graphicFrame"]["p:nvGraphicFramePr"]["p:nvPr"]["p:extLst"]["p:ext"]["p14:modId"] =
        {
          "$": {
            "xmlns:p14": "http://schemas.microsoft.com/office/powerpoint/2010/main",
            "val": Math.floor(Math.random() * 4294967295)
          }
        }

-clone /fragments/js/cchart (this becomes jsChart)

-create jsChartSeries object like:

    var jsChartSeries = {
        "c:ser": chartInfo.data.map(this._ser, this)
    }

    What is chartInfo?

    Looks like it's just won21's chart data structure. Here's a sample:

    var barChart = {
      title: 'Sample bar chart',
      renderType: 'bar',
      data: [
        {
          name: 'Series 1',
          labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
          values: [4.3, 2.5, 3.5, 4.5]
        },
        {
          name: 'Series 2',
          labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
          values: [2.4, 4.4, 1.8, 2.8]
        },
        {
          name: 'Series 3',
          labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
          values: [2.0, 2.0, 3.0, 5.0]
        }
      ]
    }

    -Modify jsChart like:

        jsChart["c:chartSpace"]["c:chart"][0]["c:plotArea"][0]["c:barChart"][0]["c:ser"] = jsChartSeries['c:ser'];

    -Put jsChart into:
        this.content['ppt/charts/' + chartName + '.xml'] = jsChart;

    -Add content type which looks like:

        this.contentTypeFactory.addContentType(
            `/ppt/charts/${chartName}.xml`,
            'application/vnd.openxmlformats-officedocument.drawingml.chart+xml'
        );

    -Add default content type which looks like:

        this.contentTypeFactory.addDefaultType(
            `xlsx`,
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );

        (modify addDefaultType to not add if the node already exists)

    -Write a function similar to Chart.prototype.createWorkbook (in /lib/chart.js of the won21 lib)
        -You could probably just use the code as-is.
        -I'll refer to this function as createWorkbook from here.

    -createWorkbook will invoke a callback when it's done, in there do this:
        function (err, workbookJSZip) {
            self.presentation.registerChartWorkbook(chartName,  workbookJSZip.generate({type: 'arraybuffer'}));
            done(null, self);
        }

        -registerChartWorkbook does the following (this just links up the rels):

            Presentation.prototype.registerChartWorkbook = function(chartName, workbookContent) {
                var numWorksheets = this.getWorksheetCount();
                var worksheetName = 'Microsoft_Excel_Sheet' + (numWorksheets + 1) + '.xlsx';

                this.content["ppt/embeddings/" + worksheetName] = workbookContent;

                // ppt/charts/_rels/chart1.xml.rels
                this.content["ppt/charts/_rels/" + chartName + ".xml.rels"] = XmlNode().setChild("Relationships", XmlNode()
                    .attr({
                      'xmlns': "http://schemas.openxmlformats.org/package/2006/relationships"
                    })
                    .addChild('Relationship', XmlNode().attr({
                      "Id": "rId1",
                      "Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/package",
                      "Target": "../embeddings/" + worksheetName
                    }))
                ).el;
            }

            -workbookContent will be the raw content, just like our slide.content, shape.content, etc. objects
                -However, it will NOT be readable XML, it's going to be the ZIP binary content of an xlsx file

            -Note: the rId1 is hard-coded because you can only have one chart per slide in PowerPoint.
            -Under PptFactory, we'll need to add ChartFactory, ChartRelsFactory (under ChartFactory), and an EmbeddingsFactory

-All the stuff above gets you the chart.content block. Now with that block you need to add it to the slide itself:

    -Take the slide's content and insert it into this node:

        slide.content["p:sld"]["p:cSld"][0]["p:spTree"][0]["p:graphicFrame"] = chart.content;

    -Add an entry in that slide's rels file:

        -create a function called SlideFactory.addChartToSlideRelationship() and do the same as
         addImageToSlideRelationship, except your new node will look like:

         this.content[`ppt/slides/_rels/${slide.name}.xml.rels`]['Relationships']['Relationship'].push({
           "$": {
             "Id": rId ,
             "Type": "http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart",
             "Target": target //"../charts/" + chartName + ".xml"
           }

        -We would now have addImageToSlideRelationship and addChartToSlideRelationship being virtually
         identical functions (only thing different is the type). TODO: we could refactor this into one.

DONE.

*/

let { ElementProperties } = require('./element-properties');

class Chart extends ElementProperties {
    constructor(args) {
        super();
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;
        this.properties = this.content['p:graphicFrame'][0];
        this.parentContainer = args.parentContainer;
    }
}

module.exports.Chart = Chart;
