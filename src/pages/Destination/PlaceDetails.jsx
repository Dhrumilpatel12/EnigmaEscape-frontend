import React from 'react';

function PlaceDetails({ place }) {
    return (
        <div className="place-details">
            <h5>{place.name}</h5>
            <p>{place.address}</p>
            <p>Rating: {place.rating}</p>
            {/* Add more details you want to display */}
        </div>
    );
}

export default PlaceDetails;
