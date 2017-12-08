module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'p:presentation',
			attributes: {
				'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
				'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
				'xmlns:p': 'http://schemas.openxmlformats.org/presentationml/2006/main',
				saveSubsetFonts: '1',
			},
			elements: [
				{
					type: 'element',
					name: 'p:sldMasterIdLst',
					elements: [{ type: 'element', name: 'p:sldMasterId', attributes: { id: '2147483648', 'r:id': 'rId1' }, elements: [] }],
				},
				{
					type: 'element',
					name: 'p:sldIdLst',
					elements: [
						{ type: 'element', name: 'p:sldId', attributes: { id: '256', 'r:id': 'rId2' }, elements: [] },
						{ type: 'element', name: 'p:sldId', attributes: { id: '257', 'r:id': 'rId7' }, elements: [] }
					],
				},
				{ type: 'element', name: 'p:sldSz', attributes: { cx: '9144000', cy: '6858000', type: 'screen4x3' }, elements: [] },
				{ type: 'element', name: 'p:notesSz', attributes: { cx: '6858000', cy: '9144000' }, elements: [] },
				{
					type: 'element',
					name: 'p:defaultTextStyle',
					elements: [
						{
							type: 'element',
							name: 'a:defPPr',
							elements: [{ type: 'element', name: 'a:defRPr', attributes: { lang: 'en-US' }, elements: [] }],
						},
						{
							type: 'element',
							name: 'a:lvl1pPr',
							attributes: { marL: '0', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl2pPr',
							attributes: { marL: '457200', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl3pPr',
							attributes: { marL: '914400', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl4pPr',
							attributes: {
								marL: '1371600',
								algn: 'l',
								defTabSz: '914400',
								rtl: '0',
								eaLnBrk: '1',
								latinLnBrk: '0',
								hangingPunct: '1',
							},
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl5pPr',
							attributes: {
								marL: '1828800',
								algn: 'l',
								defTabSz: '914400',
								rtl: '0',
								eaLnBrk: '1',
								latinLnBrk: '0',
								hangingPunct: '1',
							},
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl6pPr',
							attributes: {
								marL: '2286000',
								algn: 'l',
								defTabSz: '914400',
								rtl: '0',
								eaLnBrk: '1',
								latinLnBrk: '0',
								hangingPunct: '1',
							},
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl7pPr',
							attributes: {
								marL: '2743200',
								algn: 'l',
								defTabSz: '914400',
								rtl: '0',
								eaLnBrk: '1',
								latinLnBrk: '0',
								hangingPunct: '1',
							},
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl8pPr',
							attributes: {
								marL: '3200400',
								algn: 'l',
								defTabSz: '914400',
								rtl: '0',
								eaLnBrk: '1',
								latinLnBrk: '0',
								hangingPunct: '1',
							},
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:lvl9pPr',
							attributes: {
								marL: '3657600',
								algn: 'l',
								defTabSz: '914400',
								rtl: '0',
								eaLnBrk: '1',
								latinLnBrk: '0',
								hangingPunct: '1',
							},
							elements: [
								{
									type: 'element',
									name: 'a:defRPr',
									attributes: { sz: '1800', kern: '1200' },
									elements: [
										{
											type: 'element',
											name: 'a:solidFill',
											elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }],
										},
										{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
									],
								},
							],
						},
					],
				},
			],
		},
	],
};
