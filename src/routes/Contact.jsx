import React from 'react';
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutImg from "../assets/2.jpg"; // Ensure the path is correct
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";

function Contact() {
  // Define the content for the Hero component on the Contact page
  const heroContent = {
    heading: "Contact Us",
    subheading: "We're here to help and answer any question you might have. We look forward to hearing from you.",
    // ctaText: "View FAQ",
    // ctaLink: "/faq"
  };

  return (
    <>
      <Navbar />
     
      <Hero
        backgroundImage={AboutImg} // Prop name corrected to `backgroundImage`
        heading={heroContent.heading}
        subheading={heroContent.subheading}
        // ctaText={heroContent.ctaText}
        // ctaLink={heroContent.ctaLink}
      />
      <ContactForm />
      <Footer />
    </>
  );
}

export default Contact;
