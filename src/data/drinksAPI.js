// src/data/drinksAPI.js
import { supabase } from "./supabaseClient";

const tableName = 'drink';

const getAllDrinks = async () => {
  const { data, error } = await supabase.from(tableName).select('*');
  if (error) throw error;
  return data;
};

const insertDrink = async (drinkData) => {
  const { data, error } = await supabase.from(tableName).insert([drinkData]);
  if (error) throw error;
  return data;
};

const updateDrink = async (id, drinkData) => {
  const { data, error } = await supabase.from(tableName).update(drinkData).eq('drink_id', id);
  if (error) throw error;
  return data;
};

const deleteDrink = async (id) => {
  const { data, error } = await supabase.from(tableName).delete().eq('drink_id', id);
  if (error) throw error;
  return data;
};

const drinksAPI = {
  getAllDrinks,
  insertDrink,
  updateDrink,
  deleteDrink,
};

export default drinksAPI;