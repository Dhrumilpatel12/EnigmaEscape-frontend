
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';
import React from 'react';
import './styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import BoardPage from './pages/Board/Board';
import Calendar from './pages/Calendar/Calendar';
import Dashboard from './pages/Dashboard/Dashboard';
import DataGrid from './pages/DataGrid/DataGrid';
import LocationForm from './pages/LocationForm/LocationForm';
import AddAttraction from './pages/Destination/AddAttrction';
import AddDestination from './pages/Destination/AddDestination';
import Showdestination from './pages/Destination/Showdestination';
import EditDestination from './pages/Destination/EditDestination';
import PlaceDeatils from './pages/Destination/PlaceDetails';
import SearchDestination from './pages/Destination/SearchDestination';
import DisplayAttractions from './pages/Destination/DisplayAttractions';
import AddAttrctions from './pages/Destination/AddAttrctions';
import AddHotel from './pages/Destination/AddHotel';
import AddActivity from './pages/Destination/AddActivity';
import DisplayHotels from './pages/Destination/DisplayHotels';
import DisplayActivites from './pages/Destination/DisplayActivites';
import Login from './pages/Authentication/Login';
import Home from './routes/Home';
import About from './routes/About';
import Service from './routes/Service';
import Contact from './routes/Contact';
import Itenary from './routes/Itenary';
import UserProfile from './components/UserProfile';
import CreateItineraryPopup from '../src/components/CreateItineraryPopup';
import EditItineraryPopup from '../src/components/EditItineraryPopup';
import ViewItineraryPopup from '../src/components/ViewItineraryPopup';
import Profile from './routes/Profile';
// import AddAttraction from './pages/Destination/AddAttrction';
// import Login  from '../src/Login/Login';
import Register  from './pages/Authentication/Register';
const App = () => {
  return (
      <BrowserRouter>
        <Routes>EditDestination
          
            <Route path="/login" element={< Login />} />
            <Route path="/register" element={< Register />} />
            <Route path="/" element={<Home />} />
            <Route path='/UserProfile' element={<UserProfile/>}/>
        <Route path="/about" element={<About />} />
        <Route path="/service" element={<Service />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/Itenary" element={<Itenary />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/CreateItineraryPopup" element={<CreateItineraryPopup />} />
        <Route path="/EditItineraryPopup" element={<EditItineraryPopup />} />
        <Route path="/ViewItineraryPopup" element={<ViewItineraryPopup />} />
          <Route path="/admin" element={<Layout />}>
         
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="calendar" element={<Calendar />} />
            <Route path="board" element={<BoardPage />} />
            <Route path="users" element={<DataGrid />} />
            <Route path="PlaceDeatils" element={<PlaceDeatils />} />
            <Route path="LocationForm" element={<LocationForm />} />
            <Route path="AddAttraction" element={<AddAttraction />} />
            <Route path="AddDestination" element={<AddDestination />} />
            <Route path="showDestination" element={<Showdestination />} />
            <Route path="edit/:id" element={<EditDestination />} />
            <Route path="SearchDestination" element={<SearchDestination />} />
            <Route path="DisplayAttractions" element={<DisplayAttractions />} />
            <Route path="AddAttrctions" element={<AddAttrctions />} />
            <Route path="AddActivity" element={<AddActivity />} />
            {/* <Route path="RegisterationPage" element={<RegisterationPage />} /> */}
            <Route path="AddHotel" element={<AddHotel />} />
            <Route path="DisplayHotels" element={<DisplayHotels />} />
            <Route path="DisplayActivites" element={<DisplayActivites />} />
            {/* <Route path="AddAttraction" element={<AddAttraction />} /> */ }
            {/* <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} /> */}
          </Route>
    
        
        </Routes>
      </BrowserRouter>
  );
};

export default App;
