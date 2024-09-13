import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ShipmentTrackingDashboard({ fetchItems }) {
  const [shipmentData, setShipmentData] = useState([]);
  const [totalShipments, setTotalShipments] = useState(0);
  const [statusDistribution, setStatusDistribution] = useState([]);
  const [arrivalTrends, setArrivalTrends] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setShipmentData(data);
      processShipmentData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processShipmentData = (data) => {
    // Total Shipments
    setTotalShipments(data.length);

    // Shipment Status Distribution for Pie Chart
    const statusCounts = data.reduce((acc, shipment) => {
      acc[shipment.currentStatus] = (acc[shipment.currentStatus] || 0) + 1;
      return acc;
    }, {});
    setStatusDistribution(Object.keys(statusCounts).map(key => ({
      name: key.charAt(0).toUpperCase() + key.slice(1),
      y: statusCounts[key],
    })));

    // Estimated Arrival Trends for Line Chart
    const trendsData = data.map(shipment => ({
      date: new Date(shipment.estimatedArrival).getTime(),
      count: 1,
    })).sort((a, b) => a.date - b.date);
    setArrivalTrends(trendsData);
  };

  // Highcharts options for Shipment Status Distribution
  const statusChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Shipment Status Distribution' },
    series: [{
      name: 'Status',
      colorByPoint: true,
      data: statusDistribution,
    }],
  };

  // Highcharts options for Estimated Arrival Trends
  const arrivalChartOptions = {
    chart: { type: 'line' },
    title: { text: 'Estimated Arrival Trends' },
    xAxis: { type: 'datetime', title: { text: 'Estimated Arrival' } },
    yAxis: { title: { text: 'Number of Shipments' } },
    series: [{
      name: 'Shipments',
      data: arrivalTrends.map(item => [item.date, item.count]),
    }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Shipment Tracking Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Shipments</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalShipments}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* Shipment Status Distribution Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
          </Grid>

          {/* Estimated Arrival Trends Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={arrivalChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
