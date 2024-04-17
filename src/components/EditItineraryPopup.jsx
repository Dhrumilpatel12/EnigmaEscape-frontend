import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./EditItineraryPopup.css";

function EditItineraryPopup({ handleClose, editingItinerary, handleUpdate }) {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(editingItinerary ? editingItinerary.city : "");
  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [selectedAttractions, setSelectedAttractions] = useState(new Set(editingItinerary ? editingItinerary.attractions : []));
  const [selectedActivities, setSelectedActivities] = useState(new Set(editingItinerary ? editingItinerary.activities : []));
  const [selectedHotels, setSelectedHotels] = useState(new Set(editingItinerary ? editingItinerary.hotels : []));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const fetchCityData = async (city) => {
    setLoading(true);
    try {
      const attractionsResponse = await axios.get(`https://enigmaescape-backend.onrender.com/itinerary/attractions?city=${city}`);
      const activitiesResponse = await axios.get(`https://enigmaescape-backend.onrender.com/itinerary/activities?city=${city}`);
      const hotelsResponse = await axios.get(`https://enigmaescape-backend.onrender.com/itinerary/hotels?city=${city}`);
  
      const attractionNames = new Set(attractionsResponse.data.map(attraction => attraction.name));
      const activityNames = new Set(activitiesResponse.data.map(activity => activity.name));
      const hotelNames = new Set(hotelsResponse.data.map(hotel => hotel.name));
  
      setAttractions(attractionsResponse.data);
      setActivities(activitiesResponse.data);
      setHotels(hotelsResponse.data);
  
      if (editingItinerary) {
        const selectedAttractionNames = new Set([...editingItinerary.attractions].filter(attraction => attractionNames.has(attraction)));
        const selectedActivityNames = new Set([...editingItinerary.activities].filter(activity => activityNames.has(activity)));
        const selectedHotelNames = new Set([...editingItinerary.hotels].filter(hotel => hotelNames.has(hotel)));
  
        setSelectedAttractions(selectedAttractionNames);
        setSelectedActivities(selectedActivityNames);
        setSelectedHotels(selectedHotelNames);
      } else {
        setSelectedAttractions(new Set());
        setSelectedActivities(new Set());
        setSelectedHotels(new Set());
      }
  
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
        const response = await axios.get('https://enigmaescape-backend.onrender.com/Activity/cities');
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
      setSelectedCity(editingItinerary.city);
  
      // Split attractions, activities, and hotels strings into arrays
      const selectedAttractionsArray = editingItinerary.attractions.split(',').map(attraction => attraction.trim());
      const selectedActivitiesArray = editingItinerary.activities.split(',').map(activity => activity.trim());
      const selectedHotelsArray = editingItinerary.hotels.split(',').map(hotel => hotel.trim());
  
      console.log("Selected Attractions:", selectedAttractionsArray);
      console.log("Selected Activities:", selectedActivitiesArray);
      console.log("Selected Hotels:", selectedHotelsArray);
  
      // Set the state of selected items' checkboxes
      setSelectedAttractions(new Set(selectedAttractionsArray));
      setSelectedActivities(new Set(selectedActivitiesArray));
      setSelectedHotels(new Set(selectedHotelsArray));
  
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
      const newState = new Set(prevState);
      if (isChecked) {
        newState.add(value);
      } else {
        newState.delete(value);
      }
      return newState;
    });
  };


  const handleActivityChange = (e, value) => {
    const isChecked = e.target.checked;
    setSelectedActivities(prevState => {
      const newState = new Set(prevState);
      if (isChecked) {
        newState.add(value);
      } else {
        newState.delete(value);
      }
      return newState;
    });
  };
  const handleHotelChange = (e, value) => {
    const isChecked = e.target.checked;
    setSelectedHotels(prevState => {
      const newState = new Set(prevState);
      if (isChecked) {
        newState.add(value);
      } else {
        newState.delete(value);
      }
      return newState;
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const itineraryData = {
        city: selectedCity,
        attractions: [...selectedAttractions],
        activities: [...selectedActivities],
        hotels: [...selectedHotels],
      };
  
      if (editingItinerary) {
        await axios.put(`https://enigmaescape-backend.onrender.com/itinerary/${editingItinerary.id}`, itineraryData);
        handleUpdate(itineraryData);
      } else {
        const response = await axios.post('https://enigmaescape-backend.onrender.com/itinerary', itineraryData);
        console.log('Itinerary saved:', response.data);
      }

      handleClose();
    } catch (err) {
      console.error('Error saving itinerary:', err);
    }
  };

  return (
    <div className="create-itinerary-popup">
      <div className="create-itinerary-content">
        <h2>{editingItinerary ? 'Edit Itinerary' : 'Create Your Own Itinerary'}</h2>
        <div className="dropdown-container">
          <label htmlFor="citySelect">Select a City:</label>
          <input
            type="text"
            id="citySelect"
            value={selectedCity}
            onChange={handleCityChange}
            className="city-select"
            list="cityList"
          />
          <datalist id="cityList">
            {cities.map((city) => (
              <option key={city} value={city} />
            ))}
          </datalist>
        </div>

        <div className="dropdown-select">
          <h3>Attractions:</h3>
          <div className="dropdown-options">
          {attractions.map((attraction) => (
  <div key={attraction.name} className="checkbox-option">
    <input
      type="checkbox"
      id={attraction.name}
      value={attraction.name}
      checked={selectedAttractions.has(attraction.name)} // Use has method for Set
      onChange={(e) => handleAttractionChange(e, attraction.name)}
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
      checked={selectedActivities.has(activity.name)} // Use has method for Set
      onChange={(e) => handleActivityChange(e, activity.name)}
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
      checked={selectedHotels.has(hotel.name)} // Use has method for Set
      onChange={(e) => handleHotelChange(e, hotel.name)}
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

export default EditItineraryPopup;