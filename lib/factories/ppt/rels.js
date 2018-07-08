const fs = require('fs');
const xml2js = require('xml2js');
const uuidv4 = require('uuid/v4');

class PptRelsFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/_rels/presentation.xml.rels`), (err, js) => {
            this.content['ppt/_rels/presentation.xml.rels'] = js;
        });
    }

    addPresentationToSlideRelationship(slideName) {
        // old way of producing ID's - I'm keeping this commented line here for a couple versions just in case we run into problems
        //let rId = `rId${this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].length + 1}`;
        let newId = uuidv4();
        let rId = `rId-${newId}`;

        this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].push({
            $: {
                Id: rId,
                Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide',
                Target: `slides/${slideName}.xml`,
            },
        });

        return rId;
    }

    removePresentationToSlideRelationship(slideName) {
        let rId = -1;
        let relationshipIndex = -1;
        let slideType = 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide';
        let target = `slides/${slideName}.xml`;

        this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].forEach(function(element, index) {
            if (element['$'].Type === slideType && element['$'].Target === target) {
                rId = element['$'].Id;
                relationshipIndex = index;
                return;
            }
        });

        if (relationshipIndex !== -1) {
            this.content['ppt/_rels/presentation.xml.rels']['Relationships']['Relationship'].splice(relationshipIndex, 1);
        }

        return rId;
    }
}

module.exports.PptRelsFactory = PptRelsFactory;
