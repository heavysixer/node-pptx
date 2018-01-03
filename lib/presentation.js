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

    async loadExistingPPTX(done) {
        if (this.templateFilePath !== null) {
            await this.powerPointFactory.loadFromRawFileData(fs.readFileSync(this.templateFilePath));
        }
    }

    addSlide(layoutName) {
        return this.powerPointFactory.addSlide(this, layoutName || this.defaultSlideLayout);
    }

    getSlide(slideName) {
        return this.powerPointFactory.getSlide(slideName);
    }

    async createZipBuffer() {
        let zip = this.zipContent();
        return await zip.generateAsync({ type: 'nodebuffer' });
    }

    zipContent() {
        let zip = new JSZip();
        let content = this.content;

        for (let key in content) {
            if (content.hasOwnProperty(key)) {
                let ext = key.substr(key.lastIndexOf('.'));

                if (ext === '.xml' || ext === '.rels') {
                    let builder = new xml2js.Builder({ renderOpts: { pretty: false } });
                    let xml = builder.buildObject(content[key]);

                    zip.file(key, xml);
                } else {
                    zip.file(key, content[key]);
                }
            }
        }

        return zip;
    }

    // "destination" can either be a file name or a callback function that will return the binary content as an argument
    async save(destination) {
        // TODO: if we will ever need to rebuild the object tree, it would be here:
        // this.powerPointFactory.rebuild();

        this.powerPointFactory.addDefaultMediaContentTypes();

        if (typeof destination === 'string') {
            fs.writeFileSync(destination, await this.createZipBuffer());
        } else if (typeof destination === 'function') {
            destination(await this.createZipBuffer());
        } else {
            throw new Error('Invalid destination value in Presentation.save() - can only be a file name or callback function.');
        }
    }
}

module.exports = Presentation;
