const fs = require('fs');

class MediaFactory {
    constructor(content) {
        this.content = content;
        this.fileList = {};
    }

    // build() {
    //     for (let fileName in this.fileList) {
    //         this.content[`ppt/media/${fileName}`] = fs.readFileSync(this.fileList[fileName]);
    //     }
    // }

    addMedia(name, path) {
        if (name in this.fileList) {
            throw new Error('File name already exists in media list. Names must be unique.');
        }

        this.fileList[name] = path;
        this.content[`ppt/media/${name}`] = fs.readFileSync(path);
    }
}

module.exports.MediaFactory = MediaFactory;
