//let XmlNode = require('./xmlnode');

class Image {
    constructor(args) {
        Object.assign(this, args);

        this.content = args.content;
        this.powerPointFactory = args.powerPointFactory;

        this.properties = this.content['p:spPr'][0];
    }

    x(val) {
        if (arguments.length === 0) return this.properties['a:xfrm'][0]['a:off'][0]['$'].x;
        // TODO...
    }

    y(val) {
        if (arguments.length === 0) return this.properties['a:xfrm'][0]['a:off'][0]['$'].y;
        // TODO...
    }

    cx(val) {
        // TODO...
    }

    cy(val) {
        // TODO...
    }
}

module.exports.Image = Image;
