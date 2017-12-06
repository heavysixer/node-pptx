const PPTX = require('../index.js');
const fs = require('fs');
const tmpDir = `${__dirname}/tmp`;

createTmpDir(tmpDir);

describe('Presentation Module', () => {
	// test('Should assign incoming attributes', () => {
	// 	TODO...
	// 	let opts = {
	// 	  foo: 'bar',
	// 	  obj: {
	// 	    one: 'one',
	// 	    two: 'two',
	// 	  },
	// 	};
    //
	// 	let presentation = new PPTX.Presentation(opts);
	// 	expect(presentation.content.foo).toBe('bar');
	// 	expect(presentation.content.obj.one).toBe('one');
	// });

	test('should be able to load an existing pptx file', () => {
		try {
			let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;

			console.log(`Using file path: ${fulltemplateFilePath}`);
			let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });
			presentation.save(tmpDir+"/rewrite-of-existing.pptx");
		} catch (err) {
			console.log(err);
			throw err;
		}
	});

	test('should be able to create a pptx file from scratch', () => {
		try {
			let presentation = new PPTX.Presentation();
			presentation.save(`${tmpDir}/example2.pptx`);
		} catch (err) {
			console.log(err);
			throw err;
		}
	});
});

function createTmpDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	}
}
