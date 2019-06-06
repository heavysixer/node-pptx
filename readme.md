# node-pptx [![Build Status](https://travis-ci.org/heavysixer/node-pptx.svg?branch=master)](https://travis-ci.org/heavysixer/node-pptx)

A well-tested, and friendly library to create, edit, and update PPTX files on the server-side with JavaScript.

## Features

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Getting Started](#getting-started)
- [General Conventions](#general-conventions)
- [Presentations](#presentations)
  - [Creating a Presentation From Scratch](#creating-a-presentation-from-scratch)
  - [Modifying an existing Presentation](#modifying-an-existing-presentation)
  - [Saving A Presentation](#saving-a-presentation)
  - [Setting Properties](#setting-properties)
  - [Setting Layouts](#setting-layouts)
  - [Setting Text Direction](#setting-text-direction)
- [Slides](#slides)
  - [Adding Slides](#adding-slides)
  - [Removing Slides](#removing-slides)
  - [Reordering Slides](#reordering-slides)
  - [Formatting Options](#formatting-options)
  - [Applying Master Slides](#applying-master-slides)
  - [Adding Slide Numbers](#adding-slide-numbers)
- [Adding Content to Slides](#adding-content-to-slides)
  - [Charts](#charts)
    - [Bar Charts](#bar-charts)
  - [Images](#images)
  - [Media Objects](#media-objects)
  - [Shapes](#shapes)
  - [Text Boxes](#text-boxes)
- [Understanding Async and Await](#understanding-async-and-await)
- [Testing](#testing)
- [Contributing](#contributing)
- [Special Thanks](#special-thanks)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

_NOTE_: Someone else registered the node-pptx npm package out from under us. Use this package instead:

```bash
$ npm i nodejs-pptx
```

Let's create a very simple presentation with one slide.

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(pres => {
  pres.addSlide(slide => {
    slide.addText(text => {
      text.value('Hello World');
    });
  });
});

await pptx.save(`./hello-world.pptx`);
```

## General Conventions

`node-pptx` has a friendly declarative DSL to quickly design a pptx file. This makes your JavaScript code very readable because, it allows you to visually segment and compartmentalize your code to the presentation element you are trying to edit. Here is a simple example of adding a text box to a slide:

```javascript
await pres.addSlide(slide => {
  // declarative way of adding an object
  slide.addText(text => {
    text
      .value('Hello World!')
      .x(100)
      .y(50)
      .fontFace('Alien Encounters')
      .fontSize(20)
      .textColor('CC0000')
      .textWrap('none')
      .textAlign('left')
      .textVerticalAlign('center')
      .line({ color: '0000FF', dashType: 'dash', width: 1.0 })
      .margin(0);
  });
});
```

You can also achieve the same result using the more terse object-only format by supplying a configuration object instead of a function.

_Note_: Not all presentation elements support the object-only format.

```javascript
slide.addText({ value: 'Link to google.com', x: 100, y: 50, href: 'http://www.google.com' });
```

## Presentations

The following sections defines the various ways to read, compose, and write pptx files. `node-pptx` allows you to either create a brand new file, or modify an existing pptx file.

### Creating a Presentation From Scratch

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(pres => {
  pres.addSlide(slide => {
    slide.addText(text => {
      text.value('Hello World');
    });
  });
});

await pptx.save(`./hello-world.pptx`);
```

### Modifying an existing Presentation

If you would like to use or modify an existing pptx file, simply load it first.

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.load(`./existing.pptx`);
await pptx.compose(async pres => {
  await pres.getSlide('slide1').addImage(image => {
    image
      .file(`./images/pizza.jpg`)
      .x(500)
      .y(100)
      .cx(166)
      .cy(100);
  });
});
await pptx.save(`./existing.pptx`);
```

### Saving A Presentation

Saving a presentation is easy to do but because it's asynchronous by design we recommend awaiting the result before moving on.

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.save(`./blank.pptx`);
```

### Setting Properties

You can set the presentation's properties using the DSL only.

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(async pres => {
  pres
    .title('My Presentation')
    .author('Mark Daggett')
    .company('Humansized Inc.')
    .revision('20')
    .subject('My Presentation');
});
```

### Setting Layouts

To control the layout of a presentation you choose one of the available defaults.
To see a list of provided layouts view the [layouts](https://github.com/heavysixer/node-pptx/blob/master/lib/layout-types.js) file.

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

pptx.compose(pres => {
  pres.layout('LAYOUT_4x3');
});
```

### Setting Text Direction

TODO

## Slides

Slides are are by far the most complex feature of this library because they are the backbone for all presentations.

### Adding Slides

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(pres => {
  pres.addSlide(slide => {
    slide.addText(text => {
      text.value('Hello World');
    });
  });
});
```

### Removing Slides

Slides are removed by calling removeSlide() on the Presentation object and passing in the object of the slide you want removed. In order to get a slide object, call Presentation.getSlide() passing in the name of the slide you wish to retrieve. Slide names always follow the format of "slideX" where "X" is the slide number. For example, slide #3 will be named "slide3" and slide #10 will be named "slide10."

Presentation.getSlide() also supports integer slide numbers (slide numbers are base-1). For example, to grab the very first slide of a PPTX, you would call "getSlide(1)".

When calling Presentation.addSlide() _without_ a composition function as the first argument, a slide object will be returned in the promise. This slide object can also be used as a reference for slide removal.

Examples of both:

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.load(`./existing.pptx`); // load a pre-existing PPTX
await pptx.compose(async pres => {
  pres.removeSlide(pres.getSlide('slide1')); // remove the first slide from the PPTX
  // OR ---> pres.removeSlide(pres.getSlide(1)); <--- example of getting a slide by integer

  let newSlide = await pres.addSlide(); // add a new slide

  newSlide.addText(text => {
    // add some text
    text.value('Hello World');
  });

  pres.removeSlide(newSlide); // remove the slide we just added using the object reference
});
```

### Reordering Slides

You can move a slide's position by calling moveTo() on a Slide object. See the section above ("Removing Slides") for how to grab a Slide object. The moveTo() function takes one parameter: the destination slide number in which you want the slide to move. Slide numbers are always base-1. For example, to move a slide from its original position to the second slide in the presentation, you would call "moveTo(2)".

Example #1 (to move slide #5 to slide #2 on an existing PPTX):

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.load(`./existing.pptx`); // load a pre-existing PPTX
await pptx.compose(async pres => {
  let slide = pres.getSlide(5);
  slide.moveTo(2);
});
```

Example #2 (to move slide #2 to slide #6 on a PPTX created from scratch):

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(async pres => {
  let slide1 = await pres.addSlide();
  let slide2 = await pres.addSlide();
  let slide3 = await pres.addSlide();
  let slide4 = await pres.addSlide();
  let slide5 = await pres.addSlide();
  let slide6 = await pres.addSlide();

  slide1.addText({ value: 'Slide 1', x: 200, y: 100 });
  slide2.addText({ value: 'Slide 2', x: 200, y: 100 });
  slide3.addText({ value: 'Slide 3', x: 200, y: 100 });
  slide4.addText({ value: 'Slide 4', x: 200, y: 100 });
  slide5.addText({ value: 'Slide 5', x: 200, y: 100 });
  slide6.addText({ value: 'Slide 6', x: 200, y: 100 });

  slide2.moveTo(6);
});
```

### Formatting Options

Applying background and text colors:

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(async pres => {
  await pres.addSlide(slide => {
    slide.textColor('00AAFF');
    slide.backgroundColor('FFD777');
    slide.addText(text => {
      text.value('Hello World!');
    });
  });
});
await pptx.save('./colors.pptx');
```

### Applying Master Slides

TODO

### Adding Slide Numbers

TODO

## Adding Content to Slides

This library supports charts, images, text boxes, and shapes. The following section describes the ways in which you can add these elements. to a slide.

Objects are layered on top of one another in the order in which they are added. Therefore you'll want to add background items first and gradually work your way towards the top of the composition.

### Charts

Charts have very minimal support right now, think of it mostly as a proof of concept at this point.

#### Bar Charts

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

let barChartData1 = [
  {
    name: 'Series 1',
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    values: [4.3, 2.5, 3.5, 4.5],
  },
  {
    name: 'Series 2',
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    values: [2.4, 4.4, 1.8, 2.8],
  },
  {
    name: 'Series 3',
    labels: ['Category 1', 'Category 2', 'Category 3', 'Category 4'],
    values: [2.0, 2.0, 3.0, 5.0],
  },
];

await pptx
  .compose(async pres => {
    await pres.layout('LAYOUT_4x3').addSlide(async slide => {
      await slide.addChart(chart => {
        chart
          .type('bar')
          .data(barChartData1)
          .x(100)
          .y(100)
          .cx(400)
          .cy(300);
      });
    });
  })
  .save('./chart.pptx');
```

### Images

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(async pres => {
  await pres.addSlide(async slide => {
    // Images can be added locally
    slide.addImage(image => {
      image
        .file('./images/pizza.jpg')
        .x(100)
        .cx(200);
    });

    // Images can be downloaded from the internet.
    await slide.addImage({
      src: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_120x44dp.png',
      href: 'https://www.google.com',
      x: 10,
      y: 400,
      cx: 50,
    });

    // Images can be added inline as a base64 encoded string.
    slide.addImage(image => {
      image
        .data('iVBORw0KGgoA[...]Jggg')
        .x(350)
        .y(200);
    });
  });
});
```

### Media Objects

The pptx spec calls for support of media objects (video & audio) however presently `node-pptx` doesn't support these objects.

### Shapes

For a full list of the supported shapes check the
[shape-types](https://github.com/heavysixer/node-pptx/blob/master/lib/shape-types.js) file.

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(async pres => {
  await pres.addSlide(slide => {
    //Creating a shape using the DSL.
    slide.addShape(shape => {
      shape
        .type(PPTX.ShapeTypes.TRIANGLE)
        .x(50)
        .y(50)
        .cx(50)
        .cy(50);
    });

    //Creating a shape using the object-only syntax.
    slide.addShape({ type: PPTX.ShapeTypes.TRIANGLE, x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });

    // Adding a hyperlink to the shape.
    slide.addShape({ type: PPTX.ShapeTypes.UP_ARROW, x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', href: 'www.google.com' });
  });
});

await pptx.save(`./shapes-test.pptx`);
```

### Text Boxes

As the name suggests text can be added to the slide using `addText`. The text box element also supports the creation of external links (which open a web browser) and internal linking (which link to another slide in the same presentation).

```javascript
const PPTX = require('node-pptx');
let pptx = new PPTX.Composer();

await pptx.compose(async pres => {
  await pres.addSlide(slide => {
    // declarative way of adding an object
    slide.addText(text => {
      text
        .value('Hello World!')
        .x(100)
        .y(50)
        .fontFace('Alien Encounters')
        .fontSize(20)
        .textColor('CC0000')
        .textWrap('none')
        .textAlign('left')
        .textVerticalAlign('center')
        .line({ color: '0000FF', dashType: 'dash', width: 1.0 })
        .margin(0);
    });

    // plain "config" method of adding an object
    slide.addText({ value: 'Link to google.com', x: 200, y: 300, href: 'http://www.google.com' });
  });
});

await pptx.save(`./text-box-new-simple.pptx`);
```

To create an external link specify the full URI path as the value for the `url` key.

```javascript
defaultSlide.addText({ value: 'This is a hyperlink!', x: 0, y: 25, cx: 400, href: 'http://www.google.com' });
```

To link to another slide specify the slide number preceded with a hash like so:

```javascript
defaultSlide.addText({ value: 'This go to slide 3', x: 0, y: 50, href: '#3' });
```

## Understanding Async and Await

`node-pptx` is synchronous by design, which means commands execute one step at a time and do not move on until the previous step completes. However, there are certain cases where synchronous flow is undesirable. For example when adding an image from the internet which must first be downloaded. In these cases you can use Javascript's native `async` and `await` functions to turn the previous synchronous flow into one that allows for asynchronous operations. Consider these two examples:

```javascript
// Synchronous example:
pptx.compose(pres => {
  pres.addSlide(slide => {
    slide.addImage(image => {
      image
        .file(`${__dirname}/images/pizza.jpg`)
        .x(100)
        .cx(200);
    });
  });
});

// Asynchronous example

// We must now specify that the `pres` object is async.
await pptx.compose(async pres => {
  // we must specify that the slide object is also async.
  await pres.addSlide(async slide => {
    // because our image is located on a server we must await it's download.
    await slide.addImage({
      src: 'https://www.mcdonalds.com/content/dam/usa/logo/m_logo.png',
      href: 'https://www.mcdonalds.com',
      x: 10,
      y: 400,
      cx: 50,
    });
  });
});
```

## Testing

To run the unit tests for `node-pptx` simply type this into your command line:

`yarn test`

You can also see the code coverage metrics as well which will be written to the `coverage/` directory.

## Contributing

Like many other open source projects `node-pptx` was created to service the kinds of use cases we needed to support for our own work. This means that the project itself is far from feature-complete. Send issues and pull requests with your ideas!

[Good First Issue](https://github.com/heavysixer/node-pptx/labels/Good%20First%20Issue) is a great starting point for PRs.

## Special Thanks

This project builds off the hard work of several other PPTX libraries namely:

- <https://github.com/gitbrent/PptxGenJS>
- <https://github.com/Ziv-Barber/officegen>
- <https://github.com/won21kr/js-pptx>

## License

MIT © [Mark Daggett](https://github.com/heavysixer) & Greg Dolley
