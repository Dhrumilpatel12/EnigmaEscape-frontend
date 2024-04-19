import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MaterialReactTable } from "material-react-table"; // Updated import
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import ViewItineraryPopup from './ViewItineraryPopup';
import EditItineraryPopup from './EditItineraryPopup';
import './DisplayItineraries.css';
const DisplayItineraries = ({ userId }) => {
    const [itineraries, setItineraries] = useState([]);
    const [error, setError] = useState(null);
    const [editingItinerary, setEditingItinerary] = useState(null);
    const [viewingItinerary, setViewingItinerary] = useState(null);
    useEffect(() => {
      const fetchItineraries = async () => {
        try {
// Make sure to replace 'userId' with the actual user ID
const response = await axios.get(`http://localhost:1234/itinerary?userId=${userId}`);
          const itinerariesData = response.data.map(itinerary => ({
            city: itinerary.city,
            attractions: itinerary.attractions.join(', '),
            activities: itinerary.activities.join(', '),
            hotels: itinerary.hotels.join(', '),
            id: itinerary._id
          }));
          setItineraries(itinerariesData);
          setError(null);
        } catch (error) {
          console.error('Error fetching itineraries:', error);
          setError('Error fetching itineraries. Please try again later.');
        }
      };
    
      fetchItineraries();
    }, [userId]);
    
    const handleEdit = (id) => {
        const itineraryToEdit = itineraries.find(itinerary => itinerary.id === id);
        console.log("Editing itinerary:", itineraryToEdit); // Add this line
        setEditingItinerary(itineraryToEdit);
      };
      
      
    
      const handleUpdate = (updatedItinerary) => {
        const updatedItineraries = itineraries.map(itinerary =>
          itinerary.id === updatedItinerary.id
            ? {
                ...itinerary,
                ...updatedItinerary,
              }
            : itinerary
        );
        setItineraries(updatedItineraries);
        setEditingItinerary(null); // Reset editingItinerary after successful update
      };
      const handleView = (id) => {
        const itineraryToView = itineraries.find(itinerary => itinerary.id === id);
        setViewingItinerary(itineraryToView);
      };
    //   const handleUpdate = (updatedItinerary) => {
    //     const updatedItineraries = itineraries.map(itinerary =>
    //       itinerary.id === updatedItinerary.id ? updatedItinerary : itinerary
    //     );
    //     setItineraries(updatedItineraries);
    //   };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1234/itinerary/${id}`);
            const updatedItineraries = itineraries.filter(itinerary => itinerary.id !== id);
            setItineraries(updatedItineraries);
            console.log('Successfully deleted itinerary with ID:', id);
        } catch (error) {
            console.error('Error deleting itinerary:', error);
        }
    };

    const columns = [
        { accessorKey: "city", header: 'City' },
        { accessorKey: "attractions", header: 'Attractions' },
        { accessorKey: "activities", header: 'Activities' },
        { accessorKey: "hotels", header: 'Hotels' },
        {
            accessorKey: "actions",
            header: 'Actions',
            Cell: ({ row }) => (
                <>
                <IconButton
  color="primary"
  onClick={() => handleView(row.original.id)}
>
  <VisibilityIcon />
</IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(row.original.id)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(row.original.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )
        },
    ];

    const theme = createTheme({
        palette: {
            mode: "dark"
        }
    });

    return (
        <div className="itineraries-container">
            {error && <p className="error-message">{error}</p>}
            {editingItinerary && (
  <EditItineraryPopup
    editingItinerary={editingItinerary}
    handleClose={() => setEditingItinerary(null)}
    handleUpdate={handleUpdate}
  />
)}
      {viewingItinerary && (
        <ViewItineraryPopup
          itinerary={viewingItinerary}
          handleClose={() => setViewingItinerary(null)}
        />
      )}
            <ThemeProvider theme={theme}>
                <div className="material-table-container">
                    <MaterialReactTable columns={columns} data={itineraries}
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

export default DisplayItineraries;