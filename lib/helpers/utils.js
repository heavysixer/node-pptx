function hasOwnProperty(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
}

module.exports = {
    hasOwnProperty,
};
