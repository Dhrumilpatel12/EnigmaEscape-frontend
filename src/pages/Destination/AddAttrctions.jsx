import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, Typography, TextField, Button, MenuItem, Grid } from '@mui/material';

const AttractionForm = ({ selectedAttraction, setSelectedAttraction }) => {
    const [formData, setFormData] = useState({
        _id: '',
        city: '',
        name: '',
        rating: '',
        photos: [],
        imageUrl: '',
        opening_hours: '',
        user_ratings_total: '',
        types: ''
    });
    const [cities, setCities] = useState([]);
    const [attractionTypes, setAttractionTypes] = useState([]);

    useEffect(() => {
        fetchCities();
        fetchAttractionTypes();
        if (selectedAttraction) {
            setFormData(selectedAttraction);
        }
    }, [selectedAttraction]);

    const fetchCities = async () => {
        try {
            const response = await axios.get('http://localhost:1234/attraction/cities');
            setCities(response.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

    const fetchAttractionTypes = async () => {
        try {
            const response = await axios.get('http://localhost:1234/attraction/types');
            setAttractionTypes(response.data);
        } catch (error) {
            console.error('Error fetching attraction types:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData._id) {
                await axios.put(`http://localhost:1234/attraction/${formData._id}`, formData);
                alert('Attraction updated successfully!');
                setSelectedAttraction(null); // Reset selected attraction
            } else {
                await axios.post('http://localhost:1234/attraction', formData);
                alert('Attraction added successfully!');
            }
            setFormData({
                _id: '',
                city: '',
                name: '',
                rating: '',
                photos: [],
                imageUrl: '',
                opening_hours: '',
                user_ratings_total: '',
                types: ''
            });
        } catch (error) {
            console.error('Error adding/updating attraction:', error);
            alert('Failed to add/update attraction. Please try again.');
        }
    };

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={8} lg={6}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            {formData._id ? 'Update Attraction' : 'Add New Attraction'}
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField
                                select
                                label="City"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                                fullWidth
                                margin="normal"
                            >
                                <MenuItem value="">Select City</MenuItem>
                                {cities.map(city => (
                                    <MenuItem key={city} value={city}>{city}</MenuItem>
                                ))}
                            </TextField>
                            {/* Other form fields */}
                            <Button type="submit" variant="contained" color="primary" fullWidth>
                                {formData._id ? 'Update Attraction' : 'Add Attraction'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default AttractionForm;
