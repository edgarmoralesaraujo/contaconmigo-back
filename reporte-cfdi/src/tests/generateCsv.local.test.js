const fs = require('fs');
const path = require('path');
const { parseCfdi } = require('../services/cfdiParser.service');
const { generateCSV } = require('../utils/csvGenerator');

(async () => {
  try {
    // 1️⃣ Cargar XML real
    const xmlPath = path.join(__dirname, 'cfdi.xml');
    const xmlString = fs.readFileSync(xmlPath, 'utf8');

    // 2️⃣ Field mapping (MISMO que usas para JSON)
    const fieldMapping = [
      {
        alias: 'comprobante',
        path: 'Comprobante',
        children: [
          { alias: 'fecha', path: 'Fecha' },
          { alias: 'total', path: 'Total' }
        ]
      },
      {
        alias: 'uuid',
        path: 'Complemento.TimbreFiscalDigital.UUID'
      },
      {
        alias: 'EMISOR',
        path: 'Emisor',
        children: [
          { alias: 'RFC', path: 'Rfc' },
          { alias: 'nombre', path: 'Nombre' }
        ]
      },
      {
        alias: 'conceptos',
        path: 'Conceptos.Concepto[]',
        isArray: true,
        children: [
          { alias: 'DESCRIPCION', path: 'Descripcion' },
          { alias: 'importe', path: 'Importe' }
        ]
      }
    ];

    // 3️⃣ Parsear CFDI → JSON semántico
    const parsed = parseCfdi(xmlString, fieldMapping);

    console.log('================ JSON PARSEADO =================');
    console.dir(parsed, { depth: 10 });

    // 4️⃣ Columnas = keys del resultado (orden garantizado)
    const columns = Object.keys(parsed);

    // 5️⃣ Normalizar valores (objetos/arrays → JSON string)
    const row = columns.map(col => {
      const value = parsed[col];
      if (value === null || value === undefined) return '';
      if (typeof value === 'object') return JSON.stringify(value);
      return value;
    });

    const rows = [row];

    // 6️⃣ Generar CSV (USANDO TU GENERADOR ORIGINAL)
    const csv = generateCSV(columns, rows);

    console.log('\n================ CSV GENERADO =================');
    console.log(csv);

    // 7️⃣ Asserts manuales simples
    if (!csv.includes('uuid')) {
      throw new Error('Header CSV inválido');
    }

    if (!csv.includes(parsed.uuid)) {
      throw new Error('UUID no presente en CSV');
    }

    console.log('\n✅ Prueba CSV local OK');
  } catch (err) {
    console.error('\n❌ Error en prueba CSV local');
    console.error(err);
    process.exit(1);
  }
})();
