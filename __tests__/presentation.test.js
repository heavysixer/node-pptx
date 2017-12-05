const PPTX = require('../index.js');
describe('Presentation Module', () => {
	test('Should assign incoming attributes', () => {
		let opts = {
			foo: 'bar',
			obj: {
				one: 'one',
				two: 'two',
			},
		};

		let presentation = new PPTX.Presentation(opts);
		expect(presentation.content.foo).toBe('bar');
		expect(presentation.content.obj.one).toBe('one');
	});

	test('should be able to load an existing pptx file', () => {
		//let presentation = new PPTX.Presentation({ filePath: './__tests__/fixtures/basic.pptx' });
		//presentation.save();
	});

	test('should be able to create a pptx file from scratch', () => {
		let presentation = new PPTX.Presentation();
		presentation.save('/tmp/example2.pptx');
	});
});
