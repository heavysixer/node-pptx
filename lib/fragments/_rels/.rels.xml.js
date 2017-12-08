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
					attributes: { Id: 'rId3', Type: 'http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties', Target: 'docProps/core.xml' },
					elements: [],
				},
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId1', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument', Target: 'ppt/presentation.xml' },
					elements: [],
				},
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId4', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties', Target: 'docProps/app.xml' },
					elements: [],
				},
			],
		},
	],
};
