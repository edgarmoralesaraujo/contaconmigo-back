const { XMLParser } = require('fast-xml-parser');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  removeNSPrefix: true,
  parseAttributeValue: false,
  parseTagValue: false
});

function parseXml(xmlString) {
  return parser.parse(xmlString);
}

module.exports = { parseXml };
