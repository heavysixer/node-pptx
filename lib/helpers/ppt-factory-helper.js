const SCHEME_COLORS = require('../color-types').SchemeColors;
const XmlNode = require('../xmlnode');

let { ExcelHelper } = require('./excel-helper');
let { PptxUnitHelper } = require('./unit-helper');

const HyperlinkType = {
    TEXT: 'text',
    IMAGE: 'image',
};

class PptFactoryHelper {
    static handleHyperlinkOptions(pptFactory, type, slide, options) {
        if (!options || !options.url) return;
        if (type !== HyperlinkType.IMAGE && type !== HyperlinkType.TEXT) throw new Error('Invalid hyperlink type.');

        if (type === HyperlinkType.IMAGE) {
            // if this is not a link to another slide
            if (options.url[0] !== '#') {
                // interestingly enough, you can't just give PowerPoint a simple URL like "www.google.com" - it
                // MUST contain the protocol prefix; so we'll put "https://" if the caller didn't specify it
                if (!options.url.startsWith('http')) {
                    options.url = `https://${options.url}`;
                }
            }
        }

        options.rIdForHyperlink = pptFactory.slideFactory.addHyperlinkToSlideRelationship(slide, options.url);
    }

    static createBaseShapeBlock(objectId, objectName, x, y, cx, cy) {
        return {
            'p:nvSpPr': [
                {
                    'p:cNvPr': [{ $: { id: objectId, name: `${objectName} ${objectId}` } }],
                    'p:cNvSpPr': [{}],
                    'p:nvPr': [{}],
                },
            ],
            'p:spPr': [
                {
                    'a:xfrm': [
                        {
                            'a:off': [{ $: { x: x, y: y } }],
                            'a:ext': [{ $: { cx: cx, cy: cy } }],
                        },
                    ],
                    'a:prstGeom': [
                        {
                            $: { prst: 'rect' },
                            'a:avLst': [{}],
                        },
                    ],
                },
            ],
            'p:txBody': [
                {
                    'a:bodyPr': [{}],
                    'a:lstStyle': [{}],
                    'a:p': [{}],
                },
            ],
        };
    }

