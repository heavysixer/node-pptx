module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'p:sldMaster',
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
							name: 'p:bg',
							elements: [
								{ type: 'element', name: 'p:bgRef', attributes: { idx: '1001' }, elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'bg1' }, elements: [] }] },
							],
						},
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
								{
									type: 'element',
									name: 'p:sp',
									elements: [
										{
											type: 'element',
											name: 'p:nvSpPr',
											elements: [
												{ type: 'element', name: 'p:cNvPr', attributes: { id: '2', name: 'Title Placeholder 1' }, elements: [] },
												{ type: 'element', name: 'p:cNvSpPr', elements: [{ type: 'element', name: 'a:spLocks', attributes: { noGrp: '1' }, elements: [] }] },
												{ type: 'element', name: 'p:nvPr', elements: [{ type: 'element', name: 'p:ph', attributes: { type: 'title' }, elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:spPr',
											elements: [
												{
													type: 'element',
													name: 'a:xfrm',
													elements: [
														{ type: 'element', name: 'a:off', attributes: { x: '457200', y: '274638' }, elements: [] },
														{ type: 'element', name: 'a:ext', attributes: { cx: '8229600', cy: '1143000' }, elements: [] },
													],
												},
												{ type: 'element', name: 'a:prstGeom', attributes: { prst: 'rect' }, elements: [{ type: 'element', name: 'a:avLst', elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:txBody',
											elements: [
												{
													type: 'element',
													name: 'a:bodyPr',
													attributes: { vert: 'horz', lIns: '91440', tIns: '45720', rIns: '91440', bIns: '45720', rtlCol: '0', anchor: 'ctr' },
													elements: [{ type: 'element', name: 'a:normAutofit', elements: [] }],
												},
												{ type: 'element', name: 'a:lstStyle', elements: [] },
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{
															type: 'element',
															name: 'a:r',
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: 'Click to edit Master title style' }] },
															],
														},
														{ type: 'element', name: 'a:endParaRPr', attributes: { lang: 'en-US' }, elements: [] },
													],
												},
											],
										},
									],
								},
								{
									type: 'element',
									name: 'p:sp',
									elements: [
										{
											type: 'element',
											name: 'p:nvSpPr',
											elements: [
												{ type: 'element', name: 'p:cNvPr', attributes: { id: '3', name: 'Text Placeholder 2' }, elements: [] },
												{ type: 'element', name: 'p:cNvSpPr', elements: [{ type: 'element', name: 'a:spLocks', attributes: { noGrp: '1' }, elements: [] }] },
												{ type: 'element', name: 'p:nvPr', elements: [{ type: 'element', name: 'p:ph', attributes: { type: 'body', idx: '1' }, elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:spPr',
											elements: [
												{
													type: 'element',
													name: 'a:xfrm',
													elements: [
														{ type: 'element', name: 'a:off', attributes: { x: '457200', y: '1600200' }, elements: [] },
														{ type: 'element', name: 'a:ext', attributes: { cx: '8229600', cy: '4525963' }, elements: [] },
													],
												},
												{ type: 'element', name: 'a:prstGeom', attributes: { prst: 'rect' }, elements: [{ type: 'element', name: 'a:avLst', elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:txBody',
											elements: [
												{
													type: 'element',
													name: 'a:bodyPr',
													attributes: { vert: 'horz', lIns: '91440', tIns: '45720', rIns: '91440', bIns: '45720', rtlCol: '0' },
													elements: [{ type: 'element', name: 'a:normAutofit', elements: [] }],
												},
												{ type: 'element', name: 'a:lstStyle', elements: [] },
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{ type: 'element', name: 'a:pPr', attributes: { lvl: '0' }, elements: [] },
														{
															type: 'element',
															name: 'a:r',
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: 'Click to edit Master text styles' }] },
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{ type: 'element', name: 'a:pPr', attributes: { lvl: '1' }, elements: [] },
														{
															type: 'element',
															name: 'a:r',
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: 'Second level' }] },
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{ type: 'element', name: 'a:pPr', attributes: { lvl: '2' }, elements: [] },
														{
															type: 'element',
															name: 'a:r',
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: 'Third level' }] },
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{ type: 'element', name: 'a:pPr', attributes: { lvl: '3' }, elements: [] },
														{
															type: 'element',
															name: 'a:r',
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: 'Fourth level' }] },
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{ type: 'element', name: 'a:pPr', attributes: { lvl: '4' }, elements: [] },
														{
															type: 'element',
															name: 'a:r',
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: 'Fifth level' }] },
															],
														},
														{ type: 'element', name: 'a:endParaRPr', attributes: { lang: 'en-US' }, elements: [] },
													],
												},
											],
										},
									],
								},
								{
									type: 'element',
									name: 'p:sp',
									elements: [
										{
											type: 'element',
											name: 'p:nvSpPr',
											elements: [
												{ type: 'element', name: 'p:cNvPr', attributes: { id: '4', name: 'Date Placeholder 3' }, elements: [] },
												{ type: 'element', name: 'p:cNvSpPr', elements: [{ type: 'element', name: 'a:spLocks', attributes: { noGrp: '1' }, elements: [] }] },
												{ type: 'element', name: 'p:nvPr', elements: [{ type: 'element', name: 'p:ph', attributes: { type: 'dt', sz: 'half', idx: '2' }, elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:spPr',
											elements: [
												{
													type: 'element',
													name: 'a:xfrm',
													elements: [
														{ type: 'element', name: 'a:off', attributes: { x: '457200', y: '6356350' }, elements: [] },
														{ type: 'element', name: 'a:ext', attributes: { cx: '2133600', cy: '365125' }, elements: [] },
													],
												},
												{ type: 'element', name: 'a:prstGeom', attributes: { prst: 'rect' }, elements: [{ type: 'element', name: 'a:avLst', elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:txBody',
											elements: [
												{
													type: 'element',
													name: 'a:bodyPr',
													attributes: { vert: 'horz', lIns: '91440', tIns: '45720', rIns: '91440', bIns: '45720', rtlCol: '0', anchor: 'ctr' },
													elements: [],
												},
												{
													type: 'element',
													name: 'a:lstStyle',
													elements: [
														{
															type: 'element',
															name: 'a:lvl1pPr',
															attributes: { algn: 'l' },
															elements: [
																{
																	type: 'element',
																	name: 'a:defRPr',
																	attributes: { sz: '1200' },
																	elements: [
																		{
																			type: 'element',
																			name: 'a:solidFill',
																			elements: [
																				{
																					type: 'element',
																					name: 'a:schemeClr',
																					attributes: { val: 'tx1' },
																					elements: [{ type: 'element', name: 'a:tint', attributes: { val: '75000' }, elements: [] }],
																				},
																			],
																		},
																	],
																},
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{
															type: 'element',
															name: 'a:fld',
															attributes: { id: '{036EEA2E-C0C0-453E-845A-3EE4D9BD6F62}', type: 'datetimeFigureOut' },
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: '12/5/2017' }] },
															],
														},
														{ type: 'element', name: 'a:endParaRPr', attributes: { lang: 'en-US' }, elements: [] },
													],
												},
											],
										},
									],
								},
								{
									type: 'element',
									name: 'p:sp',
									elements: [
										{
											type: 'element',
											name: 'p:nvSpPr',
											elements: [
												{ type: 'element', name: 'p:cNvPr', attributes: { id: '5', name: 'Footer Placeholder 4' }, elements: [] },
												{ type: 'element', name: 'p:cNvSpPr', elements: [{ type: 'element', name: 'a:spLocks', attributes: { noGrp: '1' }, elements: [] }] },
												{ type: 'element', name: 'p:nvPr', elements: [{ type: 'element', name: 'p:ph', attributes: { type: 'ftr', sz: 'quarter', idx: '3' }, elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:spPr',
											elements: [
												{
													type: 'element',
													name: 'a:xfrm',
													elements: [
														{ type: 'element', name: 'a:off', attributes: { x: '3124200', y: '6356350' }, elements: [] },
														{ type: 'element', name: 'a:ext', attributes: { cx: '2895600', cy: '365125' }, elements: [] },
													],
												},
												{ type: 'element', name: 'a:prstGeom', attributes: { prst: 'rect' }, elements: [{ type: 'element', name: 'a:avLst', elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:txBody',
											elements: [
												{
													type: 'element',
													name: 'a:bodyPr',
													attributes: { vert: 'horz', lIns: '91440', tIns: '45720', rIns: '91440', bIns: '45720', rtlCol: '0', anchor: 'ctr' },
													elements: [],
												},
												{
													type: 'element',
													name: 'a:lstStyle',
													elements: [
														{
															type: 'element',
															name: 'a:lvl1pPr',
															attributes: { algn: 'ctr' },
															elements: [
																{
																	type: 'element',
																	name: 'a:defRPr',
																	attributes: { sz: '1200' },
																	elements: [
																		{
																			type: 'element',
																			name: 'a:solidFill',
																			elements: [
																				{
																					type: 'element',
																					name: 'a:schemeClr',
																					attributes: { val: 'tx1' },
																					elements: [{ type: 'element', name: 'a:tint', attributes: { val: '75000' }, elements: [] }],
																				},
																			],
																		},
																	],
																},
															],
														},
													],
												},
												{ type: 'element', name: 'a:p', elements: [{ type: 'element', name: 'a:endParaRPr', attributes: { lang: 'en-US' }, elements: [] }] },
											],
										},
									],
								},
								{
									type: 'element',
									name: 'p:sp',
									elements: [
										{
											type: 'element',
											name: 'p:nvSpPr',
											elements: [
												{ type: 'element', name: 'p:cNvPr', attributes: { id: '6', name: 'Slide Number Placeholder 5' }, elements: [] },
												{ type: 'element', name: 'p:cNvSpPr', elements: [{ type: 'element', name: 'a:spLocks', attributes: { noGrp: '1' }, elements: [] }] },
												{
													type: 'element',
													name: 'p:nvPr',
													elements: [{ type: 'element', name: 'p:ph', attributes: { type: 'sldNum', sz: 'quarter', idx: '4' }, elements: [] }],
												},
											],
										},
										{
											type: 'element',
											name: 'p:spPr',
											elements: [
												{
													type: 'element',
													name: 'a:xfrm',
													elements: [
														{ type: 'element', name: 'a:off', attributes: { x: '6553200', y: '6356350' }, elements: [] },
														{ type: 'element', name: 'a:ext', attributes: { cx: '2133600', cy: '365125' }, elements: [] },
													],
												},
												{ type: 'element', name: 'a:prstGeom', attributes: { prst: 'rect' }, elements: [{ type: 'element', name: 'a:avLst', elements: [] }] },
											],
										},
										{
											type: 'element',
											name: 'p:txBody',
											elements: [
												{
													type: 'element',
													name: 'a:bodyPr',
													attributes: { vert: 'horz', lIns: '91440', tIns: '45720', rIns: '91440', bIns: '45720', rtlCol: '0', anchor: 'ctr' },
													elements: [],
												},
												{
													type: 'element',
													name: 'a:lstStyle',
													elements: [
														{
															type: 'element',
															name: 'a:lvl1pPr',
															attributes: { algn: 'r' },
															elements: [
																{
																	type: 'element',
																	name: 'a:defRPr',
																	attributes: { sz: '1200' },
																	elements: [
																		{
																			type: 'element',
																			name: 'a:solidFill',
																			elements: [
																				{
																					type: 'element',
																					name: 'a:schemeClr',
																					attributes: { val: 'tx1' },
																					elements: [{ type: 'element', name: 'a:tint', attributes: { val: '75000' }, elements: [] }],
																				},
																			],
																		},
																	],
																},
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:p',
													elements: [
														{
															type: 'element',
															name: 'a:fld',
															attributes: { id: '{EEA4CB10-01EC-4F0B-B0D3-B7B5571F5409}', type: 'slidenum' },
															elements: [
																{ type: 'element', name: 'a:rPr', attributes: { lang: 'en-US', smtClean: '0' }, elements: [] },
																{ type: 'element', name: 'a:t', elements: [{ type: 'text', text: '‹#›' }] },
															],
														},
														{ type: 'element', name: 'a:endParaRPr', attributes: { lang: 'en-US' }, elements: [] },
													],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{
					type: 'element',
					name: 'p:clrMap',
					attributes: {
						bg1: 'lt1',
						tx1: 'dk1',
						bg2: 'lt2',
						tx2: 'dk2',
						accent1: 'accent1',
						accent2: 'accent2',
						accent3: 'accent3',
						accent4: 'accent4',
						accent5: 'accent5',
						accent6: 'accent6',
						hlink: 'hlink',
						folHlink: 'folHlink',
					},
					elements: [],
				},
				{
					type: 'element',
					name: 'p:sldLayoutIdLst',
					elements: [
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483649', 'r:id': 'rId1' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483650', 'r:id': 'rId2' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483651', 'r:id': 'rId3' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483652', 'r:id': 'rId4' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483653', 'r:id': 'rId5' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483654', 'r:id': 'rId6' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483655', 'r:id': 'rId7' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483656', 'r:id': 'rId8' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483657', 'r:id': 'rId9' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483658', 'r:id': 'rId10' }, elements: [] },
						{ type: 'element', name: 'p:sldLayoutId', attributes: { id: '2147483659', 'r:id': 'rId11' }, elements: [] },
					],
				},
				{
					type: 'element',
					name: 'p:txStyles',
					elements: [
						{
							type: 'element',
							name: 'p:titleStyle',
							elements: [
								{
									type: 'element',
									name: 'a:lvl1pPr',
									attributes: { algn: 'ctr', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '0' }, elements: [] }] },
										{ type: 'element', name: 'a:buNone', elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '4400', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
												{ type: 'element', name: 'a:latin', attributes: { typeface: '+mj-lt' }, elements: [] },
												{ type: 'element', name: 'a:ea', attributes: { typeface: '+mj-ea' }, elements: [] },
												{ type: 'element', name: 'a:cs', attributes: { typeface: '+mj-cs' }, elements: [] },
											],
										},
									],
								},
							],
						},
						{
							type: 'element',
							name: 'p:bodyStyle',
							elements: [
								{
									type: 'element',
									name: 'a:lvl1pPr',
									attributes: { marL: '342900', indent: '-342900', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '•' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '3200', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '742950', indent: '-285750', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '–' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2800', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '1143000', indent: '-228600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '•' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2400', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '1600200', indent: '-228600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '–' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2000', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '2057400', indent: '-228600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '»' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2000', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '2514600', indent: '-228600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '•' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2000', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '2971800', indent: '-228600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '•' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2000', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '3429000', indent: '-228600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '•' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2000', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '3886200', indent: '-228600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{ type: 'element', name: 'a:spcBef', elements: [{ type: 'element', name: 'a:spcPct', attributes: { val: '20000' }, elements: [] }] },
										{ type: 'element', name: 'a:buFont', attributes: { typeface: 'Arial', pitchFamily: '34', charset: '0' }, elements: [] },
										{ type: 'element', name: 'a:buChar', attributes: { char: '•' }, elements: [] },
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '2000', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
												{ type: 'element', name: 'a:latin', attributes: { typeface: '+mn-lt' }, elements: [] },
												{ type: 'element', name: 'a:ea', attributes: { typeface: '+mn-ea' }, elements: [] },
												{ type: 'element', name: 'a:cs', attributes: { typeface: '+mn-cs' }, elements: [] },
											],
										},
									],
								},
							],
						},
						{
							type: 'element',
							name: 'p:otherStyle',
							elements: [
								{ type: 'element', name: 'a:defPPr', elements: [{ type: 'element', name: 'a:defRPr', attributes: { lang: 'en-US' }, elements: [] }] },
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
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '1371600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '1800', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '1828800', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '1800', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '2286000', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '1800', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '2743200', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '1800', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '3200400', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '1800', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
									attributes: { marL: '3657600', algn: 'l', defTabSz: '914400', rtl: '0', eaLnBrk: '1', latinLnBrk: '0', hangingPunct: '1' },
									elements: [
										{
											type: 'element',
											name: 'a:defRPr',
											attributes: { sz: '1800', kern: '1200' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'tx1' }, elements: [] }] },
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
		},
	],
};
