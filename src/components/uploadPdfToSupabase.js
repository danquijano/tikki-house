import { supabase } from "../data/supabaseClient";

export const uploadPdfToSupabase = async (pdfBlob, filePath) => {
  const { error } = await supabase.storage
    .from("pdfs") 
    .upload(filePath, pdfBlob, {
      contentType: "application/pdf",
      upsert: true,
    });

  if (error) {
    console.error("Error al subir a Supabase:", error);
    throw error;
  }

  const { data: urlData } = supabase
    .storage
    .from("pdfs")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};
