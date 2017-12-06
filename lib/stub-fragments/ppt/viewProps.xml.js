module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'p:viewPr',
			attributes: {
				'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
				'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
				'xmlns:p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
			},
			elements: [
				{
					type: 'element',
					name: 'p:normalViewPr',
					elements: [
						{ type: 'element', name: 'p:restoredLeft', attributes: { sz: '15620' }, elements: [] },
						{ type: 'element', name: 'p:restoredTop', attributes: { sz: '94660' }, elements: [] },
					],
				},
				{
					type: 'element',
					name: 'p:slideViewPr',
					elements: [
						{
							type: 'element',
							name: 'p:cSldViewPr',
							elements: [
								{
									type: 'element',
									name: 'p:cViewPr',
									attributes: { varScale: '1' },
									elements: [
										{
											type: 'element',
											name: 'p:scale',
											elements: [
												{ type: 'element', name: 'a:sx', attributes: { n: '110', d: '100' }, elements: [] },
												{ type: 'element', name: 'a:sy', attributes: { n: '110', d: '100' }, elements: [] },
											],
										},
										{ type: 'element', name: 'p:origin', attributes: { x: '-1740', y: '-90' }, elements: [] },
									],
								},
								{
									type: 'element',
									name: 'p:guideLst',
									elements: [
										{ type: 'element', name: 'p:guide', attributes: { orient: 'horz', pos: '2160' }, elements: [] },
										{ type: 'element', name: 'p:guide', attributes: { pos: '2880' }, elements: [] },
									],
								},
							],
						},
					],
				},
				{
					type: 'element',
					name: 'p:notesTextViewPr',
					elements: [
						{
							type: 'element',
							name: 'p:cViewPr',
							elements: [
								{
									type: 'element',
									name: 'p:scale',
									elements: [
										{ type: 'element', name: 'a:sx', attributes: { n: '100', d: '100' }, elements: [] },
										{ type: 'element', name: 'a:sy', attributes: { n: '100', d: '100' }, elements: [] },
									],
								},
								{ type: 'element', name: 'p:origin', attributes: { x: '0', y: '0' }, elements: [] },
							],
						},
					],
				},
				{ type: 'element', name: 'p:gridSpacing', attributes: { cx: '78028800', cy: '78028800' }, elements: [] },
			],
		},
	],
};
