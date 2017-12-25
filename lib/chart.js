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
