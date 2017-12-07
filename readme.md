# node-pptx [![Build Status](https://travis-ci.org/heavysixer/node-pptx.svg?branch=master)](https://travis-ci.org/heavysixer/node-pptx)

## Under Development (Do not use)

Generate PPTX files on the server-side with JavaScript.

## Install

```
$ npm install node-pptx
```

## Usage

```javascript
const pptx = require('node-pptx');

// Currently PowerPoint files can only be created by supplying a JSON
// representation of the presentation to the initializer.

let presentation = new pptx.Presentation({
  title: 'Hello World',
  slides: [
    {elements:
    [{
      type: 'Text'
      attributes: {
        value: 'Hi!'
        x: 10,
        y: 0
      }
    },
    {
      type: 'Shape',
      attributes: {
        type: 'Circle'
      }
    },
    {
      type: 'Image',
      attributes: {
        src: 'http://www.someurl.com/some-image.jpg'
      }
    }]}
  ]
});
presentation.save('/tmp/my-presentation');

// In the futures presentations will also be able to composed through the DSL
new pptx.Presentation()
  .compose(pres => {

    pres.title('My Presentation')
    .addSlide(slide => {

      slide
      .addText(text => {

        text
        .value('Hello world')
        .x(10)
        .y(0);
      })
      .addShape(shape => {

        shape.type('circle');
      })
      .addImage(image => {

        image.src('http://www.someurl.com/some-image.jpg');
      });
    });
})
.save('/tmp/my-presentation.pptx');
```

## Special Thanks

This project builds off the hard work of several other PPTX libraries namely:

* <https://github.com/gitbrent/PptxGenJS>
* <https://github.com/Ziv-Barber/officegen>
* <https://github.com/won21kr/js-pptx>

## License

MIT © [Mark Daggett](https://github.com/heavysixer)
