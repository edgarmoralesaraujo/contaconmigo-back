function castValue(input) {
  if (!input || typeof input !== 'object') return null;

  const { value, attributeName } = input;
  if (value === undefined || value === null || value === '') return null;

  const v = String(value).trim();

  if (attributeName === 'UUID') return v.toUpperCase();

  if (/^-?\d+(\.\d+)?$/.test(v)) {
    const n = Number(v);
    if (!isNaN(n)) return n;
  }

  return v;
}

module.exports = { castValue };
