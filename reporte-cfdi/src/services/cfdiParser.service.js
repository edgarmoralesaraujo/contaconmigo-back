const { parseXml } = require('../utils/xmlParser');
const { mapFields } = require('../mappers/fieldMapper');

function parseCfdi(xmlString, fieldMapping) {
  const parsed = parseXml(xmlString);
  const comprobante = parsed.Comprobante;
  return mapFields(comprobante, fieldMapping);
}

module.exports = { parseCfdi };
