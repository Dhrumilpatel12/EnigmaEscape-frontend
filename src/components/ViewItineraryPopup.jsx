import React, { useState } from 'react';
import './ViewItineraryPopup.css';
import { FaMapMarkerAlt, FaCamera, FaHiking, FaHotel, FaThumbsUp } from 'react-icons/fa';

const ViewItineraryPopup = ({ itinerary, handleClose }) => {
  const [showThankYou, setShowThankYou] = useState(false);

  const handleContinue = () => {
    setShowThankYou(true);
    setTimeout(() => {
      handleClose();
    }, 3000); 
  };

  return (
    <div className="view-itinerary-popup">
      <div className="view-itinerary-content">
        <h2 className="itinerary-title">
          <FaMapMarkerAlt /> {itinerary.city} Itinerary
        </h2>
        <div className="itinerary-details">
          <div className="itinerary-section">
            <h3>
              <FaCamera /> Attractions
            </h3>
            <ul>
              {itinerary.attractions.split(', ').map((attraction, index) => (
                <li key={index}>{attraction}</li>
              ))}
            </ul>
          </div>
          <div className="itinerary-section">
            <h3>
              <FaHiking /> Activities
            </h3>
            <ul>
              {itinerary.activities.split(', ').map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          </div>
          <div className="itinerary-section">
            <h3>
              <FaHotel /> Hotels
            </h3>
            <ul>
              {itinerary.hotels.split(', ').map((hotel, index) => (
                <li key={index}>{hotel}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="button-container">
          {showThankYou ? (
            <div className="thank-you-animation">
              <FaThumbsUp className="thank-you-icon" />
              <p>Thank you for choosing us!</p>
            </div>
          ) : (
            <>
              <button onClick={handleContinue} className="continue-button">
                Continue
              </button>
              <button onClick={handleClose} className="close-button">
               X
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewItineraryPopup;