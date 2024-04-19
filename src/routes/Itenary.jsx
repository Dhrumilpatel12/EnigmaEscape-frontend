import React from 'react';
import Footer from "../components/Footer";
import Itenary from "../components/ItenaryPage";
import Navbar from "../components/Navbar";
import DisplayItineraries from '../components/DisplayItineraries';

function ItineraryPage() {
  return (
    <>
      <Navbar />
      <div className="itinerary-page">
        <header className="itinerary-header">
          <h1>Itinerary</h1>
        </header>
        <Itenary />
        <DisplayItineraries />
      </div>
      <Footer />
    </>
  );
}

export default ItineraryPage;
