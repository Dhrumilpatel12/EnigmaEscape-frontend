import React from 'react';
import "./HeroStyles.css";
import backgroundImage from '../assets/night.jpg'

function Hero({  heading, subheading, ctaText, ctaLink }) {
  return (
    
    <div className="hero" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="hero-content">
        <h1>{heading}</h1>
        <p>{subheading}</p>
        <a href={ctaLink} className="hero-btn">{ctaText}</a>
      </div>
    </div>
  );
}

export default Hero;
