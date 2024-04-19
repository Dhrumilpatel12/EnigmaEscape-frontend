import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import Navbar from '../components/Navbar';
import AboutImg from '../assets/night.jpg';
import Footer from '../components/Footer';
import Trip from '../components/Trip';
import DestinationList from '../components/DestinationList';
import DestinationDetails from '../components/DestinationDetails';

function Service() {
  const [attractions, setAttractions] = useState([]);
  const [activities, setActivities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add a loading state

  useEffect(() => {
    // Fetch attractions, activities, and hotels from the backend
    const fetchData = async () => {
      try {
        setIsLoading(true); // Set loading state to true before fetching data

        const [attractionsResponse, activitiesResponse, hotelsResponse] = await Promise.all([
          fetch('http://localhost:1234/activity'),
          fetch('http://localhost:1234/attraction'),
          fetch('http://localhost:1234/hotels'),
        ]);

        const attractionsData = await attractionsResponse.json();
        const activitiesData = await activitiesResponse.json();
        const hotelsData = await hotelsResponse.json();

        setAttractions(attractionsData);
        setActivities(activitiesData);
        setHotels(hotelsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false); // Set loading state to false after fetching data
      }
    };
    fetchData();
  }, []);

  const heroContent = {
  
    heading: "Explore Our Destinations",
    subheading: "We're here to help and answer any question you might have. We look forward to hearing from you.",
   
   
  };

 
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <Hero
        backgroundImage={AboutImg}
        heading={heroContent.heading}
        subheading={heroContent.subheading}
        // ctaText={heroContent.ctaText}
        // ctaLink={heroContent.ctaLink}
        attractions={heroContent.attractions}
        activities={heroContent.activities}
        hotels={heroContent.hotels}
      />
      <DestinationDetails
        attractions={attractions}
        activities={activities}
        hotels={hotels}
      />
      {/* <DestinationList /> */}
      {/* <Trip /> */}
      <Footer />
    </>
  );
}

export default Service;