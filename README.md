# REQUEST
POST /api/cfdi/parse
Content-Type: application/json

{
  "xml": "<cfdi:Comprobante ...>...</cfdi:Comprobante>",
  "fields": [
    {
      "path": "Comprobante.@Serie",
      "alias": "serie"
    },
    {
      "path": "Comprobante.@Folio",
      "alias": "folio"
    },
    {
      "path": "Comprobante.Emisor.@Rfc",
      "alias": "rfc_emisor"
    },
    {
      "path": "Comprobante.Receptor.@Nombre",
      "alias": "nombre_receptor"
    },
    {
      "path": "Comprobante.@Total",
      "alias": "total",
      "type": "number"
    }
  ]
}

# RESPONSE

Ejemplo:
{
  "serie": "A",
  "folio": "12345",
  "rfc_emisor": "AAA010101AAA",
  "nombre_receptor": "PUBLICO EN GENERAL",
  "total": 1234.56
}
