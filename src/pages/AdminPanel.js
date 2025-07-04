import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AdminSelectorPanel from "../components/AdminSelectorPanel";
import DrinkAdminPanel from "../components/DrinkAdminPanel";
import PackageAdminPanel from "../components/PackageAdminPanel";
import QuoteAdminPanel from "../components/QuoteAdminPanel";
import TestimonialsAdminPanel from "../components/TestimonialsAdminPanel";

const AdminPanel = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<AdminSelectorPanel />} />
          <Route path="drinks" element={<DrinkAdminPanel />} />
          <Route path="packages" element={<PackageAdminPanel />} />
            <Route path="clients" element={<QuoteAdminPanel />} />
            <Route path="testimonials" element={<TestimonialsAdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
};

export default AdminPanel;