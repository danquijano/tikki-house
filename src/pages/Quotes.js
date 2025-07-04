import React, { useState } from "react";
import { generatePdfFromTemplate } from "../components/generatePdfFromTemplate.js";
import { uploadPdfToSupabase } from "../components/uploadPdfToSupabase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import DrinkMenu from "../components/DrinkMenu";
import DrinkPackages from "../components/DrinkPackages";
import JungleVibes from "../components/JungleVibes";
import QuoteForm from "../components/QuoteForm";
import SectionHeader from "../components/SectionHeader";
import HeroCarousel from "../components/HeroCarousel";
import Stepper from "../components/Stepper";
import AlertModal from "../components/AlertModal";
import quotesAPI from "../data/quotesAPI.js";

const Quotes = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedRegalia, setSelectedRegalia] = useState(null);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("info");

  const showAlert = (message, type = "info") => {
    setAlertMessage(message);
    setAlertType(type);
  };

  const closeAlert = () => {
    setAlertMessage("");
  };

  const handleSelectItem = (item) => {
    const exists = selectedItems.find((i) => i.id === item.id);
    if (exists) {
      setSelectedItems((prev) =>
        prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const getCurrentStep = () => {
    if (!selectedPackage) return 1;
    if (selectedItems.length === 0) return 2;
    if (!selectedRegalia) return 3;
    return 4;
  };

  const handleSelectPackage = (pkg) => {
    setSelectedPackage(pkg);
    setSelectedItems([]); // resetea bebidas si se cambia el paquete
    setSelectedRegalia(null); // también resetea la regalía
  };

  const handleSelectRegalia = (regalia) => {
    setSelectedRegalia(regalia);
  };

  const handleRemoveItem = (itemId) => {
    setSelectedItems(selectedItems.filter(item => item.id !== itemId));
  };

  const handleRemovePackage = () => {
    setSelectedPackage(null);
    setSelectedItems([]);
    setSelectedRegalia(null);
  };

  const handleRemoveRegalia = () => {
    setSelectedRegalia(null);
  };

  const handleSubmitQuote = async (order, total) => {
    try {
    
      const blob = await generatePdfFromTemplate(order, total);
   
      const filename = `cotizaciones/${order.name.replace(/\s+/g, "_")}_${Date.now()}.pdf`;
     
      const pdfUrl = await uploadPdfToSupabase(blob, filename);
      
      const quoteData = {
      client_name: order.name,
      phone_number: order.phone,
      event_date: order.eventDate,
      event_time: order.eventTime,
      location_text: order.address,
      is_custom: null,
      package_id: order.selectedPackage?.id || null,
      uses_client_supplies: null,
      staff_required: order.staffRequired ? parseInt(order.staffRequired) : null,
      event_hours: order.hours ? parseInt(order.hours) : null,
      total_price: total|| null,
      confirmation_status: false,
      pdf_link: pdfUrl,
      created_at: new Date().toISOString(),
    };
 
      const insertedQuote = await quotesAPI.insertQuote(quoteData);//mejorar la captura de errores

      const phoneNumber = "50660938130";
      const message = `¡Hola! Te comparto la cotización del evento:\n${pdfUrl}`;
      window.location.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    } catch (error) {
      console.error("Error al generar o subir el PDF:", error);
      showAlert("Ocurrió un error al generar o subir la cotización. Intenta nuevamente.", "error");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        <HeroCarousel />
        <Stepper currentStep={getCurrentStep()} />
        <section className="pb-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Paquetes TIKI"
              subtitle="Incluye licores, tickets de cocteles, cristalería, bartenders, saloneros e insumos necesarios para preparar las bebidas."
            />
            <DrinkPackages
              onSelectPackage={handleSelectPackage}
              selectedPackage={selectedPackage}
            />
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Carta de bebidas"
              subtitle="Elegí los sabores de cocteles según el paquete que seleccionaste"
            />
            <DrinkMenu
              onSelectItem={handleSelectItem}
              selectedItems={selectedItems}
              maxFlavors={selectedPackage?.max_flavors || 0}
            />
          </div>
        </section>

        <section className="py-12 bg-gray-100">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="Regalía Jungle Vibes"
              subtitle="Elegí un tipo de las Bebidas Jungle Vibes para tu regalía"
            />
            <JungleVibes
              onSelectRegalia={handleSelectRegalia}
              selectedRegalia={selectedRegalia}
            />
          </div>
        </section>

        <section id="quote-section" className="py-12">
          <div className="container mx-auto px-4 max-w-2xl">
            <SectionHeader
              title="Completa tu Pedido"
              subtitle="Déjanos tus datos para finalizar la cotización"
            />
            <QuoteForm
              selectedItems={selectedItems}
              selectedPackage={selectedPackage}
              selectedRegalia={selectedRegalia}
              onRemoveItem={handleRemoveItem}
              onRemovePackage={handleRemovePackage}
              onRemoveRegalia={handleRemoveRegalia}
              onSubmit={handleSubmitQuote}
              showAlert={showAlert} // Por si deseas pasar el modal a QuoteForm también
            />
          </div>
        </section>
      </main>
      <Footer />

      {alertMessage && (
        <AlertModal
          message={alertMessage}
          type={alertType}
          onClose={closeAlert}
        />
      )}
    </div>
  );
};

export default Quotes;