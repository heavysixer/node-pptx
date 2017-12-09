const fs = require('fs');
const xml2js = require('xml2js');

class PresentationFactory {
	constructor(parentFactory, args) {
		this.parentFactory = parentFactory;
		this.content = parentFactory.content;
		this.args = args;
	}

	build() {
		xml2js.parseString(fs.readFileSync(`${__dirname}../../../fragments/ppt/presentation.xml`), (err, js) => {
			this.content['ppt/presentation.xml'] = js;
		});
	}

	addSlideRefIdToGlobalList(rId) {
		let maxId = 0;

		this.content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].forEach(function(node) {
			if (+node['$']['id'] > maxId) maxId = +node['$']['id'];
		});

		this.content['ppt/presentation.xml']['p:presentation']['p:sldIdLst'][0]['p:sldId'].push({
			$: {
				id: `${+maxId + 1}`,
				'r:id': rId,
			},
		});
	}
}

module.exports.PresentationFactory = PresentationFactory;
