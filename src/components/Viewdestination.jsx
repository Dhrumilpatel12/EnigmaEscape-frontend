import React, { useState } from 'react';
import './ViewDestinationStyles.css'; 

const ontarioCities = [
  "Toronto", "Ottawa", "Hamilton", "Windsor", "St. Catharines", "Greater Sudbury",
  "Mississauga", "Peterborough", "Kitchener", "Kingston", "North Bay", "Vaughan",
  "Burlington", "Guelph", "Barrie", "Brampton", "Thunder Bay", "Oshawa", "Cambridge",
  "Elliot Lake", "Brantford", "Richmond Hill", "Sault Ste. Marie", "Stratford", "Timmins",
  "Sarnia", "Owen Sound", "Brockville", "Kenora", "London", "Chatham-Kent", "Temiskaming Shores",
  "Kawartha Lakes", "Waterloo", "Brant", "Markham", "Niagara Falls", "Thorold", "Woodstock",
  "Leamington", "Port Colborne", "Belleville", "Cornwall", "Welland", "Orillia", "St. Thomas",
  "Pickering", "Quinte West", "Pembroke", "Clarence-Rockland", "Oakville"
];

function ViewDestination() {
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('attractions'); // Default category

  const handleCityChange = (city) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter((c) => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="view-destination">
      <div className="sidebar">
        <h2>Cities</h2>
        <div className="city-filter">
          {ontarioCities.map(city => (
            <div key={city} className="city-checkbox">
              <input
                type="checkbox"
                id={city}
                checked={selectedCities.includes(city)}
                onChange={() => handleCityChange(city)}
              />
              <label htmlFor={city}>{city}</label>
            </div>
          ))}
        </div>
      </div>
      <div className="content">
        <div className="navigation">
          <select value={selectedCategory} onChange={(e) => handleCategoryChange(e.target.value)}>
            <option value="attractions">Attractions</option>
            <option value="activities">Activities</option>
            <option value="hotels">Hotels</option>
          </select>
        </div>
        <div className="category-content">
          <h2>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}</h2>
          {selectedCities.length > 0 ? (
            <ul>
              {selectedCities.map(city => (
                <li key={city}>{city} {selectedCategory}</li>
              ))}
            </ul>
          ) : (
            <p>No {selectedCategory} available.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewDestination;
