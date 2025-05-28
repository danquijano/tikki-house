import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DrinkMenu from "../components/DrinkMenu";
import DrinkPackages from "../components/DrinkPackages";
import QuoteForm from "../components/QuoteForm";
import SectionHeader from "../components/SectionHeader";
import HeroCarousel from "../components/HeroCarousel";

const Quotes = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);

  const handleSelectItem = (item) => {
    const exists = selectedItems.find((i) => i.name === item.name);
    if (exists) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.name === item.name ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleSelectPackage = (pkg) => {
    const exists = selectedPackages.find((p) => p.name === pkg.name);
    if (!exists) setSelectedPackages([...selectedPackages, pkg]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <main className="flex-grow">
        <HeroCarousel />

        <section className="pb-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <SectionHeader title="Paquetes Especiales" subtitle="Ahorra con nuestras combinaciones populares" />
            <DrinkPackages onSelectPackage={handleSelectPackage} />
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <SectionHeader title="Bebidas Disponibles" subtitle="Selecciona las bebidas para tu evento" />
            <DrinkMenu onSelectItem={handleSelectItem} />
          </div>
        </section>

        <section id="quote-section" className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <SectionHeader title="Completa tu Pedido" subtitle="Déjanos tus datos para finalizar la cotización" />
            <QuoteForm selectedItems={selectedItems} selectedPackages={selectedPackages} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Quotes;
