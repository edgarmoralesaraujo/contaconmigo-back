const { mapNode } = require('./nodeMapper');

function mapFields(xml, mapping) {
  const result = {};
  for (const field of mapping) {
    result[field.alias] = mapNode(xml, field);
  }
  return result;
}

module.exports = { mapFields };


// const { flattenMappedValue } = require('../utils/flattenMappedValue');
// const { mapNode } = require('./nodeMapper');

// function mapFields(xml, mapping) {
//   const result = {};

//   for (const field of mapping) {
//     const rawValue = mapNode(xml, field);
//     result[field.alias] = flattenMappedValue(rawValue, field);
//   }

//   return result;
// }
// module.exports = { mapFields };