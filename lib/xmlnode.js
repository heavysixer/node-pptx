//------------------------------------------------------------------------------------------------------------------------------------
// Taken from won21 code temporarily. I want to get rid of it by refactoring the couple functions which use it in the chart generator.
//
// -Greg D.
//------------------------------------------------------------------------------------------------------------------------------------

// Super light implementation of an XML DOM
// Right now this keeps only the right hand side, not the left, so it doesn't keep its own tag
// The tag is defined implicitly by its hash key in th

let XmlNode = function(options) {
    if (this instanceof XmlNode) {
        this.el = {};
        if (typeof options === 'string') this.tagName = options;
        else if (options) this.tagName = options.tagName;
    } else return new XmlNode(options);
};

module.exports = XmlNode;

XmlNode.prototype.toJSON = function() {
    return this.el;
};

// pass in a single key, value pair, e.g. XmlNode().attr('color', 'red') to set one attribute
// or pass in an associative array, e.g. XmlNode().attr({color: 'red') to set multiple attributes
// or pass in just a key to get the attribute value
XmlNode.prototype.attr = function(key, val) {
    if (typeof val === 'number') val = `${val}`;
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
};

XmlNode.prototype.addChild = function(tag, node) {
    //  if (typeof node == 'string') this.el[tag] = node;
    //  else {
    this.el[tag] = this.el[tag] || [];
    this.el[tag].push(node instanceof XmlNode ? node.el : node);
    //  }
    return this;
};

XmlNode.prototype.setChild = function(tag, node) {
    this.el[tag] = node instanceof XmlNode ? node.el : node;
    return this;
};
