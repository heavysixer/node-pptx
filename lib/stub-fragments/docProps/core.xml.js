module.exports = {
	declaration: { attributes: { version: '1.0', encoding: 'UTF-8', standalone: 'yes' } },
	elements: [
		{
			type: 'element',
			name: 'cp:coreProperties',
			attributes: {
				'xmlns:cp': 'http://schemas.openxmlformats.org/package/2006/metadata/core-properties',
				'xmlns:dc': 'http://purl.org/dc/elements/1.1/',
				'xmlns:dcterms': 'http://purl.org/dc/terms/',
				'xmlns:dcmitype': 'http://purl.org/dc/dcmitype/',
				'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
			},
			elements: [
				{ type: 'element', name: 'dc:title', elements: [{ type: 'text', text: 'Slide 1' }] },
				{ type: 'element', name: 'dc:creator', elements: [{ type: 'text', text: 'gregdolley' }] },
				{ type: 'element', name: 'cp:lastModifiedBy', elements: [{ type: 'text', text: 'gregdolley' }] },
				{ type: 'element', name: 'cp:revision', elements: [{ type: 'text', text: '1' }] },
				{ type: 'element', name: 'dcterms:created', attributes: { 'xsi:type': 'dcterms:W3CDTF' }, elements: [{ type: 'text', text: '2017-12-06T03:55:22Z' }] },
				{ type: 'element', name: 'dcterms:modified', attributes: { 'xsi:type': 'dcterms:W3CDTF' }, elements: [{ type: 'text', text: '2017-12-06T03:55:50Z' }] },
			],
		},
	],
};
