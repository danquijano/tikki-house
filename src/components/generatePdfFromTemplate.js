import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { supabase } from "../data/supabaseClient";

export const generatePdfFromTemplate = async (data) => {
  const { data: plantilla } = supabase
    .storage
    .from("templates")
    .getPublicUrl("PlantillaCotizacion.pdf");

  const templateUrl = plantilla?.publicUrl;
  if (!templateUrl) throw new Error("No se pudo obtener la URL de la plantilla.");

  const existingPdfBytes = await fetch(templateUrl).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);
  const page = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontSize = 14;
  const lineHeight = fontSize + 2;
  const textColor = rgb(0, 0, 0);

  // Función para escribir texto con salto de línea dentro de un área (en puntos)
  const drawWrappedText = (text, x, y, maxWidth, maxHeight, options = {}) => {
    if (!text) return;
    const words = String(text).split(' ');
    const lines = [];
    let line = "";

    for (const word of words) {
      const testLine = line + word + " ";
      const testWidth = font.widthOfTextAtSize(testLine, fontSize);
      if (testWidth > maxWidth) {
        lines.push(line.trim());
        line = word + " ";
      } else {
        line = testLine;
      }
    }
    if (line) lines.push(line.trim());

    const maxLines = Math.floor(maxHeight / lineHeight);
    const startY = page.getHeight() - y;
    for (let i = 0; i < Math.min(lines.length, maxLines); i++) {
      page.drawText(lines[i], {
        x,
        y: startY - i * lineHeight,
        size: fontSize,
        font,
        color: options.color || textColor,
        ...options
      });
    }
  };

  // === Tus coordenadas EXACTAS, con áreas en puntos ===
  drawWrappedText(data.name, 169.25, 341.72, 347, 20);           // Nombre (12.25cm x 0.7cm)
  drawWrappedText(data.email, 80.63, 405.50, 347, 20);           // Email
  drawWrappedText(data.phone, 100.39, 467.95, 347, 20);          // Teléfono

  drawWrappedText(`${data.hours} hrs`, 113.39, 519.89, 276, 20);        // Duración
  drawWrappedText(data.staffRequired || "0", 560.83, 519.89, 255, 20);  // Personal

  drawWrappedText(data.eventDate, 601.36, 344.72, 198, 21);   // Fecha
  drawWrappedText(data.eventTime, 601.36, 451.02, 198, 21);   // Hora

  drawWrappedText(data.address || "", 35.43, 642.37, 184, 206);          // Dirección
  drawWrappedText(data.eventDescription || "", 233.86, 642.37, 184, 206); // Descripción
  drawWrappedText(data.selectedPackage?.name || "", 425.20, 642.37, 184, 206); // Paquete

  if (data.selectedItems?.length) {
    const bebidas = data.selectedItems.map(i => `${i.name} x${i.quantity}`).join(', ');
    drawWrappedText(bebidas, 623.62, 642.37, 184, 206); // Bebidas
  }

  drawWrappedText(data.selectedRegalia?.name || "", 623.62, 868.63, 184, 28, {
    color: rgb(0.96, 0.66, 0)
  });

  const pdfBytes = await pdfDoc.save();
  return new Blob([pdfBytes], { type: 'application/pdf' });
};
