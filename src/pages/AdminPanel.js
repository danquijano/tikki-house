import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DrinkAdminPanel from "../components/DrinkAdminPanel";

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-100 py-10 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Panel de Administración de Bebidas</h1>
        <DrinkAdminPanel />
      </main>
      <Footer />
    </>
  );
};

export default AdminPanel;