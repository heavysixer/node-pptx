module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'p:sld',
			attributes: {
				'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
				'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
				'xmlns:p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
			},
			elements: [
				{
					type: 'element',
					name: 'p:cSld',
					elements: [
						{
							type: 'element',
							name: 'p:spTree',
							elements: [
								{
									type: 'element',
									name: 'p:nvGrpSpPr',
									elements: [
										{ type: 'element', name: 'p:cNvPr', attributes: { id: '1', name: '' }, elements: [] },
										{ type: 'element', name: 'p:cNvGrpSpPr', elements: [] },
										{ type: 'element', name: 'p:nvPr', elements: [] },
									],
								},
								{
									type: 'element',
									name: 'p:grpSpPr',
									elements: [
										{
											type: 'element',
											name: 'a:xfrm',
											elements: [
												{ type: 'element', name: 'a:off', attributes: { x: '0', y: '0' }, elements: [] },
												{ type: 'element', name: 'a:ext', attributes: { cx: '0', cy: '0' }, elements: [] },
												{ type: 'element', name: 'a:chOff', attributes: { x: '0', y: '0' }, elements: [] },
												{ type: 'element', name: 'a:chExt', attributes: { cx: '0', cy: '0' }, elements: [] },
											],
										},
									],
								},
							],
						},
					],
				},
				{ type: 'element', name: 'p:clrMapOvr', elements: [{ type: 'element', name: 'a:masterClrMapping', elements: [] }] },
			],
		},
	],
};
