const fs = require('fs');
const xml2js = require('xml2js');

class ContentTypeFactory {
	constructor(parentFactory, args) {
		this.parentFactory = parentFactory;
		this.content = parentFactory.content;
		this.args = args;
	}

	build() {
		xml2js.parseString(fs.readFileSync(`${__dirname}/../fragments/[Content_Types].xml`), (err, js) => {
			this.content['[Content_Types].xml'] = js;
		});

		// it's OK to have these content type definitions in the file even if they are not used anywhere in the pptx
		this.addDefaultContentType('png', 'image/png');
		this.addDefaultContentType('gif', 'image/gif');
	}

	addDefaultContentType(extension, contentType) {
		// should only be used internally
		this.content['[Content_Types].xml']['Types']['Default'].push({
			$: {
				Extension: extension,
				ContentType: contentType,
			},
		});
	}

	addContentType(partName, contentType) {
		this.content['[Content_Types].xml']['Types']['Override'].push({
			$: {
				PartName: partName,
				ContentType: contentType,
			},
		});
	}
}

module.exports.ContentTypeFactory = ContentTypeFactory;
