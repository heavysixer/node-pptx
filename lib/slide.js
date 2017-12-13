class Slide {
	constructor(args) {
		Object.assign(this, args);

		this.content = args.content;
		this.powerPointFactory = args.powerPointFactory;
		this.name = args.name;
	}

	addImage(path, options) {
		this.powerPointFactory.addImage(this, path, options);
	}

	// More functions like addText, addMedia, etc. will go here...
}

module.exports.Slide = Slide;
