const fs = require('fs');

class MediaFactory {
    constructor(content) {
        this.content = content;
        this.fileList = {};
    }

    addMedia(name, mediaSource) {
        if (name in this.fileList) {
            throw new Error('File name already exists in media list. Names must be unique.');
        }

        if (mediaSource.type === 'base64') {
            this.fileList[name] = name;
            this.content[`ppt/media/${name}`] = new Buffer(mediaSource.source, 'base64');
        } else if (mediaSource.type === 'file') {
            this.fileList[name] = mediaSource.source;
            this.content[`ppt/media/${name}`] = fs.readFileSync(mediaSource.source);
        } else if (mediaSource.type === 'binary') {
            this.fileList[name] = name;
            this.content[`ppt/media/${name}`] = mediaSource.source;
        } else {
            throw new Error('Invalid mediaSource.type specified in MediaFactory.addMedia(). Possible values: "base64," "file," or "binary."');
        }
    }
}

module.exports.MediaFactory = MediaFactory;
