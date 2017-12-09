const PPTX = require('../index.js');
const fs = require('fs');
const path = require('path');
const tmpDir = `${__dirname}/tmp`;

describe('Presentation Module', () => {
	beforeAll(() => {
		prepareTmpDir(tmpDir);
	});

	afterAll(() => {
		// emptyDir(tmpDir);
	});

	test('should be able to load an existing pptx file', () => {
		try {
			let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
			let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });

			presentation.loadExistingPPTX(function(err) {
				if (err) fail(err);

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

			presentation.buildPowerPoint();
			let newSlide = presentation.addSlide('slide2', 'slideLayout2');

			expect(newSlide.rId).toBeDefined();
			expect(newSlide.rId).not.toBeNull();
			console.log('rId = ', newSlide.rId);

			presentation.addSlide('slide3!', 'slideLayout3');
			presentation.addSlide('slide4', 'slideLayout4');
			presentation.addSlide('Another', 'slideLayout5');
			presentation.addSlide('Woohoo!', 'slideLayout6');
			presentation.addSlide('HelloWorld!', 'slideLayout7');
			presentation.addSlide('Last', 'slideLayout8');

			presentation.save(`${tmpDir}/multiple_slides.pptx`);

			expect(fs.existsSync(`${tmpDir}/multiple_slides.pptx`)).toBe(true);
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
