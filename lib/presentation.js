const JSZip = require('jszip');
const xml2js = require('xml2js');
const async = require('async');
const fs = require('fs');
const convert = require('xml-js');
const powerPointStubs = require('./power-point-stubs');
const parsers = require('./factories');

let Presentation = function(args) {
	this.content = {};
	this.templateFilePath = null;

	// FIXME: Not sure this is correct. If you load in a template that doesn't mean
	// that you also don't want to creates items from the included args.
	if (args && args.templateFilePath && typeof args.templateFilePath === 'string') {
		this.templateFilePath = args.templateFilePath;
	} else {
		for (let key in powerPointStubs.fragments) {
			if (Object.prototype.hasOwnProperty.call(powerPointStubs.fragments, key)) {
				this.content[key] = convert.json2xml(powerPointStubs.fragments[key], { compact: false });
			}
		}

		for (let key in powerPointStubs.images) {
			if (Object.prototype.hasOwnProperty.call(powerPointStubs.images, key)) {
				this.content[key] = fs.readFileSync(powerPointStubs.images[key]);
			}
		}
	}
};

Presentation.prototype.loadExistingPPTX = function(done) {
	if (this.templateFilePath !== null) {
		this.load(fs.readFileSync(this.templateFilePath), done);
	}
};

Presentation.prototype.load = function(data, done) {
	let zip = new JSZip(data);

	let content = this.content;
	async.each(
		Object.keys(zip.files),
		function(key, callback) {
			let ext = key.substr(key.lastIndexOf('.'));
			if (ext === '.xml' || ext === '.rels') {
				let xml = zip.file(key).asText();

				xml2js.parseString(xml, function(err, js) {
					content[key] = js;
					callback(null);
				});
			} else if (ext === '.jpeg') {
				content[key] = zip.file(key);
			} else {
				content[key] = zip.file(key).asText();
				callback(null);
			}
		},
		done
	);
};

Presentation.prototype.toBuffer = function() {
	let zip2 = new JSZip();
	let content = this.content;
	for (let key in content) {
		if (content.hasOwnProperty(key)) {
			let ext = key.substr(key.lastIndexOf('.'));
			if (ext === '.xml' || ext === '.rels') {
				let contentBlock = content[key];

				if (this.templateFilePath != null) {
					// if we're coming from a file, we'll have XML in this.content instead of JSON, so convert...
					let builder = new xml2js.Builder({
						renderOpts: {
							pretty: false,
						},
					});
					let xml2 = builder.buildObject(contentBlock);
				}

				zip2.file(key, contentBlock);
			} else {
				zip2.file(key, content[key]);
			}
		}
	}

	if (this.templateFilePath !== null) {
		zip2.file(
			'docProps/app.xml',
			'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><TotalTime>0</TotalTime><Words>0</Words><Application>Microsoft Macintosh PowerPoint</Application><PresentationFormat>On-screen Show (4:3)</PresentationFormat><Paragraphs>0</Paragraphs><Slides>2</Slides><Notes>0</Notes><HiddenSlides>0</HiddenSlides><MMClips>0</MMClips><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="4" baseType="variant"><vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant><vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant><vt:variant><vt:i4>2</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="3" baseType="lpstr"><vt:lpstr>Office Theme</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr></vt:vector></TitlesOfParts><Company>Proven, Inc.</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>14.0000</AppVersion></Properties>'
		);
	}

	let buffer = zip2.generate({ type: 'nodebuffer' });
	return buffer;
};

Presentation.prototype.save = function(path) {
	fs.writeFileSync(path, this.toBuffer());
};

module.exports = Presentation;
