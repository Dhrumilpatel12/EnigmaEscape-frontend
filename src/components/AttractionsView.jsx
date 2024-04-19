import React, { useState } from 'react';
import './AttractionsView.css';
import DetailPopup from './DetailPopup';

const AttractionsView = ({ attractions }) => {
  const googleAPI = 'AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso'; // Replace with your actual Google Maps API key
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to display per page
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  // Ensure attractions is always defined before using slice
  const currentItems = Array.isArray(attractions) ? attractions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) : [];

  const totalPages = Math.ceil((attractions?.length || 0) / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage === 1 ? prevPage : prevPage - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage === totalPages ? prevPage : prevPage + 1));
  };

  const handleImageClick = item => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  return (
    <div className="attractions-container">
      {/* <h2>Attractions</h2> */}
      {attractions.length > 0 ? (
        <>
          <div className="attractions-grid">
            {currentItems.map(attraction => (
              <div key={attraction._id} className="attraction-card">
                <h3>{attraction.name}</h3>
                {attraction.photos && attraction.photos.length > 0 && (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${attraction.photos[0]}&key=${googleAPI}`}
                    alt={attraction.name}
                    className="attraction-image"
                    onClick={() => handleImageClick(attraction)}
                  />
                )}
                {/* Add more details about the attraction */}
              </div>
            ))}
        
          <div className="pagination">
            <button className="pagination-button" onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span className="page-info">
              Page {currentPage} of {totalPages}
            </span>
            <button className="pagination-button" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>  </div>
        </>
      ) : (
        <p>No attractions found.</p>
      )}
      {showPopup && selectedItem && (
  <DetailPopup item={selectedItem} onClose={handleClosePopup} itemType="attraction" />
)}

    </div>
  );
};

export default AttractionsView;
