import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TripData from './TripData'; // Assuming TripData component renders each attraction
import './TripStyles.css';

function Trip() {
  const [attractions, setAttractions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get('http://localhost:1234/Attraction');
        const attractionsData = response.data.data; 
      
        console.log("images",response);
        if (Array.isArray(attractionsData)) {
          // Sort attractions by user ratings in descending order
          attractionsData.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

          // Take the top 5 attractions with highest user ratings
          const topAttractions = attractionsData.slice(0, 5);
          console.log("topAttractions",topAttractions);
          setAttractions(topAttractions);
          setError(null);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error('Error fetching attractions:', error);
        setError('Error fetching attractions. Please try again later.');
      }
    };

    fetchAttractions();
  }, []);

  return (
    <div className="trip-container">
      <h1>Our Exciting Trips</h1>
      <div className="trip-cards">
        <div className="trip-card-container">
          {attractions.map((attraction) => {
            console.log("Attraction:", attraction); // Log individual attraction
            console.log("Image URL:", attraction.photos[0]); // Log image URL
            return (
              <TripData
                key={attraction.id}
                name={attraction.name}
                description={attraction.description}
                image={attraction.photos} // Pass in the first image URL in the array
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Trip;