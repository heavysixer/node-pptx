let convert = require('xml-js');
let fs = require('fs');

// for (let i = 1; i <= 11; i++) {
// 	let xml_to_convert = fs.readFileSync(`slideLayout${i}.xml.rels`);
// 	let json_object = convert.xml2json(xml_to_convert, { ignoreComment: true, alwaysChildren: true, compact: false });
//
// 	fs.writeFileSync(`${__dirname}/slideLayout${i}.xml.rels.js`, json_object.toString());
// }

let xml_to_convert = fs.readFileSync(`slide1.xml.rels`);
let json_object = convert.xml2json(xml_to_convert, { ignoreComment: true, alwaysChildren: true, compact: false });

fs.writeFileSync(`${__dirname}/slide1.xml.rels.js`, json_object.toString());


console.log('Done.');
