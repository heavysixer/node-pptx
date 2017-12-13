const fs = require('fs');
const xml2js = require('xml2js');

class SlideFactory {
    constructor(parentFactory, args) {
        this.parentFactory = parentFactory;
        this.content = parentFactory.content;
        this.args = args;
    }

    build() {
        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slides/_rels/slide1.xml.rels`), (err, js) => {
            this.content['ppt/slides/_rels/slide1.xml.rels'] = js;
        });

        xml2js.parseString(fs.readFileSync(`${__dirname}/../../fragments/ppt/slides/slide1.xml`), (err, js) => {
            this.content['ppt/slides/slide1.xml'] = js;
        });
    }

    addSlide(slideName, layoutName) {
        let relsKey = `ppt/slides/_rels/${slideName}.xml.rels`;
        let slideKey = `ppt/slides/${slideName}.xml`;
        let layoutKey = `ppt/slideLayouts/${layoutName}.xml`;

        this.content[relsKey] = {
            Relationships: {
                $: {
                    xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships',
                },
                Relationship: [
                    {
                        $: {
                            Id: 'rId1',
                            Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout',
                            Target: `../slideLayouts/${layoutName}.xml`,
                        },
                    },
                ],
            },
        };

        // add the actual slide itself (use the layout template as the source; note: layout templates are NOT the same as master slide templates)
        let baseSlideContent = this.content[layoutKey]['p:sldLayout'];

        delete baseSlideContent['$']['preserve'];
        delete baseSlideContent['$']['type'];

        let slideContent = {
            'p:sld': baseSlideContent,
        };

        slideContent = JSON.parse(JSON.stringify(slideContent));

        this.content[slideKey] = slideContent;
    }

    addImageToSlideRelationship(slideName, target) {
        let relsKey = `ppt/slides/_rels/${slideName}.xml.rels`;
        console.log('key = ', relsKey);
        console.log('content rels = ', this.content[relsKey]);
        let rId = `rId${this.content[relsKey]['Relationships']['Relationship'].length + 1}`;

        this.content[relsKey]['Relationships']['Relationship'].push({
            $: {
                Id: rId,
                Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/image',
                Target: target,
            },
        });

        return rId;
    }

    addImage(slideName, imageFileName, rId, localId, options) {
        let slideKey = `ppt/slides/${slideName}.xml`;
        let objectCount = 0;

        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:nvGrpSpPr'][0]['p:cNvPr'].forEach(function(element) {
            objectCount++;
        });

        // no idea what this object is, but from looking at the XML I know we have to count it
        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:sp'].forEach(function(element) {
            if (element['p:nvSpPr'][0]['p:cNvPr']) {
                objectCount++;
            }
        });

        //console.log('T=', this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree']);

        // count existing images already on the slide
        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'].forEach(function(element) {
            //console.log('ELEMENT: ', element);
            Object.keys(element).filter(function(key) {
                if (key == 'p:pic') {
                    objectCount++; // TODO: test this...
                }
            });
        });

        if (!this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic']) {
            this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic'] = [];
        }

        this.content[slideKey]['p:sld']['p:cSld'][0]['p:spTree'][0]['p:pic'].push({
            'p:nvPicPr': {
                'p:cNvPr': { $: { id: objectCount + 1, name: 'TODO Name 1', descr: imageFileName } },
                'p:cNvPicPr': { 'a:picLocks': { $: { noChangeAspect: '1' } } },
                'p:nvPr': {},
            },
            'p:blipFill': {
                'a:blip': { $: { 'r:embed': rId, cstate: 'print' } },
                'a:stretch': { 'a:fillRect': {} },
            },
            'p:spPr': {
                'a:xfrm': {
                    'a:off': { $: { x: '0', y: '591502' } },
                    'a:ext': { $: { cx: '9144000', cy: '5674995' } },
                },
                'a:prstGeom': {
                    $: { prst: 'rect' },
                    'a:avLst': {},
                },
            },
        });
    }
}

module.exports.SlideFactory = SlideFactory;
