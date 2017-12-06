const JSZip = require('jszip');
const xml2js = require('xml2js');
const fs = require('fs');

let loadExistingPPTX = function(args) {
	if (args && args.templateFilePath && typeof args.templateFilePath === 'string') {
		return fs.readFileSync(args.templateFilePath);
	}
};

// let createBlankPPTX = function() {
//
// }

let Presentation = function(args) {
	console.log('args = ', args);
	//console.log("args.templateFilePath = "+args.templateFilePath);

	this.content = {};

	if (!args) {
		this.buffer = toBuffer(); //createBlankPPTX();
	} else if (args && args.templateFilePath && typeof args.templateFilePath === 'string') {
		this.buffer = loadExistingPPTX(args);
	} else {
		throw new Error('Incorrect args parameter in Presentation() call.');
	}

	//Object.assign(this.content, args);
};

let compose = function() {};

let toBuffer = function() {
	let zip2 = new JSZip();
	let content = this.content;
	for (let key in content) {
		if (content.hasOwnProperty(key)) {
			let ext = key.substr(key.lastIndexOf('.'));
			if (ext === '.xml' || ext === '.rels') {
				let builder = new xml2js.Builder({ renderOpts: { pretty: false } });
				let xml2 = builder.buildObject(content[key]);
				zip2.file(key, xml2);
			} else {
				zip2.file(key, content[key]);
			}
		}
	}

	zip2.file(
		'docProps/app.xml',
		'<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes"><TotalTime>0</TotalTime><Words>0</Words><Application>Microsoft Macintosh PowerPoint</Application><PresentationFormat>On-screen Show (4:3)</PresentationFormat><Paragraphs>0</Paragraphs><Slides>2</Slides><Notes>0</Notes><HiddenSlides>0</HiddenSlides><MMClips>0</MMClips><ScaleCrop>false</ScaleCrop><HeadingPairs><vt:vector size="4" baseType="variant"><vt:variant><vt:lpstr>Theme</vt:lpstr></vt:variant><vt:variant><vt:i4>1</vt:i4></vt:variant><vt:variant><vt:lpstr>Slide Titles</vt:lpstr></vt:variant><vt:variant><vt:i4>2</vt:i4></vt:variant></vt:vector></HeadingPairs><TitlesOfParts><vt:vector size="3" baseType="lpstr"><vt:lpstr>Office Theme</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr><vt:lpstr>PowerPoint Presentation</vt:lpstr></vt:vector></TitlesOfParts><Company>Proven, Inc.</Company><LinksUpToDate>false</LinksUpToDate><SharedDoc>false</SharedDoc><HyperlinksChanged>false</HyperlinksChanged><AppVersion>14.0000</AppVersion></Properties>'
	);
	let buffer = zip2.generate({ type: 'nodebuffer' });
	return buffer;
};

let save = function(path) {
	console.log('FOO');
	fs.writeFile(path, this.toBuffer(), function(err) {
		if (err) throw err;
		console.log(`open ${path}`);
	});
};

Presentation.prototype.compose = compose;
Presentation.prototype.loadExistingPPTX = loadExistingPPTX;
Presentation.prototype.toBuffer = toBuffer;
Presentation.prototype.save = save;

module.exports = Presentation;