    // TODO: this block is taken straight from won21 (except I had to change some objects to an array of objects to support our existing
    // block structure); I don't like the defaults it's using and there are some slight differences from an actual PowerPoint-generated
    // p:graphicFrame block. Once basic charts are done, revisit this and see if this block can be made better.
    static createBaseChartFrameBlock(x, y, cx, cy) {
        return {
            'p:graphicFrame': [
                {
                    'p:nvGraphicFramePr': [
                        {
                            'p:cNvPr': [{ $: { id: '5', name: 'Chart 4' } }],
                            'p:cNvGraphicFramePr': [{}],
                            'p:nvPr': [
                                {
                                    'p:extLst': [
                                        {
                                            'p:ext': [
                                                {
                                                    $: { uri: '{D42A27DB-BD31-4B8C-83A1-F6EECF244321}' },
                                                    'p14:modId': [
                                                        {
                                                            $: {
                                                                'xmlns:p14': 'http://schemas.microsoft.com/office/powerpoint/2010/main',
                                                                val: '3543180680',
                                                            },
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
                    'p:xfrm': [
                        {
                            'a:off': [{ $: { x: x, y: y } }],
                            'a:ext': [{ $: { cx: cx, cy: cy } }],
                        },
                    ],
                    'a:graphic': [
                        {
                            'a:graphicData': [
                                {
                                    $: {
                                        uri: 'http://schemas.openxmlformats.org/drawingml/2006/chart',
                                    },
                                    'c:chart': [
                                        {
                                            $: {
                                                'xmlns:c': 'http://schemas.openxmlformats.org/drawingml/2006/chart',
                                                'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
                                                'r:id': 'rId2',
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    ],
                },
            ],
        };
    }

    static createBaseChartSpaceBlock() {
        return {
            // NOTE: c:chartSpace is not an array here because it gets inserted at the root
            'c:chartSpace': {
                $: {
                    'xmlns:c': 'http://schemas.openxmlformats.org/drawingml/2006/chart',
                    'xmlns:a': 'http://schemas.openxmlformats.org/drawingml/2006/main',
                    'xmlns:r': 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
                },
                'c:date1904': [
                    {
                        $: {
                            val: '0',
                        },
                    },
                ],
                'c:lang': [{ $: { val: 'en-US' } }],
                'c:roundedCorners': [{ $: { val: '0' } }],
                // this AlternateContent node is optional: it just makes the bars look a little 3D-like instead of flat-shaded
                'mc:AlternateContent': [
                    {
                        $: {
                            'xmlns:mc': 'http://schemas.openxmlformats.org/markup-compatibility/2006',
                        },
                        'mc:Choice': [
                            {
                                $: {
                                    Requires: 'c14',
                                    'xmlns:c14': 'http://schemas.microsoft.com/office/drawing/2007/8/2/chart',
                                },
                                'c14:style': [
                                    {
                                        $: {
                                            val: '118',
                                        },
                                    },
                                ],
                            },
                        ],
                        'mc:Fallback': [
                            {
                                'c:style': [
                                    {
                                        $: {
                                            val: '18',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
                'c:chart': [
                    {
                        'c:autoTitleDeleted': [
                            {
                                $: {
                                    val: '0',
                                },
                            },
                        ],
                        'c:plotArea': [
                            {
                                'c:layout': [{}],
                                'c:barChart': [
                                    {
                                        'c:barDir': [
                                            {
                                                $: {
                                                    val: 'bar',
                                                },
                                            },
                                        ],
                                        'c:grouping': [
                                            {
                                                $: {
                                                    val: 'clustered',
                                                },
                                            },
                                        ],
                                        'c:varyColors': [
                                            {
                                                $: {
                                                    val: '0',
                                                },
                                            },
                                        ],
                                        'c:ser': [], // insert generated c:ser here
                                        'c:dLbls': [
                                            {
                                                'c:showLegendKey': [
                                                    {
                                                        $: {
                                                            val: '0',
                                                        },
                                                    },
                                                ],
                                                'c:showVal': [
                                                    {
                                                        $: {
                                                            val: '0',
                                                        },
                                                    },
                                                ],
                                                'c:showCatName': [
                                                    {
                                                        $: {
                                                            val: '0',
                                                        },
                                                    },
                                                ],
                                                'c:showSerName': [
                                                    {
                                                        $: {
                                                            val: '0',
                                                        },
                                                    },
                                                ],
                                                'c:showPercent': [
                                                    {
                                                        $: {
                                                            val: '0',
                                                        },
                                                    },
                                                ],
                                                'c:showBubbleSize': [
                                                    {
                                                        $: {
                                                            val: '0',
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                        'c:gapWidth': [
                                            {
                                                $: {
                                                    val: '150',
                                                },
                                            },
                                        ],
                                        'c:axId': [
                                            {
                                                $: {
                                                    val: '2067994824',
                                                },
                                            },
                                            {
                                                $: {
                                                    val: '-2074751000',
                                                },
                                            },
                                        ],
                                    },
                                ],
                                'c:catAx': [
                                    {
                                        'c:axId': [
                                            {
                                                $: {
                                                    val: '2067994824',
                                                },
                                            },
                                        ],
                                        'c:scaling': [
                                            {
                                                'c:orientation': [
                                                    {
                                                        $: {
                                                            val: 'minMax',
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                        'c:delete': [
                                            {
                                                $: {
                                                    val: '0',
                                                },
                                            },
                                        ],
                                        'c:axPos': [
                                            {
                                                $: {
                                                    val: 'l',
                                                },
                                            },
                                        ],
                                        'c:majorTickMark': [
                                            {
                                                $: {
                                                    val: 'out',
                                                },
                                            },
                                        ],
                                        'c:minorTickMark': [
                                            {
                                                $: {
                                                    val: 'none',
                                                },
                                            },
                                        ],
                                        'c:tickLblPos': [
                                            {
                                                $: {
                                                    val: 'nextTo',
                                                },
                                            },
                                        ],
                                        'c:crossAx': [
                                            {
                                                $: {
                                                    val: '-2074751000',
                                                },
                                            },
                                        ],
                                        'c:crosses': [
                                            {
                                                $: {
                                                    val: 'autoZero',
                                                },
                                            },
                                        ],
                                        'c:auto': [
                                            {
                                                $: {
                                                    val: '1',
                                                },
                                            },
                                        ],
                                        'c:lblAlgn': [
                                            {
                                                $: {
                                                    val: 'ctr',
                                                },
                                            },
                                        ],
                                        'c:lblOffset': [
                                            {
                                                $: {
                                                    val: '100',
                                                },
                                            },
                                        ],
                                        'c:noMultiLvlLbl': [
                                            {
                                                $: {
                                                    val: '0',
                                                },
                                            },
                                        ],
                                    },
                                ],
                                'c:valAx': [
                                    {
                                        'c:axId': [
                                            {
                                                $: {
                                                    val: '-2074751000',
                                                },
                                            },
                                        ],
                                        'c:scaling': [
                                            {
                                                'c:orientation': [
                                                    {
                                                        $: {
                                                            val: 'minMax',
                                                        },
                                                    },
                                                ],
                                            },
                                        ],
                                        'c:delete': [
                                            {
                                                $: {
                                                    val: '0',
                                                },
                                            },
                                        ],
                                        'c:axPos': [
                                            {
                                                $: {
                                                    val: 'b',
                                                },
                                            },
                                        ],
                                        'c:majorGridlines': [{}],
                                        'c:numFmt': [
                                            {
                                                $: {
                                                    formatCode: 'General',
                                                    sourceLinked: '1',
                                                },
                                            },
                                        ],
                                        'c:majorTickMark': [
                                            {
                                                $: {
                                                    val: 'out',
                                                },
                                            },
                                        ],
                                        'c:minorTickMark': [
                                            {
                                                $: {
                                                    val: 'none',
                                                },
                                            },
                                        ],
                                        'c:tickLblPos': [
                                            {
                                                $: {
                                                    val: 'nextTo',
                                                },
                                            },
                                        ],
                                        'c:crossAx': [
                                            {
                                                $: {
                                                    val: '2067994824',
                                                },
                                            },
                                        ],
                                        'c:crosses': [
                                            {
                                                $: {
                                                    val: 'autoZero',
                                                },
                                            },
                                        ],
                                        'c:crossBetween': [
                                            {
                                                $: {
                                                    val: 'between',
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        ],
                        'c:legend': [
                            {
                                'c:legendPos': [
                                    {
                                        $: {
                                            val: 'r',
                                        },
                                    },
                                ],
                                'c:layout': [{}],
                                'c:overlay': [
                                    {
                                        $: {
                                            val: '0',
                                        },
                                    },
                                ],
                            },
                        ],
                        'c:plotVisOnly': [
                            {
                                $: {
                                    val: '1',
                                },
                            },
                        ],
                        'c:dispBlanksAs': [
                            {
                                $: {
                                    val: 'gap',
                                },
                            },
                        ],
                        'c:showDLblsOverMax': [
                            {
                                $: {
                                    val: '0',
                                },
                            },
                        ],
                    },
                ],
                'c:txPr': [
                    {
                        'a:bodyPr': [{}],
                        'a:lstStyle': [{}],
                        'a:p': [
                            {
                                'a:pPr': [
                                    {
                                        'a:defRPr': [
                                            {
                                                $: {
                                                    sz: '1800',
                                                },
                                            },
                                        ],
                                    },
                                ],
                                'a:endParaRPr': [
                                    {
                                        $: {
                                            lang: 'en-US',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                ],
                'c:externalData': [
                    {
                        $: {
                            'r:id': 'rId1',
                        },
                        'c:autoUpdate': [
                            {
                                $: {
                                    val: '0',
                                },
                            },
                        ],
                    },
                ],
            },
        };
    }

    static createColorBlock(color) {
        const DEFAULT_FONT_COLOR = '000000';

        if (!color) color = DEFAULT_FONT_COLOR;

        let isRgb = /^[0-9a-fA-F]{6}$/.test(color);
        let schemeColorValues = Object.keys(SCHEME_COLORS).map(function(key) {
            return SCHEME_COLORS[key];
        });

        if (!isRgb && !schemeColorValues.includes(color)) {
            console.warn(`"${color}" is not a valid scheme color or RGB value. Using default font color: "${DEFAULT_FONT_COLOR}"`);
            console.warn('Use a RGB value or one of these scheme color values:', schemeColorValues.join(', '));

            color = DEFAULT_FONT_COLOR;
        }

        let tagName = isRgb ? 'srgbClr' : 'schemeClr';
        let colorObject = {};

        colorObject[`a:${tagName}`] = [{ $: { val: color } }];

        return colorObject;
    }

    // this will return an array of data blocks representing all the <c:ser> nodes which get inserted as children
    // under the corresponding "chart" node (e.g., <c:barChart> for bar charts, <c:pieChart> for pie charts, etc.)
    static createSeriesDataBlock(data) {
        return { 'c:ser': data.map(this.createSingleSeriesDataNode, this) };
    }

    // this will return all the child nodes that belong under a <c:ser> node (it will NOT contain the <c:ser> root)
    static createSingleSeriesDataNode(series, i) {
        let rc2a = ExcelHelper.rowColToSheetAddress;
        let strRef = PptFactoryHelper.createStrRefNode;
        let numRef = PptFactoryHelper.createNumRefNode;

        let sheetCellRangeForValues = `Sheet1!${rc2a(2, 2 + i, true, true)}:${rc2a(2 + series.labels.length - 1, 2 + i, true, true)}`;
        let sheetCellRangeForCategories = `Sheet1!${rc2a(2, 1, true, true)}:${rc2a(2 + series.labels.length - 1, 1, true, true)}`;
        let sheetCellAddressForSeriesName = `Sheet1!${rc2a(1, 2 + i, true, true)}`;

        let serChildNodes = XmlNode()
            .addChild('c:idx', XmlNode().attr('val', i))
            .addChild('c:order', XmlNode().attr('val', i))
            .addChild('c:tx', strRef(sheetCellAddressForSeriesName, [series.name]))
            .addChild('c:invertIfNegative', XmlNode().attr('val', 0))
            .addChild('c:cat', strRef(sheetCellRangeForCategories, series.labels))
            .addChild('c:val', numRef(sheetCellRangeForValues, series.values, 'General'));

        if (series.color) {
            let colorBlock = PptFactoryHelper.createColorBlock(series.color);
            let colorChildNodeType = colorBlock['a:srgbClr'] ? 'a:srgbClr' : 'a:schemeClr';
            let colorNode = XmlNode().addChild(colorChildNodeType, colorBlock[colorChildNodeType][0]); // will either be <a:srgbClr> or <a:schemeClr>

            serChildNodes.addChild('c:spPr', XmlNode().addChild('a:solidFill', colorNode));
        }

        return serChildNodes.el;
    }

    static createStrRefNode(region, stringArray) {
        let node = XmlNode().addChild(
            'c:strRef',
            XmlNode()
                .addChild('c:f', region)
                .addChild('c:strCache', PptFactoryHelper.createPtCountNode(stringArray))
        );

        return node.el;
    }

    static createPtCountNode(stringArray) {
        let node = XmlNode().addChild('c:ptCount', XmlNode().attr('val', stringArray.length));

        for (let i = 0; i < stringArray.length; i++) {
            node.addChild(
                'c:pt',
                XmlNode()
                    .attr('idx', i)
                    .addChild('c:v', stringArray[i])
            );
        }

        return node;
    }

    static createNumRefNode(region, numArray, formatCode) {
        let numCache = XmlNode()
            .addChild('c:formatCode', formatCode)
            .addChild('c:ptCount', XmlNode().attr('val', numArray.length));

        for (let i = 0; i < numArray.length; i++) {
            numCache.addChild(
                'c:pt',
                XmlNode()
                    .attr('idx', i)
                    .addChild('c:v', numArray[i].toString())
            );
        }

        let node = XmlNode().addChild(
            'c:numRef',
            XmlNode()
                .addChild('c:f', region)
                .addChild('c:numCache', numCache)
        );

        return node.el;
    }

    static addFontFaceToBlock(fontFace, block) {
        // TODO: not completely sure how pitchFamily is calculated (PowerPoint defaulted to "34" on "Arial" and "2" on "Alien Encounters")
        //
        // After looking at some .NET code for enumerating available fonts on Windows, this enum stuck out at me:
        //
        //  [Flags]
        //  public enum LogFontPitchAndFamily : byte {
        //      Default = 0,
        //      DontCare = 0,
        //      Fixed = 1,
        //      Variable = 2,
        //      Roman = 16,
        //      Swiss = 32,
        //      Modern = 48,
        //      Script = 64,
        //      Decorative = 80,
        //  }
        //
        // So it looks like PowerPoint's default of "34" for arial could've been a bitfield combination of Swiss and Variable (0010 0010) (i.e. 32 OR'ed with 2).
        // While PowerPoint's selection of "2" for alien encounters probably just means Variable (it is indeed a variable width font, same as arial).
        //
        // Since it looks like "0" can be used as a safe default, I'm going to revisit this later.
        let fontAttributes = [{ $: { typeface: fontFace, pitchFamily: '0', charset: '0' } }];

        block['a:latin'] = fontAttributes;
        block['a:cs'] = fontAttributes;
    }

    static setTextRunProperties(textRunPropertyBlock, options) {
        if (typeof options.fontSize === 'number') {
            textRunPropertyBlock['$'].sz = `${Math.round(options.fontSize)}00`;
        }

        if (options.fontBold !== undefined && options.fontBold === true) {
            textRunPropertyBlock['$'].b = '1';
        }
    }

    static addLinePropertiesToShapeBlock(shapeBlock, lineProperties) {
        if (lineProperties.color) {
            shapeBlock['a:ln'] = [{}];

            if (lineProperties.width) {
                shapeBlock['a:ln'][0]['$'] = { w: lineProperties.width * PptxUnitHelper.Units.ONE_POINT };
            }

            shapeBlock['a:ln'][0]['a:solidFill'] = PptFactoryHelper.createColorBlock(lineProperties.color);
        }
    }
}

module.exports.PptFactoryHelper = PptFactoryHelper;
module.exports.PptFactoryHelper.HyperlinkType = HyperlinkType;
