Actúa como un Senior Frontend Engineer integrándote a un backend existente en producción.
Tu responsabilidad es ÚNICAMENTE el frontend. No debes mover lógica al frontend ni rediseñar el backend.

====================================================
BACKEND (CONTRATO INMUTABLE)
====================================================

API REST en Node.js (Express).

Endpoints disponibles:

1) Generar reporte JSON desde CFDI
----------------------------------------------------
POST /api/cfdi/parse
Content-Type: application/json

Request:
{
  "xml": "<string XML CFDI 4.0>",
  "mapping": { ... }   // field mapping generado por la UI
}

Response (200):
- JSON con objetos anidados y arreglos
- El ORDEN del JSON respeta estrictamente el orden del mapping recibido
- El backend detecta automáticamente:
  - CFDI Ingreso / Egreso / Traslado
  - Complemento de Pagos 2.0
  - Complemento de Nómina 1.2
  - Timbre Fiscal Digital (UUID)

----------------------------------------------------

2) Descargar CSV del reporte
----------------------------------------------------
POST /api/cfdi/report/csv
Content-Type: application/json

Request:
{
  "xml": "<string XML CFDI 4.0>",
  "mapping": { ... }
}

Response (200):
Headers:
- Content-Type: text/csv
- Content-Disposition: attachment; filename="reporte.csv"

====================================================
REGLAS OBLIGATORIAS DEL FRONTEND
====================================================

- NO parsear XML
- NO interpretar CFDI ni reglas SAT
- NO transformar JSON a CSV
- NO aplanar estructuras complejas
- NO inferir columnas
- NO duplicar lógica del backend

El frontend:
- Solo construye el field mapping
- Solo envía XML + mapping (pueden ser muchos, debe tener drag and drop o chose multiple files)
- Solo renderiza el resultado
- Ordenar los campos para resultado
- Descarga el CSV directamente desde el backend

====================================================
CATÁLOGO DE CAMPOS CFDI (EXHAUSTIVO)
====================================================

La UI DEBE exponer un catálogo COMPLETO de campos posibles del CFDI 4.0,
agrupados y etiquetados de forma entendible para CONTADORES.

El usuario NO escribe XML ni paths técnicos.

----------------------------------------------------
1) COMPROBANTE (atributos)
----------------------------------------------------
- Serie
- Folio
- Fecha
- TipoDeComprobante
- Moneda
- TipoCambio
- SubTotal
- Descuento
- Total
- Exportacion
- MetodoPago
- FormaPago
- LugarExpedicion
- Confirmacion

----------------------------------------------------
2) EMISOR
----------------------------------------------------
- RFC Emisor
- Nombre Emisor
- Régimen Fiscal Emisor

----------------------------------------------------
3) RECEPTOR
----------------------------------------------------
- RFC Receptor
- Nombre Receptor
- Uso CFDI
- Régimen Fiscal Receptor
- Domicilio Fiscal Receptor

----------------------------------------------------
4) CONCEPTOS (ARRAY)
----------------------------------------------------
- Clave Producto/Servicio
- No. Identificación
- Cantidad
- Clave Unidad
- Unidad
- Descripción
- Valor Unitario
- Importe
- Descuento

Conceptos → Impuestos:
- Traslados
  - Base
  - Impuesto
  - TipoFactor
  - TasaOCuota
  - Importe
- Retenciones
  - Base
  - Impuesto
  - TipoFactor
  - TasaOCuota
  - Importe

----------------------------------------------------
5) IMPUESTOS (NIVEL COMPROBANTE)
----------------------------------------------------
- Total Impuestos Trasladados
- Total Impuestos Retenidos

Impuestos → Traslados:
- Impuesto
- TipoFactor
- TasaOCuota
- Importe

Impuestos → Retenciones:
- Impuesto
- Importe

----------------------------------------------------
6) TIMBRE FISCAL DIGITAL
----------------------------------------------------
- UUID
- Fecha de Timbrado
- RFC Proveedor Certificación
- Sello CFDI
- Sello SAT
- No. Certificado SAT

----------------------------------------------------
7) COMPLEMENTO DE PAGOS 2.0
----------------------------------------------------
Pagos (ARRAY):
- Fecha de Pago
- Forma de Pago
- Moneda de Pago
- Tipo Cambio Pago
- Monto

Pagos → Documentos Relacionados (ARRAY):
- UUID Documento Relacionado
- Serie
- Folio
- Moneda DR
- Método de Pago DR
- NumParcialidad
- ImpSaldoAnt
- ImpPagado
- ImpSaldoInsoluto

----------------------------------------------------
8) COMPLEMENTO DE NÓMINA 1.2
----------------------------------------------------
- Total Percepciones
- Total Deducciones
- Total Otros Pagos

Percepciones (ARRAY):
- Tipo
- Clave
- Concepto
- Importe Gravado
- Importe Exento

Deducciones (ARRAY):
- Tipo
- Clave
- Concepto
- Importe

Otros Pagos (ARRAY):
- Tipo
- Clave
- Concepto
- Importe

====================================================
REGLAS DE FIELD MAPPING (CRÍTICAS)
====================================================

- El field mapping ES ORDENADO.
- El ORDEN de los campos define:
  - El orden del JSON devuelto
  - El orden de las columnas del CSV

Flujo obligatorio de la UI:

1) Selección de campos CFDI
   - Checkbox / selector visual
   - Basado en el catálogo exhaustivo

2) Asignación de alias
   - Alias OBLIGATORIO
   - Editable
   - Es el nombre final de la columna

3) Ordenamiento de columnas
   - Drag & drop
   - El orden visual DEBE reflejarse en el mapping enviado al backend

El usuario:
- NO ve paths XML
- NO ve estructuras técnicas
- Solo trabaja con nombres contables

====================================================
FORMATO DEL FIELD MAPPING (ENVIADO AL BACKEND)
====================================================

- El frontend genera un mapping JSON:
  - Declarativo
  - Ordenado
  - Con soporte nested y arrays
- El mapping se envía EXACTAMENTE como se construye en la UI
- El backend depende del orden recibido (no reordena)

====================================================
ARQUITECTURA FRONTEND ESPERADA
====================================================

Framework: React (Vite / CRA / Next indistinto)

Separación clara:
- api/        → llamadas HTTP
- components/ → UI pura
- hooks/      → estado y efectos
- pages/      → vistas
- utils/      → helpers sin lógica CFDI

====================================================
FLUJO DE LA APLICACIÓN
====================================================

1) Cargar XML(s)
2) Seleccionar campos CFDI
3) Asignar alias
4) Ordenar columnas (drag & drop)
5) Generar reporte
6) Vista previa (JSON + tabla)
7) Descargar CSV

====================================================
ENTREGABLES ESPERADOS
====================================================

1) Estructura de carpetas frontend
2) Componentes:
   - XmlUploader
   - FieldCatalog
   - FieldSelector
   - AliasEditor
   - ColumnOrderManager
   - ReportTable
3) Servicio API para backend
4) Ejemplo de descarga CSV (blob)
5) Breve explicación de UX enfocada a contadores

Si algo no está explícito, asume la opción más simple, desacoplada y mantenible.
