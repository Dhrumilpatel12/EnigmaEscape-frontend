import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './DestinationTable.css'; // Import CSS file if needed

function Showdestination() {
    const [destinations, setDestinations] = useState([]);
    const [error, setError] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                const response = await axios.get('http://localhost:1234/destination');
                setDestinations(response.data.data);
            } catch (error) {
                console.error('Error fetching destinations:', error);
                setError('Error fetching destinations');
            }
        };

        fetchDestinations();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1234/destination/${id}`);
            setDestinations(destinations.filter(destination => destination._id !== id));
        } catch (error) {
            console.error('Error deleting destination:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredDestinations = destinations.filter(destination => {
        return (
            destination.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            destination.desc.toLowerCase().includes(searchQuery.toLowerCase())
        );
    });

    return (
        <div className="destination-table-container">
            <h2>Destinations</h2>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
            />
            {error && <p className="error-message">{error}</p>}
            <table className="destination-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Distance</th>
                        <th>Rating</th>
                        <th>Description</th>
                        <th>Featured</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredDestinations.map(destination => (
                        <tr key={destination._id}>
                            <td>{destination.title}</td>
                            <td>{destination.city}</td>
                            <td>{destination.address}</td>
                            <td>{destination.distance}</td>
                            <td>{destination.rating}</td>
                            <td>{destination.desc}</td>
                            <td>{destination.featured ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleDelete(destination._id)}>Delete</button>
                                {' '}
                                <Link to={`/edit/${destination._id}`}><button>Edit</button></Link> {/* Use Link to navigate */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Showdestination;
