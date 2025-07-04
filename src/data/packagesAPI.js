// src/data/packagesAPI.js
import { supabase } from './supabaseClient'; // Ajusta el path según tu estructura

const tableName = 'package';

// Obtener todos los paquetes
const getAllPackages = async () => {
  const { data, error } = await supabase
    .from(tableName) // Usa tableName ("package")
    .select('*')
    .order('price', { ascending: false }); // Ordena por precio descendente
  if (error) throw error;
  return data;
};

// Insertar un nuevo paquete
const insertPackage = async (packageData) => {
  // No incluir package_id, DB lo asigna automáticamente
  const { data, error } = await supabase.from('package').insert([packageData]);
  if (error) throw error;
  return data;
};

// Actualizar un paquete por ID
const updatePackage = async (id, packageData) => {
  const { data, error } = await supabase
    .from(tableName)
    .update(packageData)
    .eq('package_id', id);
  if (error) throw error;
  return data;
};

// Eliminar un paquete por ID
const deletePackage = async (id) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq('package_id', id);
  if (error) throw error;
  return data;
};

const packagesAPI = {
  getAllPackages,
  insertPackage,
  updatePackage,
  deletePackage,
};

export default packagesAPI;