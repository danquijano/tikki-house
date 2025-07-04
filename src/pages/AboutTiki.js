
import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TestimonialsSlider from "../components/TestimonialsSlider";
import AboutService from "../components/AboutService";



const AboutTiki = () => {
  return (
    <>
      <Navbar />
      <TestimonialsSlider />
      <AboutService />
      <Footer />
    </>
  );
};

export default AboutTiki;