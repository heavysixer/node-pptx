const { imageSize } = require('image-size');
const fs = require('fs');

let { ElementProperties } = require('./element-properties');

class Image extends ElementProperties {
    constructor(args) {
        super();
        Object.assign(this, args);

        this.sourceType = 'file';
    }

    file(path) {
        this.source = path;
        this.sourceType = 'file';

        return this;
    }

    // this specifies a URL source for a remote image; same as "<img src=..."
    src(downloadUrl) {
        // this.source will get filled in at the time of download
        this.sourceType = 'url';
        this.downloadUrl = downloadUrl;

        return this;
    }

    // this sets a link on an image; same as "<a href=..."
    href(destinationUrl) {
        this.options.url = destinationUrl;

        return this;
    }

    data(base64EncodedImage) {
        this.source = base64EncodedImage;
        this.sourceType = 'base64';

        return this;
    }

    setContent(content) {
        this.content = content;
        super.setPropertyContent(this.content['p:spPr'][0]['a:xfrm'][0]);
    }

    autoSize() {
        let imageSource = this.source;

        if (this.sourceType === 'base64') {
            if (imageSource.includes(';')) imageSource = imageSource.split(';').pop();
        }

        if (this.cx() === 0 || this.cy() === 0) {
            let [cx, cy] = [this.cx(), this.cy()];
            let dimensions = {};

            if (this.sourceType === 'file') {
                dimensions = imageSize(fs.readFileSync(imageSource));
            } else if (this.sourceType === 'base64') {
                dimensions = imageSize(Buffer.from(imageSource, 'base64'));
            } else if (this.sourceType === 'url') {
                dimensions = imageSize(Buffer.from(imageSource));
            }

            // preserve aspect ratio; TODO: maybe the user doesn't want this, add config option...
            if (cx !== 0 && cy === 0) {
                cy = cx * (dimensions.height / dimensions.width);
            } else if (cx === 0 && cy !== 0) {
                cx = cy * (dimensions.width / dimensions.height);
            } else if (cx === 0 && cy === 0) {
                cx = dimensions.width;
                cy = dimensions.height;
            }

            this.cx(cx);
            this.cy(cy);
        }
    }
}

module.exports.Image = Image;
