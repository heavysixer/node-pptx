module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'Relationships',
			attributes: { xmlns: 'http://schemas.openxmlformats.org/package/2006/relationships' },
			elements: [
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId1', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster', Target: '../slideMasters/slideMaster1.xml' },
					elements: [],
				},
			],
		},
	],
};
