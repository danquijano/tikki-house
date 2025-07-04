import { supabase } from './supabaseClient';

const quotesAPI = {
  insertQuote: async (quoteData) => {
    const { data, error } = await supabase
      .from('quote')
      .insert([quoteData])
      .select();

    if (error) {
      throw error;
    }

    return data[0];
  },

  getAllQuotes: async () => {
    const { data, error } = await supabase
      .from('quote')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    return data;
  },

  deleteQuote: async (id) => {
    const { error } = await supabase
      .from('quote')
      .delete()
      .eq('quote_id', id);

    if (error) {
      throw error;
    }
  },

  confirmQuote: async (id) => {
    const { error } = await supabase
      .from('quote')
      .update({ confirmation_status: true })
      .eq('quote_id', id);

    if (error) {
      throw error;
    }
  }
};

export default quotesAPI;
