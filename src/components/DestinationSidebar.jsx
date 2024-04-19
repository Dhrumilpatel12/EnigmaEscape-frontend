import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DestinationSidebarStyles.css';

const DestinationSidebar = ({
  onCityFilter,
  onRatingFilter,
  onReset,
}) => {
  const [cities, setCities] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [showCityFilter, setShowCityFilter] = useState(false);
  const [showRatingFilter, setShowRatingFilter] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [citiesResponse, ratingsResponse] = await Promise.all([
          axios.get('http://localhost:1234/Activity/cities'),
          axios.get('http://localhost:1234/Activity/ratings'),
        ]);

        setCities(citiesResponse.data);
        setRatings(ratingsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCityFilter = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleRatingFilter = (rating) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const handleApply = () => {
    onCityFilter(selectedCities);
    onRatingFilter(selectedRatings);
  };

  const handleReset = () => {
    setSelectedCities([]);
    setSelectedRatings([]);
    onReset();
  };

  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="sidebar">
      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => setShowCityFilter(!showCityFilter)}
        >
          <h3>Filter by City</h3>
          <span className={`arrow ${showCityFilter ? 'up' : ''}`} />
        </div>
        {showCityFilter && (
          <div className="filter-options">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search cities..."
                className="search-input"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="options-container">
              {filteredCities.map((city) => (
                <div key={city} className="filter-option">
                  <input
                    type="checkbox"
                    id={city}
                    checked={selectedCities.includes(city)}
                    onChange={() => handleCityFilter(city)}
                    className="checkbox-input"
                  />
                  <label htmlFor={city} className="checkbox-label">
                    {city}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="filter-section">
        <div
          className="filter-header"
          onClick={() => setShowRatingFilter(!showRatingFilter)}
        >
          <h3>Filter by Rating</h3>
          <span className={`arrow ${showRatingFilter ? 'up' : ''}`} />
        </div>
        {showRatingFilter && (
          <div className="filter-options">
            <div className="options-container">
              {ratings.map((rating) => (
                <div key={rating} className="filter-option">
                  <input
                    type="checkbox"
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onChange={() => handleRatingFilter(rating)}
                    className="checkbox-input"
                  />
                  <label
                    htmlFor={`rating-${rating}`}
                    className="checkbox-label"
                  >
                    {rating}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button className="apply-button" onClick={handleApply}>
        Apply
      </button>
      <div style={{ marginTop: '10px' }}>
        <button className="reset-button" onClick={handleReset}>
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default DestinationSidebar;
