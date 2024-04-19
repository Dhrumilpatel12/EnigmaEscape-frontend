import React from 'react';
import './AboutUsStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlaneDeparture, faGlobeAmericas, faMapMarkedAlt } from '@fortawesome/free-solid-svg-icons';

function AboutUs() {
  return (
    <div className="about-container">
      <section className="company-description">
        <FontAwesomeIcon icon={faGlobeAmericas} className="icon-animation"/>
        <h2>About Us</h2>
        <p>Welcome to Enigma Escapes, your number one source for all things travel. We're dedicated to providing you the very best travel experiences, with an emphasis on reliability, customer service, and uniqueness.</p>
      </section>
      
      <section className="mission-statement">
        <FontAwesomeIcon icon={faPlaneDeparture} className="icon-animation"/>
        <h2>Our Mission</h2>
        <p>Founded in 2024 by Dhrumil Patel, Dheemahi Joshi, Roshni Panth, Enigma Escapes has come a long way from its beginnings. We now serve customers all over the world, and are thrilled that we're able to turn our passion into our own website.</p>
      </section>
      
      <section className="our-team">
        <FontAwesomeIcon icon={faMapMarkedAlt} className="icon-animation"/>
        <h2>Our Team:</h2>
        <ul>
          <li>Dheemahi Joshi</li>
          <li>Dhrumil Patel</li>
          <li>Roshni Panth</li>
        </ul>
        <div className="team-member">
          <h3>Enigma Escapes</h3>
          <p>Decode the Unforgettable Journey</p>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;
