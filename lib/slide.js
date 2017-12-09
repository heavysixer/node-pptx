// let Slide = function(args) {
// 	Object.assign(this, args);
// };

class Slide {
	constructor(args) {
		Object.assign(this, args);

		this.content = args.content;
		this.presentation = args.presentation; // the parent Presentation object
		this.name = args.name;
	}

	// More functions like addText, addImage, etc. will go here...
}

module.exports.Slide = Slide;
