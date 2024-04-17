import React from 'react';
import './DestinationListStyles.css'; 

// Sample data for destinations
const destinations = [
  { id: 1, name: 'Paris', description: 'Paris is the capital and most populous city of France. With an official estimated population of 2,102,650 residents as of 1 January 2023 in an area of more than 105 km2 (41 sq mi), Paris is the fourth-most populated city in the European Union and the 30th most densely populated city in the world in 2022', image: '../assets/1.jpg', price: '$999' },
  { id: 2, name: 'Tokyo', description: 'Heart of Japan. Tokyo (東京, Tōkyō) is Japans capital and the worlds most populous metropolis. It is also one of Japans 47 prefectures, consisting of 23 central city wards and multiple cities, towns and villages west of the city center. The Izu and Ogasawara Islands are also part of Tokyo.', image: 'path/to/tokyo.jpg', price: '$1199' },
  { id: 3, name: 'New York', description: 'The Big Apple. New York, often called New York City or simply NYC, is the most populous city in the United States, located at the southern tip of New York State on one of the worlds largest natural harbors.', image: 'path/to/newyork.jpg', price: '$899' },
  
];

function DestinationList() {
  return (
    <div className="destination-list">
      <h1>Explore Our Destinations</h1>
      <div className="destinations">
        {destinations.map(destination => (
          <div key={destination.id} className="destination-card">
            <img src={destination.image} alt={destination.name} />
            <h2>{destination.name}</h2>
            <p>{destination.description}</p>
            <span>{destination.price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DestinationList;




