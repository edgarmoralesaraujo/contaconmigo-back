const fs = require('fs');
const path = require('path');
const { parseCfdi } = require('../services/cfdiParser.service');

(async () => {
  try {
    // 1️⃣ Cargar XML real
    const xmlPath = path.join(__dirname, 'cfdi.xml');
    const xmlString = fs.readFileSync(xmlPath, 'utf8');

    // 2️⃣ Field mapping de prueba (mínimo pero representativo)
    const fieldMapping = [
      {
        alias: 'fecha',
        path: 'Fecha'
      },
      {
        alias: 'total',
        path: 'Total'
      },
      {
        alias: 'uuid',
        path: 'Complemento.TimbreFiscalDigital.UUID'
      },
      {
        alias: 'EMISOR',
        path: 'Emisor',
        children: [
          {
            alias: 'RFC',
            path: 'Rfc'
          },
          {
            alias: 'nombre',
            path: 'Nombre'
          }
        ]
      },
      {
        alias: 'conceptos',
        path: 'Conceptos.Concepto[]',
        isArray: true,
        children: [
          {
            alias: 'DESCRIPCION',
            path: 'Descripcion'
          },
          {
            alias: 'importe',
            path: 'Importe'
          }
        ]
      }
    ];

    // 3️⃣ Ejecutar parser
    const result = parseCfdi(xmlString, fieldMapping);

    // 4️⃣ Mostrar resultado
    console.log('================ RESULTADO =================');
    console.dir(result, { depth: 10 });

    // 5️⃣ Asserts manuales simples
    if (!result.uuid) {
      throw new Error('UUID no resuelto');
    }

    if (!Array.isArray(result.conceptos)) {
      throw new Error('Conceptos no es array');
    }

    console.log('✅ Prueba local OK');
  } catch (err) {
    console.error('❌ Error en prueba local');
    console.error(err);
    process.exit(1);
  }
})();
