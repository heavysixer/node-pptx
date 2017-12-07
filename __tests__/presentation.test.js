const PPTX = require('../index.js');
const fs = require('fs');
const path = require('path');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
	beforeAll(() => {
		prepareTmpDir(tmpDir);
	});

	afterAll(() => {
		emptyDir(tmpDir);
	});
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
			let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

			fail('This no longer works because the callback is never triggered for existing files');

			presentation.loadExistingPPTX(async function() {
				presentation.save(`${tmpDir}/rewrite-of-existing.pptx`);
				expect(fs.existsSync(`${tmpDir}/rewrite-of-existing.pptx`)).toBe(true);
			});
		} catch (err) {
			console.log(err);
			throw err;
		}
	});

	test('should be able to create a pptx file from scratch', () => {
		try {
			let presentation = new PPTX.Presentation();
			presentation.save(`${tmpDir}/example2.pptx`);
			expect(fs.existsSync(`${tmpDir}/example2.pptx`)).toBe(true);
		} catch (err) {
			console.log(err);
			throw err;
		}
	});
});

function prepareTmpDir(dir) {
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir);
	} else {
		emptyDir(dir);
	}
}

function emptyDir(dir) {
	for (const file of fs.readdirSync(dir)) {
		fs.unlink(path.join(dir, file), err => {
			if (err) throw err;
		});
	}
}
