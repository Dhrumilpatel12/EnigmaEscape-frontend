import React, { useState } from 'react';
import './HotelsView.css';
import DetailPopup from './DetailPopup';

const HotelsView = ({ hotels }) => {
  const googleAPI = "AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso";
  const [currentPage, setCurrentPage] = useState(1);
  const [showPopup, setShowPopup] = useState(false); // Define showPopup state
  const [selectedItem, setSelectedItem] = useState(null); // Define selectedItem state
  const itemsPerPage = 9; // Number of items to display per page

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(hotels) ? hotels.slice(indexOfFirstItem, indexOfLastItem) : [];

  const totalPages = Math.ceil((Array.isArray(hotels) ? hotels.length : 0) / itemsPerPage);

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
    <div className="hotels-container">
      {/* <h2>Hotels</h2> */}
      {Array.isArray(hotels) && hotels.length > 0 ? (
        <>
          <div className="hotels-grid">
            {currentItems.map((hotel) => (
              <div key={hotel._id} className="hotel-card">
                <h3>{hotel.name}</h3>
                {hotel.photos && hotel.photos.length > 0 && (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${hotel.photos[0]}&key=${googleAPI}`}
                    alt={hotel.name}
                    className="hotel-image"
                    onClick={() => handleImageClick(hotel)} // Add this line
                  />
                )}
                {/* Add more details about the hotel */}
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
          </div>     </div>
        </>
      ) : (
        <p>No hotels found.</p>
      )}
      {showPopup && selectedItem && <DetailPopup item={selectedItem} onClose={handleClosePopup} itemType="hotels" />}
    </div>
  );
};

export default HotelsView;
