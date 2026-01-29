const express = require('express');
const reportsRoutes = require('./routes/reports.routes');

const app = express();
app.use(express.json({ limit: '10mb' }));

app.use('/api', reportsRoutes);

app.listen(process.env.PORT, () => {
  console.log(`CFDI Report API running on port ${process.env.PORT}`);
});
