module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'a:theme',
			attributes: { 'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main', name: 'Office Theme' },
			elements: [
				{
					type: 'element',
					name: 'a:themeElements',
					elements: [
						{
							type: 'element',
							name: 'a:clrScheme',
							attributes: { name: 'Office' },
							elements: [
								{ type: 'element', name: 'a:dk1', elements: [{ type: 'element', name: 'a:sysClr', attributes: { val: 'windowText', lastClr: '000000' }, elements: [] }] },
								{ type: 'element', name: 'a:lt1', elements: [{ type: 'element', name: 'a:sysClr', attributes: { val: 'window', lastClr: 'FFFFFF' }, elements: [] }] },
								{ type: 'element', name: 'a:dk2', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: '1F497D' }, elements: [] }] },
								{ type: 'element', name: 'a:lt2', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: 'EEECE1' }, elements: [] }] },
								{ type: 'element', name: 'a:accent1', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: '4F81BD' }, elements: [] }] },
								{ type: 'element', name: 'a:accent2', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: 'C0504D' }, elements: [] }] },
								{ type: 'element', name: 'a:accent3', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: '9BBB59' }, elements: [] }] },
								{ type: 'element', name: 'a:accent4', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: '8064A2' }, elements: [] }] },
								{ type: 'element', name: 'a:accent5', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: '4BACC6' }, elements: [] }] },
								{ type: 'element', name: 'a:accent6', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: 'F79646' }, elements: [] }] },
								{ type: 'element', name: 'a:hlink', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: '0000FF' }, elements: [] }] },
								{ type: 'element', name: 'a:folHlink', elements: [{ type: 'element', name: 'a:srgbClr', attributes: { val: '800080' }, elements: [] }] },
							],
						},
						{
							type: 'element',
							name: 'a:fontScheme',
							attributes: { name: 'Office' },
							elements: [
								{
									type: 'element',
									name: 'a:majorFont',
									elements: [
										{ type: 'element', name: 'a:latin', attributes: { typeface: 'Calibri' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Jpan', typeface: 'ＭＳ Ｐゴシック' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hang', typeface: '맑은 고딕' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hans', typeface: '宋体' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hant', typeface: '新細明體' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Arab', typeface: 'Times New Roman' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hebr', typeface: 'Times New Roman' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Thai', typeface: 'Angsana New' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Ethi', typeface: 'Nyala' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Beng', typeface: 'Vrinda' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Gujr', typeface: 'Shruti' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Khmr', typeface: 'MoolBoran' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Knda', typeface: 'Tunga' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Guru', typeface: 'Raavi' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Cans', typeface: 'Euphemia' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Cher', typeface: 'Plantagenet Cherokee' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Yiii', typeface: 'Microsoft Yi Baiti' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Tibt', typeface: 'Microsoft Himalaya' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Thaa', typeface: 'MV Boli' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Deva', typeface: 'Mangal' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Telu', typeface: 'Gautami' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Taml', typeface: 'Latha' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Syrc', typeface: 'Estrangelo Edessa' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Orya', typeface: 'Kalinga' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Mlym', typeface: 'Kartika' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Laoo', typeface: 'DokChampa' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Sinh', typeface: 'Iskoola Pota' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Mong', typeface: 'Mongolian Baiti' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Viet', typeface: 'Times New Roman' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Uigh', typeface: 'Microsoft Uighur' }, elements: [] },
									],
								},
								{
									type: 'element',
									name: 'a:minorFont',
									elements: [
										{ type: 'element', name: 'a:latin', attributes: { typeface: 'Calibri' }, elements: [] },
										{ type: 'element', name: 'a:ea', attributes: { typeface: '' }, elements: [] },
										{ type: 'element', name: 'a:cs', attributes: { typeface: '' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Jpan', typeface: 'ＭＳ Ｐゴシック' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hang', typeface: '맑은 고딕' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hans', typeface: '宋体' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hant', typeface: '新細明體' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Arab', typeface: 'Arial' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Hebr', typeface: 'Arial' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Thai', typeface: 'Cordia New' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Ethi', typeface: 'Nyala' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Beng', typeface: 'Vrinda' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Gujr', typeface: 'Shruti' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Khmr', typeface: 'DaunPenh' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Knda', typeface: 'Tunga' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Guru', typeface: 'Raavi' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Cans', typeface: 'Euphemia' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Cher', typeface: 'Plantagenet Cherokee' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Yiii', typeface: 'Microsoft Yi Baiti' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Tibt', typeface: 'Microsoft Himalaya' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Thaa', typeface: 'MV Boli' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Deva', typeface: 'Mangal' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Telu', typeface: 'Gautami' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Taml', typeface: 'Latha' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Syrc', typeface: 'Estrangelo Edessa' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Orya', typeface: 'Kalinga' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Mlym', typeface: 'Kartika' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Laoo', typeface: 'DokChampa' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Sinh', typeface: 'Iskoola Pota' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Mong', typeface: 'Mongolian Baiti' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Viet', typeface: 'Arial' }, elements: [] },
										{ type: 'element', name: 'a:font', attributes: { script: 'Uigh', typeface: 'Microsoft Uighur' }, elements: [] },
									],
								},
							],
						},
						{
							type: 'element',
							name: 'a:fmtScheme',
							attributes: { name: 'Office' },
							elements: [
								{
									type: 'element',
									name: 'a:fillStyleLst',
									elements: [
										{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'phClr' }, elements: [] }] },
										{
											type: 'element',
											name: 'a:gradFill',
											attributes: { rotWithShape: '1' },
											elements: [
												{
													type: 'element',
													name: 'a:gsLst',
													elements: [
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '0' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:tint', attributes: { val: '50000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '300000' }, elements: [] },
																	],
																},
															],
														},
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '35000' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:tint', attributes: { val: '37000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '300000' }, elements: [] },
																	],
																},
															],
														},
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '100000' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:tint', attributes: { val: '15000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '350000' }, elements: [] },
																	],
																},
															],
														},
													],
												},
												{ type: 'element', name: 'a:lin', attributes: { ang: '16200000', scaled: '1' }, elements: [] },
											],
										},
										{
											type: 'element',
											name: 'a:gradFill',
											attributes: { rotWithShape: '1' },
											elements: [
												{
													type: 'element',
													name: 'a:gsLst',
													elements: [
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '0' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:shade', attributes: { val: '51000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '130000' }, elements: [] },
																	],
																},
															],
														},
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '80000' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:shade', attributes: { val: '93000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '130000' }, elements: [] },
																	],
																},
															],
														},
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '100000' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:shade', attributes: { val: '94000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '135000' }, elements: [] },
																	],
																},
															],
														},
													],
												},
												{ type: 'element', name: 'a:lin', attributes: { ang: '16200000', scaled: '0' }, elements: [] },
											],
										},
									],
								},
								{
									type: 'element',
									name: 'a:lnStyleLst',
									elements: [
										{
											type: 'element',
											name: 'a:ln',
											attributes: { w: '9525', cap: 'flat', cmpd: 'sng', algn: 'ctr' },
											elements: [
												{
													type: 'element',
													name: 'a:solidFill',
													elements: [
														{
															type: 'element',
															name: 'a:schemeClr',
															attributes: { val: 'phClr' },
															elements: [
																{ type: 'element', name: 'a:shade', attributes: { val: '95000' }, elements: [] },
																{ type: 'element', name: 'a:satMod', attributes: { val: '105000' }, elements: [] },
															],
														},
													],
												},
												{ type: 'element', name: 'a:prstDash', attributes: { val: 'solid' }, elements: [] },
											],
										},
										{
											type: 'element',
											name: 'a:ln',
											attributes: { w: '25400', cap: 'flat', cmpd: 'sng', algn: 'ctr' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'phClr' }, elements: [] }] },
												{ type: 'element', name: 'a:prstDash', attributes: { val: 'solid' }, elements: [] },
											],
										},
										{
											type: 'element',
											name: 'a:ln',
											attributes: { w: '38100', cap: 'flat', cmpd: 'sng', algn: 'ctr' },
											elements: [
												{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'phClr' }, elements: [] }] },
												{ type: 'element', name: 'a:prstDash', attributes: { val: 'solid' }, elements: [] },
											],
										},
									],
								},
								{
									type: 'element',
									name: 'a:effectStyleLst',
									elements: [
										{
											type: 'element',
											name: 'a:effectStyle',
											elements: [
												{
													type: 'element',
													name: 'a:effectLst',
													elements: [
														{
															type: 'element',
															name: 'a:outerShdw',
															attributes: { blurRad: '40000', dist: '20000', dir: '5400000', rotWithShape: '0' },
															elements: [
																{
																	type: 'element',
																	name: 'a:srgbClr',
																	attributes: { val: '000000' },
																	elements: [{ type: 'element', name: 'a:alpha', attributes: { val: '38000' }, elements: [] }],
																},
															],
														},
													],
												},
											],
										},
										{
											type: 'element',
											name: 'a:effectStyle',
											elements: [
												{
													type: 'element',
													name: 'a:effectLst',
													elements: [
														{
															type: 'element',
															name: 'a:outerShdw',
															attributes: { blurRad: '40000', dist: '23000', dir: '5400000', rotWithShape: '0' },
															elements: [
																{
																	type: 'element',
																	name: 'a:srgbClr',
																	attributes: { val: '000000' },
																	elements: [{ type: 'element', name: 'a:alpha', attributes: { val: '35000' }, elements: [] }],
																},
															],
														},
													],
												},
											],
										},
										{
											type: 'element',
											name: 'a:effectStyle',
											elements: [
												{
													type: 'element',
													name: 'a:effectLst',
													elements: [
														{
															type: 'element',
															name: 'a:outerShdw',
															attributes: { blurRad: '40000', dist: '23000', dir: '5400000', rotWithShape: '0' },
															elements: [
																{
																	type: 'element',
																	name: 'a:srgbClr',
																	attributes: { val: '000000' },
																	elements: [{ type: 'element', name: 'a:alpha', attributes: { val: '35000' }, elements: [] }],
																},
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:scene3d',
													elements: [
														{
															type: 'element',
															name: 'a:camera',
															attributes: { prst: 'orthographicFront' },
															elements: [{ type: 'element', name: 'a:rot', attributes: { lat: '0', lon: '0', rev: '0' }, elements: [] }],
														},
														{
															type: 'element',
															name: 'a:lightRig',
															attributes: { rig: 'threePt', dir: 't' },
															elements: [{ type: 'element', name: 'a:rot', attributes: { lat: '0', lon: '0', rev: '1200000' }, elements: [] }],
														},
													],
												},
												{ type: 'element', name: 'a:sp3d', elements: [{ type: 'element', name: 'a:bevelT', attributes: { w: '63500', h: '25400' }, elements: [] }] },
											],
										},
									],
								},
								{
									type: 'element',
									name: 'a:bgFillStyleLst',
									elements: [
										{ type: 'element', name: 'a:solidFill', elements: [{ type: 'element', name: 'a:schemeClr', attributes: { val: 'phClr' }, elements: [] }] },
										{
											type: 'element',
											name: 'a:gradFill',
											attributes: { rotWithShape: '1' },
											elements: [
												{
													type: 'element',
													name: 'a:gsLst',
													elements: [
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '0' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:tint', attributes: { val: '40000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '350000' }, elements: [] },
																	],
																},
															],
														},
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '40000' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:tint', attributes: { val: '45000' }, elements: [] },
																		{ type: 'element', name: 'a:shade', attributes: { val: '99000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '350000' }, elements: [] },
																	],
																},
															],
														},
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '100000' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:shade', attributes: { val: '20000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '255000' }, elements: [] },
																	],
																},
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:path',
													attributes: { path: 'circle' },
													elements: [{ type: 'element', name: 'a:fillToRect', attributes: { l: '50000', t: '-80000', r: '50000', b: '180000' }, elements: [] }],
												},
											],
										},
										{
											type: 'element',
											name: 'a:gradFill',
											attributes: { rotWithShape: '1' },
											elements: [
												{
													type: 'element',
													name: 'a:gsLst',
													elements: [
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '0' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:tint', attributes: { val: '80000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '300000' }, elements: [] },
																	],
																},
															],
														},
														{
															type: 'element',
															name: 'a:gs',
															attributes: { pos: '100000' },
															elements: [
																{
																	type: 'element',
																	name: 'a:schemeClr',
																	attributes: { val: 'phClr' },
																	elements: [
																		{ type: 'element', name: 'a:shade', attributes: { val: '30000' }, elements: [] },
																		{ type: 'element', name: 'a:satMod', attributes: { val: '200000' }, elements: [] },
																	],
																},
															],
														},
													],
												},
												{
													type: 'element',
													name: 'a:path',
													attributes: { path: 'circle' },
													elements: [{ type: 'element', name: 'a:fillToRect', attributes: { l: '50000', t: '50000', r: '50000', b: '50000' }, elements: [] }],
												},
											],
										},
									],
								},
							],
						},
					],
				},
				{ type: 'element', name: 'a:objectDefaults', elements: [] },
				{ type: 'element', name: 'a:extraClrSchemeLst', elements: [] },
			],
		},
	],
};
