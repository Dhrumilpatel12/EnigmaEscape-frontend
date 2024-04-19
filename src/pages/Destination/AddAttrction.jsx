import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

function AddAttraction() {
    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [selectedCity, setSelectedCity] = useState("");
    const [attractions, setAttractions] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                console.log('in try')
                const response = await axios.get(`http://localhost:1234/Attraction/address/${coordinates.lat}and${coordinates.lng}`);
                console.log("response 123: ", response.data.data);
                setAttractions(response.data.data);
            } catch (error) {
                console.error('Error fetching attractions:', error);
            }
        };

        if (coordinates.lat && coordinates.lng) {
            fetchAttractions();
        }
    }, [coordinates]);

    const handleSelectCity = async (value) => {
        try {
            const results = await geocodeByAddress(value);
            const { lat, lng } = await getLatLng(results[0]);
            setAddress(value);
            setCoordinates({ lat, lng });
            setSelectedCity(value);
        } catch (error) {
            console.error('Error fetching city coordinates:', error);
        }
    };

    const handleSelectPlace = (place) => {
        setSelectedPlace(place);
    };
    const fetchPhotosForPlace = async (placeId) => {
        const googleApiKey = 'AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso';
        const maxPhotos = 3; // Maximum number of photos to fetch per place
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/place/photos/json?maxwidth=400&maxheight=400&maxphotos=${maxPhotos}&photoreference=${placeId}&key=${googleApiKey}`);
            return response.data.photos.map(photo => photo.getUrl({ maxWidth: 400 }));
        } catch (error) {
            console.error('Error fetching photos for place:', error);
            return [];
        }
    };
    

    return (
        <div className="div">
            <h3>Select City</h3>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelectCity}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <input
                            {...getInputProps({
                                placeholder: 'Search City ...',
                                className: 'location-search-input',
                            })}
                        />
                        <div className="autocomplete-dropdown-container">
                            {loading && <div>Loading...</div>}
                            {suggestions.map(suggestion => {
                                const className = suggestion.active
                                    ? 'suggestion-item--active'
                                    : 'suggestion-item';
                                const style = suggestion.active
                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                    : { backgroundColor: 'black', cursor: 'pointer' };
                                return (
                                    <div
                                        {...getSuggestionItemProps(suggestion, {
                                            className,
                                            style,
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

            {selectedCity && (
                <div>
                    <h3>Select Popular Place</h3>
                    <select onChange={(e) => handleSelectPlace(JSON.parse(e.target.value))}>
                        <option value="">Select a popular place</option>
                        {attractions.map(place => (
                            <option key={place.place_id} value={JSON.stringify(place)}>{place.name}</option>
                        ))}
                    </select>
                </div>
            )}

{selectedPlace && (
    <div>
        <h3>Selected Place</h3>
        <h4>{selectedPlace.name}</h4>
        <p>Rating: {selectedPlace.rating}</p>
        <p>Address: {selectedPlace.formatted_address}</p>
        <p>Business Status: {selectedPlace.business_status}</p>
        <p>Open Now: {selectedPlace.opening_hours && selectedPlace.opening_hours.open_now ? 'Yes' : 'No'}</p>
        <p>User Ratings Total: {selectedPlace.user_ratings_total}</p>
        <p>Types: {selectedPlace.types.join(', ')}</p>
        {selectedPlace.photos && selectedPlace.photos.length > 0 && (
    <div>
        <h4>Photos</h4>
        <div>
            {selectedPlace.photos.map((photo, index) => (
                <img key={index} src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${photo.photo_reference}&key=AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso`} alt={`Photo ${index}`} />
            ))}
        </div>
    </div>
)}
    </div>
)}


        </div>
    );
}

export default AddAttraction;
