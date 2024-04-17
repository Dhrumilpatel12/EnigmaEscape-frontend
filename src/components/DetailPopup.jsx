import React, { useState, useEffect } from 'react';
import './DetailPopup.css';

const DetailPopup = ({ item, onClose, itemType }) => {
  const [itemDetails, setItemDetails] = useState(null);
  const googleAPI = 'AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso';

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        const response = await fetch(`http://localhost:1234/${itemType}/${itemType}s/${item._id}`);
        const data = await response.json();
        setItemDetails(data);
      } catch (error) {
        console.error(`Error fetching ${itemType} details:`, error);
      }
    };

    if (item && item._id) {
      fetchItemDetails();
    }
  }, [item, itemType]);

  if (!itemDetails) {
    return null;
  }

  const { name, photos, rating, formatted_address, user_ratings_total } = itemDetails;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h3 className="popup-title">{name}</h3>
        {photos && photos.length > 0 && (
          <div className="popup-image-container">
            <img
              src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photos[0]}&key=${googleAPI}`}
              alt={name}
              className="popup-image"
              height="300px"
              width="300px"            />
          </div>
        )}
        <div className="popup-details">
          <p className="popup-detail">
            <span className="detail-label">Rating:</span> {rating}
          </p>
          <p className="popup-detail">
            <span className="detail-label">Address:</span> {formatted_address || 'N/A'}
          </p>
          {user_ratings_total && (
            <p className="popup-detail">
              <span className="detail-label">Total Ratings:</span> {user_ratings_total}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPopup;