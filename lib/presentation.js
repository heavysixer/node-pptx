const JSZip = require('jszip');
const xml2js = require('xml2js');
const fs = require('fs');

let { PowerPointFactory } = require('./factories');

// TODO: refactor all this now that we use classes... (I don't like the layout or how it's structured)
class Presentation {
    constructor(args) {
        this.args = args;
        this.content = {};
        this.powerPointFactory = new PowerPointFactory(this, args);
        this.templateFilePath = null;
        this.defaultSlideLayout = 'slideLayout7'; // this is the blank slide layout from our base fragments

        this.setPowerPointProperties(args ? args.properties : {});

        if (args && args.templateFilePath && typeof args.templateFilePath === 'string') {
            this.templateFilePath = args.templateFilePath; // TODO: think of a more elegant way of doing this...
        }
    }

    setPowerPointProperties(props) {
        let powerPointProps = props || {};

        this.properties = {
            author: powerPointProps.author || '',
            company: powerPointProps.company || '',
            revision: powerPointProps.revision || '1.0',
            subject: powerPointProps.subject || '',
            title: powerPointProps.title || '',
        };
    }

    buildPowerPoint() {
        this.powerPointFactory.build();
        this.powerPointFactory.setPowerPointProperties(this.properties);
    }

    loadExistingPPTX(done) {
        if (this.templateFilePath !== null) {
            // TODO: if we're loading someone else's pptx, we can't rely on our default of slideLayout7 to exist,
            // so just pick slideLayout1 which should exist in every pptx. Long-term: add the ability to inject
            // our own blank slide layout and use that one as the default.
            this.defaultSlideLayout = 'slideLayout1';
            this.powerPointFactory.loadFromRawFileData(fs.readFileSync(this.templateFilePath), done);
        }
    }

    addSlide(layoutName) {
        return this.powerPointFactory.addSlide(this, layoutName || this.defaultSlideLayout);
    }

    getSlide(slideName) {
        return this.powerPointFactory.getSlide(slideName);
    }

    toBuffer() {
        let zip2 = new JSZip();
        let content = this.content;

        for (let key in content) {
            if (content.hasOwnProperty(key)) {
                let ext = key.substr(key.lastIndexOf('.'));

                if (ext === '.xml' || ext === '.rels') {
                    let builder = new xml2js.Builder({ renderOpts: { pretty: false } });
                    let xml = builder.buildObject(content[key]);

                    zip2.file(key, xml);
                } else {
                    zip2.file(key, content[key]);
                }
            }
        }

        if (this.templateFilePath !== null) {
            zip2.file(
                'docProps/app.xml',
                '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><TotalTime>0</TotalTime><Words>0</Words><Application>Microsoft Macintosh PowerPoint</Application><PresentationFormat>On-screen Show (4:3)</PresentationFormat><Paragraphs>0</Paragraphs><Slides>2</Slides><Notes>0</Notes><HiddenSlides>0</HiddenSlides><MMClips>0</MMClips><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="4" baseType="variant"><vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant><vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant><vt:variant><vt:i4>2</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="3" baseType="lpstr"><vt:lpstr>Office Theme</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr></vt:vector></TitlesOfParts><Company>Proven, Inc.</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>14.0000</AppVersion></Properties>'
            );
        }

        let buffer = zip2.generate({ type: 'nodebuffer' });
        return buffer;
    }

    save(path) {
        //this.powerPointFactory.rebuild(); // ***TEST***

        this.powerPointFactory.addDefaultMediaContentTypes();
        fs.writeFileSync(path, this.toBuffer());
    }
}

module.exports = Presentation;
