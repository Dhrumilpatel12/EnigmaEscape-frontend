import React, { useState } from 'react';
import "./HeroStyles.css";
import { FaRegBookmark } from 'react-icons/fa';
import CreateItineraryPopup from './CreateItineraryPopup'; // Import the popup component
import { FaPlusCircle } from 'react-icons/fa';
function Hero({ heading, subheading, ctaText, ctaLink }) {
  const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility

  // Function to toggle popup visibility
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <div className="hero1">
    <button className="create-itinerary-btn" onClick={togglePopup}>
      <span className="btn-icon">
        <FaPlusCircle />
      </span>
      <span className="btn-text">Create Your Own Itinerary</span>
    </button>
    {showPopup && <CreateItineraryPopup handleClose={togglePopup} />}
  </div>
  );
}

export default Hero;
