import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import PlaceDetails from './PlaceDetails'; // Assuming PlaceDetails is in the same directory

function AddDestinationForm() {
    const [address, setAddress] = useState("sample");
    const [coordinates, setCoordinates] = useState({ lat: null, lng: null });
    const [famousPlaces, setFamousPlaces] = useState([]);
    const [selectedCity, setSelectedCity] = useState("");
    const [attractions, setAttractions] = useState([]);
    const [hotels, setHotels] = useState([]);

    useEffect(() => {
        const fetchValues = async () => {
            const {lat, lng} = coordinates;
            const cordinates = `${lat}and${lng}`;

            try {
                const response = await axios.get(`http://localhost:1234/destination/address/${cordinates}`);
               console.log("response 123: ", response.data.data);
               setAttractions(response.data.data)
            } catch (error) {
                console.error('Error fetching values:', error);
                setError('Error fetching values');
            }
        };

        fetchValues();
    }, [address]);

    const handleSelect = async (value) => {
        try {
            //console.log("value123", value);
            const results = await geocodeByAddress(value);
            const { lat, lng } = await getLatLng(results[0]);
            //console.log(lat, lng)
            setAddress(value);
            setCoordinates({ lat, lng });

            // // Fetch popular places based on latitude and longitude using Google Places API
            // // const googleApiKey = 'AIzaSyDPyO4evXazCn8i4p3b7Zt0r3qDiOtlV8Y';
            // const googleResponse = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${value}&key=${googleApiKey}`);

            // if (googleResponse.data.results) {
            //     setFamousPlaces(googleResponse.data.results);
            //     setSelectedCity(value);
            // } else {
            //     console.error('Error fetching popular places from Google Places API');
            // }

            // Fetch places from reference code API
            // const referenceApiOptions = {
            //     method: 'POST',
            //     url: 'https://travel-advisor.p.rapidapi.com/attraction-filters/v2/list',
            //     params: {
            //         currency: 'USD',
            //         units: 'km',
            //         lang: 'en_US'
            //     },
            //     headers: {
            //         'content-type': 'application/json',
            //         'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
            //         'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            //     },
            //     data: {
            //         geoId: lat + "," + lng, // Pass the latitude and longitude obtained from geocoding
            //         startDate: '2022-03-10',
            //         endDate: '2022-03-15',
            //         pax: [
            //             {
            //                 ageBand: 'ADULT',
            //                 count: 2
            //             }
            //         ],
            //         sort: 'TRAVELER_FAVORITE_V2',
            //         sortOrder: 'asc',
            //         filters: [
            //             {
            //                 id: 'category',
            //                 value: ['40']
            //             },
            //             {
            //                 id: 'rating',
            //                 value: ['40']
            //             },
            //             {
            //                 id: 'navbar',
            //                 value: [
            //                     'ATTRACTIONOVERVIEW:-true'
            //                 ]
            //             }
            //         ]
            //     }
            // };

            // const referenceApiResponse = await axios.request(referenceApiOptions);
            // console.log(referenceApiResponse.data);

            // Split attractions and hotels
            // const attractions = referenceApiResponse.data.filter(place => place.category === 'attraction');
            // const hotels = referenceApiResponse.data.filter(place => place.category === 'hotel');
            // setAttractions(attractions);
            // setHotels(hotels);
        } catch (error) {
            console.error('Error fetching popular places:', error);
        }
    };

    return (
        <div className="div">
            <p> Lat: {coordinates.lat}</p>
            <p> Long: {coordinates.long}</p>
            <p> Address: {address}</p>

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

            <select>
                <option value="">Select a famous place</option>
                {attractions && attractions.length > 0 && attractions.map(place => (
                    <option key={place.place_id} value={place.name}>{place.name}</option>
                ))}
            </select>

            {selectedCity && (
                <div>
                    <h3>Famous places in {selectedCity}</h3>
                    <div>
                        <h4>Attractions</h4>
                        {attractions.map((place, index) => (
    <PlaceDetails key={`attraction_${index}`} place={place} />
))}

                    </div>
                    <div>
                        <h4>Hotels</h4>
                        {hotels.map((place, index) => (
    <PlaceDetails key={`hotel_${index}`} place={place} />
))}

                    </div>
                </div>
            )}
        </div>
    );
}

export default AddDestinationForm;
