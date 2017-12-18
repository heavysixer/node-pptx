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
}

module.exports.PptFactoryHelper = PptFactoryHelper;
module.exports.PptFactoryHelper.HyperlinkType = HyperlinkType;
