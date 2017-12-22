const SCHEME_COLORS = require('../color-types').SchemeColors;

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
            'c:chartSpace': [
                {
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
            ],
        };
    }

    static createColorBlock(colorStr) {
        const DEFAULT_FONT_COLOR = '000000';

        let isRgb = /^[0-9a-fA-F]{6}$/.test(colorStr);
        let schemeColorValues = Object.keys(SCHEME_COLORS).map(function(key) {
            return SCHEME_COLORS[key];
        });

        if (!isRgb && !schemeColorValues.includes(colorStr)) {
            console.warn(`"${colorStr}" is not a valid scheme color or RGB value. Using default font color: "${DEFAULT_FONT_COLOR}"`);
            console.warn('Use a RGB value or one of these scheme color values:', schemeColorValues.join(', '));

            colorStr = DEFAULT_FONT_COLOR;
        }

        let tagName = isRgb ? 'srgbClr' : 'schemeClr';
        let colorObject = {};

        colorObject[`a:${tagName}`] = [{ $: { val: colorStr } }];

        return colorObject;
    }
}

module.exports.PptFactoryHelper = PptFactoryHelper;
module.exports.PptFactoryHelper.HyperlinkType = HyperlinkType;
