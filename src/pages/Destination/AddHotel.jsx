// AddDestinationForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

function AddHotel() {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [hotels, setHotels] = useState([]);

    const handleSelect = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const { lat, lng } = await getLatLng(results[0]);
            const cordinates = `${lat}and${lng}`;
            setAddress(value);
            setCoordinates({ lat, lng });
    
            // Fetch hotels based on the selected city
            const response = await axios.get(`http://localhost:1234/Hotels/address/${cordinates}`);
            console.log("response data:", response.data); 
            setHotels(response.data.data);
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    };
    

    return (
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search Places ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div>
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                        })}
                                    >
                                        <span>{suggestion.description}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            <div>
                <h4>Hotels</h4>
                {hotels.map((hotel, index) => (
                    <div key={index}>
                        <p>{hotel.name}</p>
                        <p>{hotel.rating}</p>
                        {/* Add other hotel details as needed */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AddHotel;
