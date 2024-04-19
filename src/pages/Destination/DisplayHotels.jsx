import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'; // Add imports for Dialog components
import DeleteIcon  from '@mui/icons-material/Delete';
import './DisplayHotels.css'
const DisplayHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageSize] = useState(4); 
    const [error, setError] = useState(null);
    const [hotelToDeleteId, setHotelToDeleteId] = useState(null);
    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await axios.get(`http://localhost:1234/hotels?page=1&pageSize=${pageSize}`);
                console.log('Hotels data:', response.data);

                const hotelsData = response.data.data.map(hotel => {
                    
                    const openingHours = hotel.opening_hours;
                    let openingHoursString = '';

                    if (openingHours && typeof openingHours === 'object') {
                       
                        for (const day in openingHours) {
                            if (openingHours.hasOwnProperty(day)) {
                               
                                openingHoursString += `${day}: ${openingHours[day].open} - ${openingHours[day].close}, `;
                            }
                        }
                        
                        openingHoursString = openingHoursString.slice(0, -2);
                    }

                    return {
                        city: hotel.city,
                        name: hotel.name,
                        rating: hotel.rating,
                        photos: hotel.photos, 
                        formatted_address: hotel.formatted_address,
                        opening_hours: openingHoursString, 
                        user_ratings_total: hotel.user_ratings_total,
                        id: hotel._id, 
                    };
                });

                setHotels(hotelsData);
                setLoading(false);
                setError(null);
            } catch (error) {
                console.error('Error fetching hotels:', error);
                setError('Error fetching hotels. Please try again later.');
            }
        };

        fetchHotels();
    }, [pageSize]);

    const handleEdit = async (id) => {
        try {
            
            await axios.put(`http://localhost:1234/hotels/${id}`, );
            console.log('Successfully edited hotel with ID:', id);
           
        } catch (error) {
            console.error('Error editing hotel:', error);
            
        }
    };
    
    const handleDelete = async (id) => {
        try {
            console.log('Hotel ID:', id); // Log the hotel ID
    
            // Send delete request to delete the hotel
            const response = await axios.delete(`http://localhost:1234/Hotels/${id}`);
            
            // Check if the delete request was successful
            if (response.status === 200) {
                // Filter out the deleted hotel from the state
                const updatedHotels = hotels.filter(hotel => hotel.id !== id);
                setHotels(updatedHotels);
                console.log('Successfully deleted hotel with ID:', id);
            } else {
                console.error('Failed to delete hotel:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting hotel:', error.message);
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
        { accessorKey: "formatted_address", header: 'Address' },
        { accessorKey: "user_ratings_total", header: 'User Ratings Total' },
        {
            accessorKey: "actions", // Action column
            header: 'Actions',
            Cell: ({ row }) => (
                <IconButton
                    color="error"
                    onClick={() => { 
                        console.log(row); 
                        handleDelete(row.original.id)}} // Assuming handleUpdate accepts the hotel ID
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
        <div className="hotels-container">
            {/* <h1>Hotels</h1> */}
            <ThemeProvider theme={theme}>
            <div className="material-table-container">
                    <MaterialReactTable 
                        columns={columns} 
                        data={hotels} 
                        enableStickyHeader 
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
        </div>
    );
};

export default DisplayHotels;
