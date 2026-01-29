function expandColumnsFromMapping(fields) {
  const columns = [];

  for (const field of fields.sort((a, b) => a.order - b.order)) {
    if (field.children && !field.isArray) {
      for (const child of field.children) {
        columns.push(`${field.alias}.${child.alias}`);
      }
    } else {
      columns.push(field.alias);
    }
  }

  return columns;
}

// function buildRow(parsed, fields) {
//   const row = [];

//   for (const field of fields.sort((a, b) => a.order - b.order)) {
//     const value = parsed[field.alias];

//     if (field.children && !field.isArray) {
//       for (const child of field.children) {
//         row.push(value?.[child.alias] ?? null);
//       }
//     } else {
//       row.push(value);
//     }
//   }

//   return row;
// }

function buildRow(parsed, fields) {
  const row = [];

  for (const field of fields.sort((a, b) => a.order - b.order)) {
    const value = parsed[field.alias];

    if (field.children && field.isArray && Array.isArray(value)) {
      // Aplana el array de objetos
      const items = value.map(item => {
        return field.children
          .map(child => `${child.alias}: ${item?.[child.alias] ?? ''}`)
          .join(', ');
      });
      row.push(items.join(' | '));
    } else if (field.children && !field.isArray) {
      for (const child of field.children) {
        row.push(value?.[child.alias] ?? null);
      }
    } else {
      row.push(value);
    }
  }

  return row;
}


module.exports = { expandColumnsFromMapping, buildRow }