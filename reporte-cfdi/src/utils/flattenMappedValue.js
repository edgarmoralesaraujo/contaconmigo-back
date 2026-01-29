function flattenMappedValue(value, field) {
  if (value == null) return null;

  // 1️⃣ Array → string (dinámico)
  if (Array.isArray(value)) {
    return value
      .map(v => flattenMappedValue(v, field))
      .filter(v => v != null && v !== '')
      .join(' | ');
  }

  // 2️⃣ Object → key=value dinámico
  if (typeof value === 'object') {
    return Object.entries(value)
      .map(([k, v]) => `${k}=${flattenMappedValue(v, field)}`)
      .filter(v => v != null && v !== '')
      .join(', ');
  }

  // 3️⃣ Scalar
  return value;
}

module.exports = { flattenMappedValue };
