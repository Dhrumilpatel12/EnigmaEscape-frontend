import React, { useState } from 'react';
import axios from 'axios';
import './SearchDestination.css'; // Import CSS file for styling

function SearchDestination() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:1234/destination/search/${searchTerm}`);
            setSearchResults(response.data.data);
        } catch (error) {
            console.error('Error searching destinations:', error);
            setError('Error searching destinations');
        }
    };

    return (
        <div className="search-destination-container">
            <input
                type="text"
                placeholder="Search destinations by city..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
            {error && <p className="error-message">{error}</p>}
            <ul>
                {searchResults.map(destination => (
                    <li key={destination._id}>{destination.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default SearchDestination;
