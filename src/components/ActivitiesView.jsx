import React, { useState } from 'react';
import './ActivitiesView.css';
import DetailPopup from './DetailPopup';

const ActivitiesView = ({ activities }) => {
  const googleAPI = "AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [selectedItem, setSelectedItem] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = activities.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(activities.length / itemsPerPage);

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
    <div className="activities-container">
      {activities.length > 0 ? (
        <>
          <div className="activities-grid">
            {currentItems.map(activity => (
              <div key={activity.id} className="activity-card">
                <h3>{activity.name}</h3>
                {activity.photos && activity.photos.length > 0 && (
                  <img
                    src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${activity.photos[0]}&key=${googleAPI}`}
                    alt={activity.name}
                    className="activity-image"
                    onClick={() => handleImageClick(activity)} // Add this line
                  />
                )}
                {/* Add more details about the activity */}
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
          </div></div>
        </>
      ) : (
        <p>No activities found.</p>
      )}
      {showPopup && <DetailPopup item={selectedItem} onClose={handleClosePopup} itemType="activity" />}
    </div>
  );
};

export default ActivitiesView;
