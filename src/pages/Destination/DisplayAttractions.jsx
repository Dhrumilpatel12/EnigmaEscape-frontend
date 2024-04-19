import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@material-ui/core/Button';
import './DisplayAttractions.css'; // Import CSS file for styling
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import DeleteIcon  from '@mui/icons-material/Delete';
const DisplayAttractions = () => {
    const [attractions, setAttractions] = useState([]);
    const [page, setPage] = useState(1); // Current page
    const [pageSize] = useState(6); // Number of entries per page
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAttractions = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/Attraction?page=${page}&pageSize=${pageSize}`);
                console.log('Attractions data:', response.data);
                
                const attractionsData = response.data.data.map(attraction => {
                    return {
                        name: attraction.name,
                        city: attraction.city,
                        rating: attraction.rating,
                        photos: attraction.photos, // Assuming photos are already in a usable format
                        coordinates: `${attraction.coordinates.lat}, ${attraction.coordinates.lng}`,
                        formatted_address: attraction.formatted_address,
                        business_status: attraction.business_status,
                        opening_hours: JSON.stringify(attraction.opening_hours),
                        user_ratings_total: attraction.user_ratings_total,
                        types: attraction.types.join(', '),
                        id: attraction._id, 
                    };
                });
                
                setAttractions(attractionsData);
                setError(null);
            } catch (error) {
                console.error('Error fetching attractions:', error);
                setError('Error fetching attractions. Please try again later.');
            }
        };
        
        

        fetchAttractions();
    }, [page, pageSize]);
    const handleImageClick = () => {
        setZoomed(!zoomed); // Toggle the zoomed state
    };
    const handleDelete = async (id) => {
        try {
            console.log('Attrction ID:', id); // Log the hotel ID
    
            // Send delete request to delete the hotel
            const response = await axios.delete(`http://localhost:1234/attraction/${id}`);
            
            // Check if the delete request was successful
            if (response.status === 200) {
                // Filter out the deleted hotel from the state
                const updatedattractions = attractions.filter(attraction => attraction.id !== id);
                setAttractions(updatedattractions);
                console.log('Successfully deleted hotel with ID:', id);
            } else {
                console.error('Failed to delete attraction:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting attraction:', error.message);
        }
    };
    
    const openDeleteDialog = (id) => {
        setHotelToDeleteId(id);
        handleDelete(id); // Immediately delete the row without confirmation
    };
    const googleAPI = "AIzaSyAOo1wTQp54U8W0FJWtB8JAnz_l51eQxso";
    
    const columns = [
        { accessorKey: "city", header: 'City' },
        { accessorKey: "name", header: 'Name' },
        { accessorKey: "rating", header: 'Rating' },
        {
            accessorKey: "photos", 
            header: 'Photos',
            Cell: ({ renderedCellValue, row }) => (
                <img
                alt="photo"
                width={100} // Adjust the width to set the size of the image
                height={100} // Adjust the height to set the size of the image
                src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${renderedCellValue}&key=${googleAPI}`}
                loading="lazy"
                className="square-image" // Apply a class for additional styling
        
                    
                    //style={{ borderRadius: '50%' }}
                  /> 
              ),
            //render: row => <img src={''} alt={`Photo`} style={{ width: '100%', height: 'auto' }} />
        },
        // { accessorKey: "coordinates", header: 'Coordinates' },
        { accessorKey: "formatted_address", header: 'Address' },
        // // { accessorKey: "business_status", header: 'Business Status' },
        // { accessorKey: "opening_hours", header: 'Opening Hours' },
        { accessorKey: "user_ratings_total", header: 'User Ratings Total' },
        // { accessorKey: "types", header: 'Types' },
        {
            accessorKey: "actions", // Action column
            header: 'Actions',
            Cell: ({ row }) => (
                <IconButton
                    color="error"
                    onClick={() =>{ 
                        console.log(row); handleDelete(row.original.id)}} // Assuming handleUpdate accepts the hotel ID
                >
                    <DeleteIcon />
                </IconButton>
            )
         
        },
    ];

    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    return (
        
        <div className="attractions-container">
            {error && <p className="error-message">{error}</p>} {/* Display error message if present */}
            <ThemeProvider theme={theme}>
                <div className="material-table-container">
                    <MaterialReactTable columns={columns} data={attractions} enableStickyHeader
                    pagination={{ pageSize: 4 }} 
                        muiTableContainerProps={{ 
                            sx: { 
                                maxHeight: '480px', 
                                overflowY: 'auto',
                                '&::-webkit-scrollbar': {
                                    width: '5px',
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: '#888',
                                    borderRadius: '5px',
                                }, 
                            } 
                        }} 
                        muiTableBodyCellProps={{ 
                            sx: (theme) => ({
                                backgroundColor:
                                    theme.palette.mode === 'dark'
                                        ? theme.palette.grey[900]
                                        : theme.palette.grey[50],
                            })
                        }}
                    />
                </div>
            </ThemeProvider>
            <div>
           
        </div>
        </div>
    );
};

export default DisplayAttractions;
