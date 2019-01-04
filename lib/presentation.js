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

    title(title) {
        this.properties.title = title;
        return this;
    }

    author(author) {
        this.properties.author = author;
        return this;
    }

    company(company) {
        this.properties.company = company;
        return this;
    }

    revision(revision) {
        this.properties.revision = revision;
        return this;
    }

    subject(subject) {
        this.properties.subject = subject;
        return this;
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

    // layout() can either take an enum type, a string value of the enum, or a custom object that contains width and height properties.
    //
    // Examples:
    //
    // layout(PPTX.LayoutTypes.LAYOUT_WIDE);
    // layout(PPTX.LayoutTypes.LAYOUT_16x10);
    // layout('LAYOUT_WIDE');
    // layout({ width: 13.33, height: 7.5 });
    layout(layout) {
        let activeLayout;

        if (typeof layout === 'object' && layout.width && layout.height) {
            POWERPOINT_LAYOUTS['LAYOUT_USER'].width = PptxUnitHelper.fromInches(layout.width);
            POWERPOINT_LAYOUTS['LAYOUT_USER'].height = PptxUnitHelper.fromInches(layout.height);

            activeLayout = POWERPOINT_LAYOUTS['LAYOUT_USER'];
        } else if (layout in POWERPOINT_LAYOUTS) {
            activeLayout = POWERPOINT_LAYOUTS[layout];
        } else {
            console.warn(`Invalid layout in Presentation.layout(). Using type '${POWERPOINT_LAYOUTS['LAYOUT_4x3'].type}' as the default.`);

            activeLayout = POWERPOINT_LAYOUTS['LAYOUT_4x3'];
        }

        this.powerPointFactory.setLayout(activeLayout);

        return this;
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

    // TODO: see if there's a way to get rid of layoutName and set it via the chaining method
    async addSlide(config, layoutName) {
        // if there is no composition function, then just make a new slide and return the slide object
        if (arguments.length === 0) return this.powerPointFactory.addSlide(layoutName || this.defaultSlideLayout);

        // in this case the config param will be the layout name (but use defaultSlideLayout if it's blank)
        if (arguments.length === 1 && typeof config === 'string') return this.powerPointFactory.addSlide(config || this.defaultSlideLayout);

        // if there is a composition function, call it, and return the presentation object
        await config(this.powerPointFactory.addSlide(layoutName || this.defaultSlideLayout));

        return this;
    }

    removeSlide(slide) {
        this.powerPointFactory.removeSlide(slide.name);
    }

    getSlide(slideNameOrNumber) {
        if (typeof slideNameOrNumber === 'number' && Number.isInteger(slideNameOrNumber)) {
            slideNameOrNumber = `slide${slideNameOrNumber}`;
        } else if (typeof slideNameOrNumber === 'string' && !slideNameOrNumber.startsWith('slide')) {
            throw new Error(`Invalid slide name in Presentation.getSlide(): ${slideNameOrNumber}`);
        }

        return this.powerPointFactory.getSlide(slideNameOrNumber);
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
        this.powerPointFactory.setPowerPointProperties(this.properties);

        if (typeof destination === 'string') {
            fs.writeFileSync(destination, await this.createZipBuffer());
        } else if (typeof destination === 'function') {
            // Wrap callback in Promise.resolve() since we don't know if the caller will pass an async or regular callback function.
            // Plus, since this save() function is async itself, we don't want to lose any exceptions that might be thrown from the
            // callback (we want them to bubble-up to the caller of save()). Note: in this case, probably could've just simply did:
            // "return destination(...)" without Promise.resolve() since the return value of "destination()" will either be a promise
            // anyway (in the case of async), or a value for non-async (including "undefined" if destination returns nothing) which
            // would be used as the save() function's resolved promise value. So we'd get what we want anyway without the Promise
            // wrapper, but that relies on the framework to behave exactly as expected and never change in the future - I'd rather
            // be explicit here rather than implicit.
            return Promise.resolve(destination(await this.createZipBuffer()));
        } else {
            throw new Error('Invalid destination value in Presentation.save() - can only be a file name or callback function.');
        }
    }
}

module.exports.Presentation = Presentation;
