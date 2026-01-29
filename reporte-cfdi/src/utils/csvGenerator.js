// function generateCSV(columns, rows) {
//   const escape = v =>
//     `"${String(v ?? '').replace(/"/g, '""')}"`;

//   const header = columns.map(escape).join(',');
//   const body = rows.map(r => r.map(escape).join(',')).join('\n');

//   return `${header}\n${body}`;
// }

// module.exports = { generateCSV };


function generateCSV(columns, rows) {
  const escape = v => {
    if (v === null || v === undefined) return '""';

    let value = v;

    // 🔑 CLAVE: serializar objetos y arrays
    if (typeof v === 'object') {
      value = JSON.stringify(v);
    }

    return `"${String(value).replace(/"/g, '""')}"`;
  };

  const header = columns.map(escape).join(',');
  const body = rows.map(r => r.map(escape).join(',')).join('\n');

  return `${header}\n${body}`;
}

module.exports = { generateCSV };
