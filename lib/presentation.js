const JSZip = require('jszip');
const xml2js = require('xml2js');
const fs = require('fs');

let { PowerPointFactory } = require('./factories');
let { PptxUnitHelper } = require('./helpers/unit-helper');

let POWERPOINT_LAYOUTS = require('./layout-types').Layouts;

// TODO: refactor all this now that we use classes... (I don't like the layout or how it's structured)
class Presentation {
    constructor(args) {
        this.args = args;
        this.content = {};
        this.powerPointFactory = new PowerPointFactory(this, args);
        this.templateFilePath = null;
        this.defaultSlideLayout = 'slideLayout1';

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

    // setLayout() can either take an enum type, a string value of the enum, or a custom object that contains width and height properties.
    //
    // Examples:
    //
    // setLayout(PPTX.LayoutTypes.LAYOUT_WIDE);
    // setLayout(PPTX.LayoutTypes.LAYOUT_16x10);
    // setLayout('LAYOUT_WIDE');
    // setLayout({ width: 13.33, height: 7.5 });
    setLayout(layout) {
        let activeLayout;

        if (typeof layout === 'object' && layout.width && layout.height) {
            POWERPOINT_LAYOUTS['LAYOUT_USER'].width = PptxUnitHelper.fromInches(layout.width);
            POWERPOINT_LAYOUTS['LAYOUT_USER'].height = PptxUnitHelper.fromInches(layout.height);

            activeLayout = POWERPOINT_LAYOUTS['LAYOUT_USER'];
        } else if (layout in POWERPOINT_LAYOUTS) {
            activeLayout = POWERPOINT_LAYOUTS[layout];
        } else {
            console.warn(`Invalid layout in Presentation.setLayout(). Using type '${POWERPOINT_LAYOUTS['LAYOUT_4x3'].type}' as the default.`);

            activeLayout = POWERPOINT_LAYOUTS['LAYOUT_4x3'];
        }

        this.powerPointFactory.setLayout(activeLayout);
    }

    buildPowerPoint() {
        this.powerPointFactory.build();
        this.powerPointFactory.setPowerPointProperties(this.properties);
    }

    loadExistingPPTX(done) {
        if (this.templateFilePath !== null) {
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
