let convert = require('xml-js');
let fs = require('fs');

for (let i = 1; i <= 11; i++) {
	let xml_to_convert = fs.readFileSync(`slideLayout${i}.xml`);
	let json_object = convert.xml2json(xml_to_convert, { ignoreComment: true, alwaysChildren: true, compact: false });

	fs.writeFileSync(`${__dirname}/slideLayout${i}.xml.js`, json_object.toString());
}

console.log('Done.');
