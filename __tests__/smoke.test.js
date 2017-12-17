const PPTX = require('../index.js');
describe('test essentials', () => {
    test('true', () => {
        expect(Object.keys(PPTX)).toEqual(['Presentation', 'Slide', 'ShapeTypes']);
    });
});
