module.exports = {
	Presentation: require('./presentation'),
	Slide: require('./slide'),
	Shape: require('./shape'),
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
