const PPTX = require('../index.js');
describe('Slide Module', () => {
	test('Should assign incoming attributes', () => {
		let opts = {
			foo: 'bar',
			obj: {
				one: 'one',
				two: 'two',
			},
		};
		let slide = new PPTX.Slide(opts);
		expect(slide.foo).toBe('bar');
		expect(slide.obj.one).toBe('one');
	});
});
