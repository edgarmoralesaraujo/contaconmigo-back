const { resolvePath } = require('../resolvers/xmlPathResolver');
const { castValue } = require('../utils/typeCaster');

function mapNode(xml, nodeConfig) {
  if (nodeConfig.isArray) {
    const nodes = resolvePath(xml, nodeConfig.path);
    if (!nodes) return [];
    return nodes.map(n => mapChildren(n, nodeConfig.children));
  }

  if (nodeConfig.children) {
    const target = resolvePath(xml, nodeConfig.path);
    if (!target) return null;
    return mapChildren(target, nodeConfig.children);
  }

  const raw = resolvePath(xml, nodeConfig.path);

  return castValue({
    value: raw,
    attributeName: getAttributeName(nodeConfig.path)
  });
}

function mapChildren(base, children) {
  const result = {};
  for (const child of children) {
    result[child.alias] = mapNode(base, child);
  }
  return result;
}

function getAttributeName(path) {
  const m = path.match(/\.([^.]+)$/);
  return m ? m[1] : null;
}

module.exports = { mapNode };
