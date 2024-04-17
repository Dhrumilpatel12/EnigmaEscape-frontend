import React from 'react';
import "./TripStyles.css";
import { Link } from 'react-router-dom';

function TripData({ name, description, image }) {
  const googleAPI = "AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso";
  return (
    <Link to="/service"> 
    <div className="trip-card">
      <img
        alt="photo"
        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=800&photoreference=${image[0]}&key=${googleAPI}`}
        width={300}
        height={300}
        loading="lazy"
        className="trip-image"
      />
      <div className="trip-info">
        <h2 className="trip-name">{name}</h2>
        <p className="trip-description">{description}</p>
      </div>
    </div>
  </Link>
  );
}

export default TripData;
