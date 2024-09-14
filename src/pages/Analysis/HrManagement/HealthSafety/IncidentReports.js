import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function IncidentReportAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [resolvedIncidents, setResolvedIncidents] = useState([]);
  const [incidentTypeDistribution, setIncidentTypeDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKPIs(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKPIs = (data) => {
    setTotalIncidents(data.length);
    const resolved = data.filter((incident) => incident.status === 'resolved');
    setResolvedIncidents(resolved);
  };

  const generateCharts = (data) => {
    const typeCounts = data.reduce((acc, incident) => {
      acc[incident.incidentType] = (acc[incident.incidentType] || 0) + 1;
      return acc;
    }, {});
    setIncidentTypeDistribution(
      Object.keys(typeCounts).map((key) => ({
        name: key,
        y: typeCounts[key],
      }))
    );
  };

  const incidentTypeChart = {
    chart: { type: 'pie' },
    title: { text: 'Incident Type Distribution' },
    series: [
      {
        name: 'Incident Type',
        colorByPoint: true,
        data: incidentTypeDistribution,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Incident Report Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Incidents</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalIncidents}
                </Typography>
                <Typography variant="body2">Total number of reported incidents.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Resolved Incidents</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {resolvedIncidents.length}
                </Typography>
                <Typography variant="body2">Incidents that have been resolved.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={incidentTypeChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
