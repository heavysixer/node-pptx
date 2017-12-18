let { TextBox } = require('./text-box');

class Shape extends TextBox {
    addShape(type, options = {}) {
        if (typeof this.parentContainer.addShape === 'function') {
            return this.parentContainer.addShape(type, options);
        } else {
            throw new Error('Invalid call: parent container of Shape has no addShape() function.');
        }
    }
}

module.exports.Shape = Shape;
