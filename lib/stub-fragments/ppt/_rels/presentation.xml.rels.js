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
					attributes: { Id: 'rId3', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/presProps', Target: 'presProps.xml' },
					elements: [],
				},
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId2', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide', Target: 'slides/slide1.xml' },
					elements: [],
				},
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId1', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster', Target: 'slideMasters/slideMaster1.xml' },
					elements: [],
				},
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId6', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/tableStyles', Target: 'tableStyles.xml' },
					elements: [],
				},
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId5', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme', Target: 'theme/theme1.xml' },
					elements: [],
				},
				{
					type: 'element',
					name: 'Relationship',
					attributes: { Id: 'rId4', Type: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships/viewProps', Target: 'viewProps.xml' },
					elements: [],
				},
			],
		},
	],
};
