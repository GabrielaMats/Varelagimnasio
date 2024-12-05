import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";

// Estilos para el PDF
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  section: {
    marginBottom: 10,
    padding: 10,
    borderBottom: "1px solid #ddd",
  },
  table: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 10,
  },
  tableHeader: {
    fontWeight: "bold",
    fontSize: 12,
    padding: 5,
    flex: 2, 
    textAlign: "left",
    borderBottom: "1px solid #000",
  },
  tableRow: {
    fontSize: 12,
    padding: 5,
    flex: 2, 
    textAlign: "left",
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    padding: 5,
    textAlign: "left",
  },
  footer: {
    textAlign: "right",
    marginTop: 20,
    fontSize: 12,
    fontWeight: "bold",
  },
});


const InvoicePDF = ({ factura, detalles }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      
      <Text style={styles.header}>Factura - Varela Gimnasio</Text>

      
      <View style={styles.section}>
        <Text>Factura ID: {factura.id}</Text>
        <Text>Cliente: {factura.cliente_nombre || "N/A"}</Text>
        <Text>
          Fecha:{" "}
          {factura.fecha_emision || "Fecha no disponible"}
        </Text>
        <Text>Total: ${Number(factura.total).toFixed(2)}</Text>
      </View>

      
      <View style={styles.section}>
        <View style={styles.table}>
          <Text style={styles.tableRow}>Producto</Text>
          <Text style={styles.tableCell}>Cantidad</Text>
          <Text style={styles.tableCell}>Precio Unitario</Text>
          <Text style={styles.tableCell}>Subtotal</Text>
        </View>
        {detalles.map((detalle, index) => (
          <View key={index} style={styles.table}>
            <Text style={styles.tableRow}>{detalle.producto_nombre || "N/A"}</Text>
            <Text style={styles.tableCell}>{detalle.cantidad}</Text>
            <Text style={styles.tableCell}>
              ${Number(detalle.precio_unitario).toFixed(2)}
            </Text>
            <Text style={styles.tableCell}>
              ${Number(detalle.subtotal).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Total al final */}
      <Text style={styles.footer}>Total: ${Number(factura.total).toFixed(2)}</Text>
    </Page>
  </Document>
);

export default InvoicePDF;

