import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card, Typography, Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from '@mui/material';
import './Dashboard.css';
const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [topItems, setTopItems] = useState([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [totalAttractions, setTotalAttractions] = useState(0);
  const [totalHotels, setTotalHotels] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [activityResponse, attractionResponse, hotelResponse] = await Promise.all([
          axios.get('http://localhost:1234/activity'),
          axios.get('http://localhost:1234/attraction'),
          axios.get('http://localhost:1234/hotels')
        ]);

        const activityData = activityResponse.data.data.map(item => ({...item, category: 'Activity'}));
        const attractionData = attractionResponse.data.data.map(item => ({...item, category: 'Attraction'}));
        const hotelData = hotelResponse.data.data.map(item => ({...item, category: 'Hotel'}));

        const combinedData = [...activityData, ...attractionData, ...hotelData];

        // Sort the combined data based on user_ratings_total in descending order
        combinedData.sort((a, b) => b.user_ratings_total - a.user_ratings_total);

        // Select the top 7 items
        const top7Items = combinedData.slice(0, 6);

        setTopItems(top7Items);
        setLoading(false);

        // Set total counts
        setTotalActivities(activityData.length);
        setTotalAttractions(attractionData.length);
        setTotalHotels(hotelData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: '10px' }}>
      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={4}>
          <Card style={{ backgroundColor: '#FF8C00', padding: '10px', textAlign: 'center' }}>
            <Typography variant="h4">Total Activities</Typography>
            <Typography variant="h2" style={{ color: '#FFF' }}>{totalActivities}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ backgroundColor: '#FFA500', padding: '10px', textAlign: 'center' }}>
            <Typography variant="h4">Total Attractions</Typography>
            <Typography variant="h2" style={{ color: '#FFF' }}>{totalAttractions}</Typography>
          </Card>
        </Grid>
        <Grid item xs={4}>
          <Card style={{ backgroundColor: '#FFD700', padding: '10px', textAlign: 'center' }}>
            <Typography variant="h4">Total Hotels</Typography>
            <Typography variant="h2" style={{ color: '#FFF' }}>{totalHotels}</Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card style={{ padding: '10px' }}>
            <Typography variant="h4">Top Rated</Typography>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                <CircularProgress />
              </div>
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#f0f0f0' }}>
                      <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>City</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>Category</TableCell>
                      <TableCell style={{ fontWeight: 'bold' }}>User Ratings Total</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topItems.map((item, index) => (
                      <TableRow key={index} style={{ backgroundColor: index % 2 === 0 ? '#ffffff' : '#f9f9f9' }}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.city}</TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.user_ratings_total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
