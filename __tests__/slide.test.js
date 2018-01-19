const PPTX = require('../index.js');
// FIXME: These tests are meaningless now.
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
