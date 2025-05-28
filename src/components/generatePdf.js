import jsPDF from "jspdf";

export const generatePdf = (data, total) => {
  const doc = new jsPDF();
  let y = 10;

  doc.setFontSize(16);
  doc.text("Resumen de Cotización", 10, y);
  y += 10;

  doc.setFontSize(12);
  const lines = [
    `Nombre: ${data.name}`,
    `Email: ${data.email}`,
    `Teléfono: ${data.phone}`,
    `Dirección: ${data.address}`,
    `Fecha: ${data.eventDate} | Hora: ${data.eventTime}`,
    `Duración: ${data.hours} horas`,
    data.staffRequired ? `Personal requerido: ${data.staffRequired}` : null,
    data.eventDescription ? `Descripción: ${data.eventDescription}` : null,
  ].filter(Boolean);

  lines.forEach(line => {
    doc.text(line, 10, y);
    y += 8;
  });

  if (data.selectedPackages.length > 0) {
    doc.text("Paquetes:", 10, y);
    y += 6;
    data.selectedPackages.forEach(pkg => {
      doc.text(`- ${pkg.name} - $${pkg.price}`, 12, y);
      y += 6;
      pkg.includes.forEach(item => {
        doc.text(`  • ${item}`, 14, y);
        y += 6;
      });
    });
  }

  if (data.selectedItems.length > 0) {
    doc.text("Bebidas:", 10, y);
    y += 6;
    data.selectedItems.forEach(item => {
      doc.text(`- ${item.name} x${item.quantity} - $${item.price * item.quantity}`, 12, y);
      y += 6;
    });
  }

  doc.text(`Total: $${total}`, 10, y + 8);

  return doc.output("blob");
};
