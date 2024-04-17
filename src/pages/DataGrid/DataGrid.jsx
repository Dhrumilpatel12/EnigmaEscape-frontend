import React, { useEffect, useState, useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import axios from 'axios';
import './DataGrid.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const DataGrid = () => {
    const [userData, setUserData] = useState([]);

    // Adjust this URL to where your API is hosted and the correct endpoint
    const fetchUserData = async () => {
        try {
            const response = await axios.get('https://enigmaescape-backend.onrender.com/user/users');
            setUserData(response.data);
        } catch (error) {
            console.error("There was an error fetching the user data:", error);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const columns = useMemo(() => [
        {
            accessorKey: "username", // assuming your user data object has a firstName field
            header: 'First Name',
        },
        {
            accessorKey: "lastname", // assuming your user data object has a lastName field
            header: 'Last Name',
        },
        {
            accessorKey: "email", // adjust accordingly to your data
            header: "Email",
        },
        {
            accessorKey: "phone", // adjust accordingly to your data
            header: "Phone Number",
        },
        
    ], []);

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
