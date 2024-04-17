import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./CreateItineraryPopup.css";

function CreateItineraryPopup({ handleClose, editingItinerary, handleUpdate }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(editingItinerary ? editingItinerary.city : "");
  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState(editingItinerary ? editingItinerary.attractions : []);
  const [selectedActivities, setSelectedActivities] = useState(editingItinerary ? editingItinerary.activities : []);
  const [selectedHotels, setSelectedHotels] = useState(editingItinerary ? editingItinerary.hotels : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCityData = async (city) => {
    setLoading(true);
    try {
      const attractionsResponse = await axios.get(`http://localhost:1234/itinerary/attractions?city=${city}`);
      const activitiesResponse = await axios.get(`http://localhost:1234/itinerary/activities?city=${city}`);
      const hotelsResponse = await axios.get(`http://localhost:1234/itinerary/hotels?city=${city}`);
  
      setAttractions(attractionsResponse.data);
      setActivities(activitiesResponse.data);
      setHotels(hotelsResponse.data);
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching city data:', error);
      setError('Error fetching city data. Please try again later.');
      setLoading(false);
    }
  };
  

  useEffect(() => {
    const fetchCities = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:1234/Activity/cities');
        setCities(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cities:', error);
        setError('Error fetching cities. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchCities();
  }, []);

  useEffect(() => {
    if (editingItinerary) {
      fetchCityData(editingItinerary.city);
    }
  }, [editingItinerary]);

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setSelectedCity(selectedCity);
    fetchCityData(selectedCity);
  };

  const handleAttractionChange = (e, value) => {
    const isChecked = e.target.checked;
  
    setSelectedAttractions(prevState => {
      if (isChecked) {
        return [...prevState, value];
      } else {
        return prevState.filter(attraction => attraction !== value);
      }
    });
  };

  const handleActivityChange = (e, value) => {
    const isChecked = e.target.checked;
  
    setSelectedActivities(prevState => {
      if (isChecked) {
        return [...prevState, value];
      } else {
        return prevState.filter(activity => activity !== value);
      }
    });
  };

  const handleHotelChange = (e, value) => {
    const isChecked = e.target.checked;
  
    setSelectedHotels(prevState => {
      if (isChecked) {
        return [...prevState, value];
      } else {
        return prevState.filter(hotel => hotel !== value);
      }
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const itineraryData = {
    // Pass the user ID here
      city: selectedCity,
      attractions: selectedAttractions,
      activities: selectedActivities,
      hotels: selectedHotels,
    };

    if (editingItinerary) {
      // Update existing itinerary
      await axios.put(`http://localhost:1234/itinerary/${editingItinerary.id}`, itineraryData);
      handleUpdate(itineraryData);
    } else {
      // Create new itinerary
      const response = await axios.post('http://localhost:1234/itinerary', itineraryData);
      console.log('Itinerary saved:', response.data);
    }

    // Reset selected options
    setSelectedAttractions([]);
    setSelectedActivities([]);
    setSelectedHotels([]);

    // Close the popup after successful submission
    handleClose();
  } catch (err) {
    console.error('Error saving itinerary:', err);
    // Display an error message or perform any other error handling
  }
};



  return (
    <div className="create-itinerary-popup">
      <div className="create-itinerary-content">
        <h2>{editingItinerary ? 'Edit Itinerary' : 'Create Your Own Itinerary'}</h2>
        <div className="dropdown-container">
          <label htmlFor="citySelect">Select a City:</label>
          <select id="citySelect" value={selectedCity} onChange={handleCityChange} className="city-select">
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        <div className="dropdown-select">
  <div className="dropdown-options">
    {attractions.map((attraction) => (
      <div key={attraction.name} className="checkbox-option">
        <input
          type="checkbox"
          id={attraction.name}
          value={attraction.name}
          checked={selectedAttractions.includes(attraction.name)}
          onChange={(e) => handleAttractionChange(e, e.target.value)}
        />
        <label htmlFor={attraction.name}>{attraction.name}</label>
      </div>
    ))}
  </div>
</div>

<div className="dropdown-container">
  <h3>Activities:</h3>
  <div className="dropdown-select">
    <div className="dropdown-options">
      {activities.map((activity) => (
        <div key={activity.name} className="checkbox-option">
          <input
            type="checkbox"
            id={activity.name}
            value={activity.name}
            checked={selectedActivities.includes(activity.name)}
            onChange={(e) => handleActivityChange(e, e.target.value)}
          />
          <label htmlFor={activity.name}>{activity.name}</label>
        </div>
      ))}
    </div>
  </div>
</div>
<div className="dropdown-container">
  <h3>Hotels:</h3>
  <div className="dropdown-select">
    <div className="dropdown-options">
      {hotels.map((hotel) => (
        <div key={hotel.name} className="checkbox-option">
          <input
            type="checkbox"
            id={hotel.name}
            value={hotel.name}
            checked={selectedHotels.includes(hotel.name)}
            onChange={(e) => handleHotelChange(e, e.target.value)}
          />
          <label htmlFor={hotel.name}>{hotel.name}</label>
        </div>
      ))}
    </div>
  </div>
</div>

        <div className="button-container">
          <button onClick={handleSubmit} className="submit-button">{editingItinerary ? 'Update' : 'Submit'}</button>
          <button onClick={handleClose} className="close-button">X</button>
        </div>
      </div>
    </div>
  );

}

export default CreateItineraryPopup;