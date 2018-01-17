const fs = require('fs');

class MediaFactory {
    constructor(content) {
        this.content = content;
        this.fileList = {};
    }

    addMedia(name, source, sourceType) {
        if (name in this.fileList) {
            throw new Error('File name already exists in media list. Names must be unique.');
        }

        if (sourceType === 'base64') {
            this.fileList[name] = name;
            this.content[`ppt/media/${name}`] = new Buffer(source, 'base64');
        } else if (sourceType === 'file') {
            this.fileList[name] = source;
            this.content[`ppt/media/${name}`] = fs.readFileSync(source);
        } else if (sourceType === 'binary') {
            this.fileList[name] = name;
            this.content[`ppt/media/${name}`] = source;
        } else {
            throw new Error('Invalid mediaSource.type specified in MediaFactory.addMedia(). Possible values: "base64," "file," or "binary."');
        }
    }
}

module.exports.MediaFactory = MediaFactory;
