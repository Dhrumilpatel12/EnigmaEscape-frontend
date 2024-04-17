import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AttractionsView from './AttractionsView';
import ActivitiesView from './ActivitiesView';
import HotelsView from './HotelsView';
import DestinationSidebar from './DestinationSidebar';
import './DestinationDetails.css';

const DestinationDetails = () => {
  const [activeSection, setActiveSection] = useState('attractions');
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activitiesResponse, attractionsResponse, hotelsResponse] = await Promise.all([
          axios.get('http://localhost:1234/activity'),
          axios.get('http://localhost:1234/attraction'),
          axios.get('http://localhost:1234/hotels'),
        ]);

        setActivities(activitiesResponse.data.data);
        setAttractions(attractionsResponse.data.data);
        setHotels(hotelsResponse.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleCityFilter = (cities) => {
    setSelectedCities(cities);
  };

  const handleRatingFilter = (ratings) => {
    setSelectedRatings(ratings);
  };

  const handleReset = () => {
    setSelectedCities([]);
    setSelectedRatings([]);
  };

  // Filter attractions, activities, and hotels based on selected cities and ratings
  const filteredAttractions = attractions.filter(
    (attraction) =>
      (selectedCities.length === 0 || selectedCities.includes(attraction.city)) &&
      (selectedRatings.length === 0 || selectedRatings.includes(attraction.rating))
  );

  const filteredActivities = activities.filter(
    (activity) =>
      (selectedCities.length === 0 || selectedCities.includes(activity.city)) &&
      (selectedRatings.length === 0 || selectedRatings.includes(activity.rating))
  );

  const filteredHotels = hotels.filter(
    (hotel) =>
      (selectedCities.length === 0 || selectedCities.includes(hotel.city)) &&
      (selectedRatings.length === 0 || selectedRatings.includes(hotel.rating))
  );

  return (
    <div className="destination-details-container">
      <div className="sidebar-container">
        <DestinationSidebar
          onCityFilter={handleCityFilter}
          onRatingFilter={handleRatingFilter}
          onReset={handleReset}
        />
      </div>
      <div className="details-content">
        <div className="section-tabs">
          <button
            className={`tab-button ${activeSection === 'attractions' ? 'active' : ''}`}
            onClick={() => handleSectionChange('attractions')}
          >
            Attractions
          </button>
          <button
            className={`tab-button ${activeSection === 'activities' ? 'active' : ''}`}
            onClick={() => handleSectionChange('activities')}
          >
            Activities
          </button>
          <button
            className={`tab-button ${activeSection === 'hotels' ? 'active' : ''}`}
            onClick={() => handleSectionChange('hotels')}
          >
            Hotels
          </button>
        </div>
        <div className="section-content">
          {activeSection === 'attractions' && <AttractionsView attractions={filteredAttractions} />}
          {activeSection === 'activities' && <ActivitiesView activities={filteredActivities} />}
          {activeSection === 'hotels' && <HotelsView hotels={filteredHotels} />}
        </div>
      </div>
    </div>
  );
};

export default DestinationDetails;
