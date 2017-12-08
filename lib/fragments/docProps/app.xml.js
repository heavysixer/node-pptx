module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'Properties',
			attributes: { xmlns: 'http://schemas.openxmlformats.org/officeDocument/2006/extended-properties', 'xmlns:vt': 'http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes' },
			elements: [
				{ type: 'element', name: 'TotalTime', elements: [{ type: 'text', text: '0' }] },
				{ type: 'element', name: 'Words', elements: [{ type: 'text', text: '0' }] },
				{ type: 'element', name: 'Application', elements: [{ type: 'text', text: 'Microsoft Office PowerPoint' }] },
				{ type: 'element', name: 'PresentationFormat', elements: [{ type: 'text', text: 'On-screen Show (4:3)' }] },
				{ type: 'element', name: 'Paragraphs', elements: [{ type: 'text', text: '0' }] },
				{ type: 'element', name: 'Slides', elements: [{ type: 'text', text: '2' }] },
				{ type: 'element', name: 'Notes', elements: [{ type: 'text', text: '0' }] },
				{ type: 'element', name: 'HiddenSlides', elements: [{ type: 'text', text: '0' }] },
				{ type: 'element', name: 'MMClips', elements: [{ type: 'text', text: '0' }] },
				{ type: 'element', name: 'ScaleCrop', elements: [{ type: 'text', text: 'false' }] },
				{
					type: 'element',
					name: 'HeadingPairs',
					elements: [
						{
							type: 'element',
							name: 'vt:vector',
							attributes: { size: '4', baseType: 'variant' },
							elements: [
								{ type: 'element', name: 'vt:variant', elements: [{ type: 'element', name: 'vt:lpstr', elements: [{ type: 'text', text: 'Theme' }] }] },
								{ type: 'element', name: 'vt:variant', elements: [{ type: 'element', name: 'vt:i4', elements: [{ type: 'text', text: '1' }] }] },
								{ type: 'element', name: 'vt:variant', elements: [{ type: 'element', name: 'vt:lpstr', elements: [{ type: 'text', text: 'Slide Titles' }] }] },
								{ type: 'element', name: 'vt:variant', elements: [{ type: 'element', name: 'vt:i4', elements: [{ type: 'text', text: '1' }] }] },
							],
						},
					],
				},
				{
					type: 'element',
					name: 'TitlesOfParts',
					elements: [
						{
							type: 'element',
							name: 'vt:vector',
							attributes: { size: '2', baseType: 'lpstr' },
							elements: [
								{ type: 'element', name: 'vt:lpstr', elements: [{ type: 'text', text: 'Office Theme' }] },
								{ type: 'element', name: 'vt:lpstr', elements: [{ type: 'text', text: 'Slide 1' }] },
							],
						},
					],
				},
				{ type: 'element', name: 'LinksUpToDate', elements: [{ type: 'text', text: 'false' }] },
				{ type: 'element', name: 'SharedDoc', elements: [{ type: 'text', text: 'false' }] },
				{ type: 'element', name: 'HyperlinksChanged', elements: [{ type: 'text', text: 'false' }] },
				{ type: 'element', name: 'AppVersion', elements: [{ type: 'text', text: '12.0000' }] },
			],
		},
	],
};
