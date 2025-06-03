import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DrinkAdminPanel from "../components/DrinkAdminPanel";

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <DrinkAdminPanel />
      <Footer />
    </>
  );
};

export default AdminPanel;