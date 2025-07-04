
import React from "react";
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";
import ServicesSection from "../components/ServicesSection";
import Footer from "../components/Footer";
import AboutUs from "./AboutUs";
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutUs />
      <ServicesSection />
      <Footer />
    </>
  );
};

export default Home;
