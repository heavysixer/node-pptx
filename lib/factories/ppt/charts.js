const XmlNode = require('../../xmlnode');

class ChartFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        // TODO: for now we don't have anything to load from our stubs, but leaving this here for the future...
    }

    addChartToEmbeddedWorksheetRelationship(chartName, worksheetName) {
        this.content[`ppt/charts/_rels/${chartName}.xml.rels`] = XmlNode().setChild(
            'Relationships',
            XmlNode()
                .attr({
                    xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
                })
                .addChild(
                    'Relationship',
                    XmlNode().attr({
                        Id: 'rId1',
                        Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/package',
                        Target: `../embeddings/${worksheetName}`,
                    })
                )
        ).el;
    }
}

module.exports.ChartFactory = ChartFactory;
