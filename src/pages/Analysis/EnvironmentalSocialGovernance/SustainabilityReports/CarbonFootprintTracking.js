import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function CarbonFootprintDashboard({ fetchItems }) {
  const [emissionsData, setEmissionsData] = useState([]);
  const [scope1Total, setScope1Total] = useState(0);
  const [scope2Total, setScope2Total] = useState(0);
  const [scope3Total, setScope3Total] = useState(0);
  const [totalEmissions, setTotalEmissions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await fetchItems();
      setEmissionsData(data);
      processEmissionsData(data);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const processEmissionsData = (data) => {
    // Calculate total emissions for each scope
    const totals = data.reduce(
      (acc, record) => {
        acc.scope1 += Number(record.scope1Emissions) || 0;
        acc.scope2 += Number(record.scope2Emissions) || 0;
        acc.scope3 += Number(record.scope3Emissions) || 0;
        acc.totalEmissions += Number(record.totalEmissions) || 0;
        return acc;
      },
      { scope1: 0, scope2: 0, scope3: 0, totalEmissions: 0 }
    );

    setScope1Total(totals.scope1);
    setScope2Total(totals.scope2);
    setScope3Total(totals.scope3);
    setTotalEmissions(totals.totalEmissions);
  };

  const emissionsChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Total Emissions Distribution' },
    series: [
      {
        name: 'Emissions',
        colorByPoint: true,
        data: [
          { name: 'Scope 1 Emissions', y: scope1Total },
          { name: 'Scope 2 Emissions', y: scope2Total },
          { name: 'Scope 3 Emissions', y: scope3Total },
        ],
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
          Carbon Footprint Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* Total Number of Records */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Records</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  {emissionsData.length}
                </Typography>
                <Typography variant="body2">Total number of carbon footprint records tracked.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Emissions (tons CO2e)</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  {totalEmissions.toFixed(2)}
                </Typography>
                <Typography variant="body2">Total emissions across all scopes (Scope 1, 2, 3).</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={emissionsChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
