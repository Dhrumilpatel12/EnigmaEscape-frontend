import React, { useEffect, useState, useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import axios from 'axios';
import './DataGrid.css';
import { IconButton } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';

const DataGrid = () => {
    const [userData, setUserData] = useState([]);

    // Adjust this URL to where your API is hosted and the correct endpoint
    const fetchUserData = async () => {
        try {
            const response = await axios.get('http://localhost:1234/user/users');
            setUserData(response.data);
        } catch (error) {
            console.log(response.data)
            console.error("There was an error fetching the user data:", error);
        }
       
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:1234/user/users/${id}`);
            const updatedUsers = userData.filter(user => user._id !== id);
            setUserData(updatedUsers);
            console.log('Successfully deleted user with ID:', id);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };
    
    useEffect(() => {
        fetchUserData();
    }, []);
    const columns = useMemo(() => [
        { accessorKey: "username", header: 'Username' },
        { accessorKey: "lastname", header: 'Last Name' },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "phone", header: "Phone Number" },
        { 
            accessorKey: "isAdmin",
            header: "Admin",
            Cell: ({ cell }) => cell.getValue() ? <AdminPanelSettingsIcon color="success" /> : 'No'
        },
        {
            accessorKey: "actions",
            header: 'Actions',
            Cell: ({ row }) => (
                <>
                    {row.original.isAdmin ? (
                        <IconButton color="disabled" disabled>
                            <DeleteIcon />
                        </IconButton>
                    ) : (
                        <IconButton color="error" onClick={() => handleDelete(row.original._id)}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                  
                </>
            )
        },
    ], [handleDelete]);

    
    const theme = useMemo(
        () => createTheme({
            palette: {
                mode: "dark",
            },
        }),
        [],
    );

    return (
        <div className="table-container">
            <ThemeProvider theme={theme}>
                <MaterialReactTable columns={columns} data={userData}
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
                }}  />
            </ThemeProvider>
        </div>
    );
};

export default DataGrid;
