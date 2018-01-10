# node-pptx [![Build Status](https://travis-ci.org/heavysixer/node-pptx.svg?branch=master)](https://travis-ci.org/heavysixer/node-pptx)

## Under Development (Do not use)

Generate PPTX files on the server-side with JavaScript.

## Features

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Getting Started](#getting-started)
- [Usage](#usage)
  - [Presentation Object](#presentation-object)
    - [Creating a Presentation From Scratch](#creating-a-presentation-from-scratch)
    - [Modifying an existing Presentation](#modifying-an-existing-presentation)
  - [Slides](#slides)
    - [Adding, Removing, and Reordering Slides](#adding-removing-and-reordering-slides)
    - [Formatting Slides](#formatting-slides)
      - [Applying Master Slides](#applying-master-slides)
      - [Adding Slide Numbers](#adding-slide-numbers)
    - [Adding Content to Slides](#adding-content-to-slides)
      - [Charts](#charts)
        - [Bar Charts](#bar-charts)
      - [Images](#images)
      - [Text Boxes](#text-boxes)
      - [Shapes](#shapes)
- [Contributing](#contributing)
- [Special Thanks](#special-thanks)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Getting Started

```bash
$ npm install node-pptx
```

Let's create a very simple presentation with one slide.

```javascript
const pptx = require('node-pptx');

new pptx.Presentation()
	.compose(pres => {
		pres.title('My Presentation').addSlide(slide => {
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

## Usage

### Presentation Object

#### Creating a Presentation From Scratch

#### Modifying an existing Presentation
```javascript
let fulltemplateFilePath = `${__dirname}/fixtures/basic.pptx`;
let presentation = new PPTX.Presentation({ templateFilePath: fulltemplateFilePath });
await presentation.loadExistingPPTX();
presentation.addSlide();
await presentation.save(`${tmpDir}/presentation-existing-add-slide.pptx`);
```

#### Saving A Presentation
```javascript
await presentation.save(`${tmpDir}/presentation-existing-add-slide.pptx`);
```

### Slides

#### Adding, Removing, and Reordering Slides

#### Formatting Slides

Applying Background Colors

```javascript
slide.setBackgroundColor('C5E0B4');
```

##### Applying Master Slides
TBD
##### Adding Slide Numbers
TBD

#### Adding Content to Slides
This library supports charts, images, text boxes, and shapes. The following section
describes the ways in which you can add these elements. to a slide.

##### Charts
Charts have very minimal support right now, think of it mostly as a proof of concept at this point.

###### Bar Charts

```javascript
let barChartData = [
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

slide1.addChart('bar', barChartData, { x: 100, y: 100, cx: 400, cy: 300 });
```

##### Images
```javascript
presentation.addSlide().addImage(`${__dirname}/images/pizza.jpg`);
```
##### Text Boxes
```javascript
defaultSlide.addText('This is a hyperlink!', { x: 0, y: 25, cx: 400, url: 'http://www.google.com' });
defaultSlide.addText('This go to slide 3', { x: 0, y: 50, url: '#3' });
```
##### Shapes
For a full list of the supported shapes check the
[shape-types](https://github.com/heavysixer/node-pptx/blob/master/lib/shape-types.js) file.

```javascript
slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 50, y: 50, cx: 50, cy: 50 });
slide1.addShape(PPTX.ShapeTypes.TRIANGLE, { x: 150, y: 50, cx: 50, cy: 50, color: '00FF00' });
slide1.addShape(PPTX.ShapeTypes.OVAL, { x: 100, y: 200, cx: 200, cy: 100, text: 'hello world!' });
slide1.addShape(PPTX.ShapeTypes.UP_ARROW, { x: 500, y: 140, cx: 100, cy: 50, color: '0000FF', url: 'www.google.com' });
```

## Contributing

Send issues and pull requests with your ideas.

[Good First Issue](https://github.com/heavysixer/node-pptx/labels/Good%20First%20Issue) is a great starting point for PRs.

## Special Thanks

This project builds off the hard work of several other PPTX libraries namely:

* <https://github.com/gitbrent/PptxGenJS>
* <https://github.com/Ziv-Barber/officegen>
* <https://github.com/won21kr/js-pptx>

## License

MIT © [Mark Daggett](https://github.com/heavysixer) & Greg Dolley
