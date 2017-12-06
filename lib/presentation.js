const JSZip = require('jszip');
const xml2js = require('xml2js');
const async = require('async');
const fs = require('fs');
const powerPointStubs = require('./power-point-stub');

// const glob = require('glob');
//const path = require('path');

// glob.sync(`${__dirname}/stub-fragments/*.js`).forEach(function(file) {
// 	let module_name = file.replace('.js', '');
// 	exports[module_name] = require(path.resolve(file));
//
// 	console.log(`module_name = ${  module_name}`);
// });

// require('fs').readdirSync(__dirname + '/').forEach(function(file) {
//   if (file.match(/\.js$/) !== null && file !== 'index.js') {
//     var name = file.replace('.js', '');
//     exports[name] = require('./' + file);
// 	 	console.log(`module_name = ${ name}`);
//   }
// });

let Presentation = function(args) {
	this.content = {};
	this.templateFilePath = null;

	if (args && args.templateFilePath && typeof args.templateFilePath === 'string') {
		this.templateFilePath = args.templateFilePath;
	}
};

Presentation.prototype.loadExistingPPTX = function(done) {
	if (this.templateFilePath) {
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
			if (ext == '.xml' || ext == '.rels') {
				let xml = zip.file(key).asText();

				xml2js.parseString(xml, function(err, js) {
					content[key] = js;
					callback(null);
				});
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

Presentation.prototype.save = function(path) {
	// fs.writeFile(path, this.toBuffer(), function(err) {
	// 	if (err) throw err;
	// 	console.log(`open ${path}`);
	// });
	fs.writeFileSync(path, this.toBuffer());
};

module.exports = Presentation;
