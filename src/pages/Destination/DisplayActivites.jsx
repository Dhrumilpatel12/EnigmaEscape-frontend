import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MaterialReactTable from "material-react-table";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './DisplayActivites.css'
const DisplayActivities = () => {
    const [activities, setActivities] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const response = await axios.get('http://localhost:1234/Activity');
                const activitiesData = response.data.data.map(activity => ({
                    city: activity.city,
                    name: activity.name,
                    rating: activity.rating,
                    photos: activity.photos,
                    formatted_address: activity.formatted_address,
                    user_ratings_total: activity.user_ratings_total,
                    id: activity._id // Assuming each activity has a unique ID
                }));
                setActivities(activitiesData);
                setError(null);
            } catch (error) {
                console.error('Error fetching activities:', error);
                setError('Error fetching activities. Please try again later.');
            }
        };

        fetchActivities();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1234/Activity/${id}`);
            const updatedActivities = activities.filter(activity => activity.id !== id);
            setActivities(updatedActivities);
            console.log('Successfully deleted activity with ID:', id);
        } catch (error) {
            console.error('Error deleting activity:', error);
        }
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
            //r
        },
        { accessorKey: "formatted_address", header: 'Address' },
        { accessorKey: "user_ratings_total", header: 'User Ratings Total' },
        {
            accessorKey: "actions",
            header: 'Actions',
            Cell: ({ row }) => (
                <IconButton
                    color="error"
                    onClick={() => handleDelete(row.original.id)}
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
        <div className="activities-container">
            {/* <h1>Activities</h1> */}
            {error && <p className="error-message">{error}</p>}
            <ThemeProvider theme={theme}>
                
                <div className="material-table-container">
                    
                    <MaterialReactTable columns={columns} data={activities}
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

export default DisplayActivities;
