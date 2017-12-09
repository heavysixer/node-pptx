// TODO: eval later because this module may no longer be needed; goes from presentation.test.js, to here, to presentation.js
module.exports = {
	Presentation: require('./presentation'),
	Slide: require('./slide'),
	emu: {
		inch: function(val) {
			return Math.floor(val * 914400);
		},
		point: function(val) {
			return Math.floor(val * 914400 / 72);
		},
		px: function(val) {
			return Math.floor(val * 914400 / 72);
		},
		cm: function(val) {
			return Math.floor(val * 360000);
		},
	},
};
