import { supabase } from './supabaseClient';

const table = 'testimonials';

const getAllTestimonials = async () => {
  const { data, error } = await supabase.from(table).select('*').order('id', { ascending: true });
  if (error) throw error;
  return data;
};

const insertTestimonial = async (testimonialData) => {
  const { data, error } = await supabase.from(table).insert([testimonialData]);
  if (error) throw error;
  return data;
};

const updateTestimonial = async (id, testimonialData) => {
  const { data, error } = await supabase
    .from(table)
    .update({ ...testimonialData, updated_at: new Date() })
    .eq('id', id);
  if (error) throw error;
  return data;
};

const deleteTestimonial = async (id) => {
  const { data, error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  return data;
};

const testimonialsAPI = {
  getAllTestimonials,
  insertTestimonial,
  updateTestimonial,
  deleteTestimonial,
};

export default testimonialsAPI;
