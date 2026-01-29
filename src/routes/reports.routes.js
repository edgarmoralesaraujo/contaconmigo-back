const express = require('express');
const { parseCfdi } = require('../services/cfdiParser.service');
const { generateCSV } = require('../utils/csvGenerator');
const { flattenObject } = require('../utils/flattenObject')
const { randomUUID } = require('crypto');
const { expandColumnsFromMapping, buildRow } = require('../utils/expandColumnsFromMapping');

require('dotenv').config();

const router = express.Router();

const inMemoryReports = new Map();

/**
 * POST /api/reports
 * Genera reporte JSON
 */
router.post('/parse', async (req, res) => {
  console.log('=========================REQUEST=========================')
  console.log(JSON.stringify(req.body));
  const { xmlFiles, fieldMapping } = req.body;

  const rows = [];

  // for (const file of xmlFiles) {
  //   const xml = Buffer.from(file.content, 'base64').toString('utf8');
  //   const parsed = parseCfdi(xml, fieldMapping.fields);
  //   rows.push(Object.values(parsed));
  // }

  const columns = expandColumnsFromMapping(fieldMapping.fields);

  for (const file of xmlFiles) {
    const xml = Buffer.from(file.content, 'base64').toString('utf8');
    const parsed = parseCfdi(xml, fieldMapping.fields);
    rows.push(buildRow(parsed, fieldMapping.fields));
  }

  // for (const file of xmlFiles) {
  //   const xml = Buffer.from(file.content, 'base64').toString('utf8');
  //   const parsed = parseCfdi(xml, fieldMapping.fields);

  //   const flat = flattenObject(parsed);

  //   rows.push(
  //     fieldMapping.fields
  //       .sort((a, b) => a.order - b.order)
  //       .map(f => flat[f.alias] ?? null)
  //   );
  // }

  // const columns = fieldMapping.fields
  //   .sort((a, b) => a.order - b.order)
  //   .map(f => f.alias);

  const reportId = randomUUID();

  inMemoryReports.set(reportId, { columns, rows });

  const data = {
    reportId,
    columns,
    rows
  };

  console.log('=========================RESPONSE=========================')
  console.log(data);

  res.status(201).json(data);
});

/**
 * GET /api/reports/:id/csv
 * Genera CSV DESDE EL RESULTADO PREVIO
 */
router.get('/:id/csv', (req, res) => {
  const report = inMemoryReports.get(req.params.id);
  if (!report)
    return res.status(404).json({
      error: 'Reporte no encontrado. Intentelo nuevamente, si el problema persiste contacte al administrador.',
      support: {
        phone: process.env.SUPPORT_PHONE,
        whatsappUrl: `https://wa.me/${process.env.SUPPORT_PHONE}`
      }
    });

  const csv = generateCSV(report.columns, report.rows);

  res.setHeader('Content-Type', 'text/csv');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename="reporte.csv"'
  );
  res.send(csv);
});

module.exports = router;
