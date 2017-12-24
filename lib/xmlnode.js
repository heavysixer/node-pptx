// ----------------------------------------------------------------------------------------------------
// I refactored a lot of this code from the won21 pptx lib - and I'm liking it the more that I used it.
//
// -Greg D.
// ----------------------------------------------------------------------------------------------------

class XmlNodeClass {
    constructor(options) {
        this.el = {};

        if (typeof options === 'string') {
            this.tagName = options;
        } else if (options) {
            this.tagName = options.tagName;
        }
    }

    attr(key, val) {
        // if value is a number, convert to string
        if (typeof val === 'number') {
            val = `${val}`;
        }

        if (typeof key === 'undefined') {
            // return all attributes, if any are defined
            return this.el['$'];
        } else if (arguments.length === 1 && typeof key === 'object') {
            // assign attributes
            this.el['$'] = this.el['$'] || {};

            for (let attrName in key) {
                if (key.hasOwnProperty(attrName)) {
                    this.el['$'][attrName] = key[attrName];
                }
            }

            return this;
        } else if (typeof val === 'undefined') {
            // get the attribute value
            return this.el['$'] ? this.el['$'][key] : undefined;
        } else {
            this.el['$'] = this.el['$'] || {};
            this.el['$'][key] = val;

            return this;
        }
    }

    addChild(tag, node) {
        this.el[tag] = this.el[tag] || [];
        this.el[tag].push(node instanceof XmlNodeClass ? node.el : node);

        return this;
    }

    setChild(tag, node) {
        this.el[tag] = node instanceof XmlNodeClass ? node.el : node;

        return this;
    }

    toJSON() {
        return this.el;
    }
}

let XmlNode = function(options) {
    return new XmlNodeClass(options);
};

module.exports = XmlNode;
