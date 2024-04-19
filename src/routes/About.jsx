import React from 'react';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutImg from "../assets/night.jpg"; // Make sure this path is correct
import Footer from "../components/Footer";
import AboutUs from "../components/AboutUs";

function About() {
  // Define the content you want to display in the Hero component on the About page
  const heroContent = {
    heading: "About Us",
    subheading: "Learn more about our journey and values.",
    ctaText: "Discover More",
    ctaLink: "/service" 
  };

  return (
    <>
      <Navbar />
     
      <Hero
        backgroundImage={AboutImg} // Assuming the Hero component is updated to use backgroundImage prop
        heading={heroContent.heading}
        subheading={heroContent.subheading}
        ctaText={heroContent.ctaText}
        ctaLink={heroContent.ctaLink}
      />
      <AboutUs />
      <Footer />
    </>
  );
}

export default About;
