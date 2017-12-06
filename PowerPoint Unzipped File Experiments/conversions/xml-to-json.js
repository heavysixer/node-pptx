let convert = require('xml-js');
let fs = require('fs');

let xml_to_convert = fs.readFileSync('core.xml');
let json_object = convert.xml2json(xml_to_convert, { ignoreComment: true, alwaysChildren: true, compact: false });

fs.writeFileSync(`${__dirname  }/core.xml.js`, json_object.toString());

console.log("Done.");
