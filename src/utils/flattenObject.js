function flattenObject(obj, prefix = '', res = {}) {
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;

    if (Array.isArray(value)) {
      res[newKey] = value
        .map(v => {
          if (v && typeof v === 'object') {
            return objectToKeyValueString(v);
          }
          return v;
        })
        .join(' | ');
    } 
    else if (value && typeof value === 'object') {
      flattenObject(value, newKey, res);
    } 
    else {
      res[newKey] = value;
    }
  }
  return res;
}

function objectToKeyValueString(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k}: ${v}`)
    .join(', ');
}


module.exports = { flattenObject }