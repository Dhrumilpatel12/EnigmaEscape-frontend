import React from "react";
import Destination from "../components/Destination";

import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Trip from "../components/Trip";
function Home() {
  // Define the props for the Hero component
  const heroProps = {
    heading: "Discover Your Next Adventure",
    subheading: "Explore the world with us and create unforgettable memories.",
    ctaText: "View Destinations",
    ctaLink: "/service" // Make sure this route is defined in your routing setup
  };

  return (
    <div style={{overflowY:"auto"}}> 
      <Navbar />
      <Hero
        heading={heroProps.heading}
        subheading={heroProps.subheading}
        ctaText={heroProps.ctaText}
        ctaLink={heroProps.ctaLink}
      />
      <Destination />
      <Trip />
      <Footer />
    </div>
  );
}

export default Home;
