import React from 'react';
import Slider from 'react-slick';
import DestinationData from "./DestinationData"; // Your destination card component
import "./DestinationStyles.css"; // Styles for your destination cards and slider
import "slick-carousel/slick/slick.css"; // Base styles for slick
import "slick-carousel/slick/slick-theme.css"; // Theme styles for slick
import { Link } from "react-router-dom";
// Import your images
import Mountain1 from "../assets/1.jpg";
import Mountain2 from "../assets/2.jpg";
import Mountain3 from "../assets/5.jpg";
import Mountain4 from "../assets/8.jpg";

// Array of destinations
const destinations = [
  { id: 1, name: "Mountain Peak 1", description: "A breathtaking view awaits you at Mountain Peak 1.", image: Mountain1 },
  { id: 2, name: "Mountain Peak 2", description: "Explore the serene beauty of Mountain Peak 2.", image: Mountain2 },
  { id: 3, name: "Mountain Peak 3", description: "Discover the untouched landscapes of Mountain Peak 3.", image: Mountain3 },
  { id: 4, name: "Mountain Peak 4", description: "Adventure seekers' paradise: Mountain Peak 4.", image: Mountain4 },
];

// Slider settings
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const Destination = () => {
  return (
    <div className="destination-container">
      <h1>Explore Our Destinations</h1>
      <Slider {...settings}>
        {destinations.map((destination) => (
          <div key={destination.id}>
            <Link to={`/service`}style={{ textDecoration: 'none' }}>
            <DestinationData destination={destination} />
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Destination;
