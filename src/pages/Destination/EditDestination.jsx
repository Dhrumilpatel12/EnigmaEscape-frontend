import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters

function EditDestination() {
    const { id } = useParams(); // Get the destination ID from URL params
    const [destination, setDestination] = useState({});
    const [formData, setFormData] = useState({
        title: '',
        city: '',
        address: '',
        distance: '',
        rating: '',
        desc: '',
        featured: false
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDestination = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/destination/${id}`);
                setDestination(response.data.data);
                setFormData(response.data.data);
            } catch (error) {
                console.error('Error fetching destination:', error);
                setError('Error fetching destination');
            }
        };

        fetchDestination();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:1234/destination/${id}`, formData);
            console.log(response.data);
            // Handle success
        } catch (error) {
            console.error('Error updating destination:', error);
            // Handle error
        }
    };


    return (
        <div>
            <h2>Edit Destination</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                </div>
                <div className="form-group">
                    <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                </div>
                <div className="form-group">
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                </div>
                <div className="form-group">
                    <input type="number" name="distance" value={formData.distance} onChange={handleChange} placeholder="Distance" required />
                </div>
                <div className="form-group">
                    <input type="number" name="rating" value={formData.rating} onChange={handleChange} placeholder="Rating" min="0" max="5" />
                </div>
                <div className="form-group">
                    <textarea name="desc" value={formData.desc} onChange={handleChange} placeholder="Description" required />
                </div>
                <div className="form-group">
                    <label>
                        Featured:
                        <input type="checkbox" name="featured" checked={formData.featured} onChange={() => setFormData({ ...formData, featured: !formData.featured })} />
                    </label>
                </div>
                <div className="form-group">
                    <button type="submit">Update Destination</button>
                </div>
            </form>
        </div>
    );
}

export default EditDestination;
