function resolvePath(node, path) {
  if (!node || !path) return null;

  const cleanPath = path.replace('@', '');
  const parts = cleanPath.split('.');

  let current = node;

  for (let part of parts) {
    const isArray = part.endsWith('[]');
    const key = isArray ? part.replace('[]', '') : part;

    if (!current) return null;

    current = current[key];

    if (isArray) {
      if (!current) return [];
      return Array.isArray(current) ? current : [current];
    }
  }

  return current ?? null;
}

module.exports = { resolvePath };
