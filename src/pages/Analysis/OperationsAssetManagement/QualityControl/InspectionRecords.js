import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

export default function InspectionRecordsAnalytics({ fetchItems }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalInspections, setTotalInspections] = useState(0);
  const [failedInspections, setFailedInspections] = useState([]);
  const [inspectionResultDistribution, setInspectionResultDistribution] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const fetchedData = await fetchItems();
      setData(fetchedData);
      calculateKpis(fetchedData);
      generateCharts(fetchedData);
      setLoading(false);
    };

    fetchData();
  }, [fetchItems]);

  const calculateKpis = (data) => {
    setTotalInspections(data.length);

    const failed = data.filter((item) => item.tags.includes('failed'));
    setFailedInspections(failed);
  };

  const generateCharts = (data) => {
    const results = data.reduce((acc, item) => {
      acc[item.inspectionResult] = (acc[item.inspectionResult] || 0) + 1;
      return acc;
    }, {});

    setInspectionResultDistribution(
      Object.keys(results).map((key) => ({
        name: key,
        y: results[key],
      }))
    );
  };

  const inspectionResultDistributionChart = {
    chart: { type: 'pie' },
    title: { text: 'Inspection Result Distribution' },
    series: [
      {
        name: 'Results',
        colorByPoint: true,
        data: inspectionResultDistribution,
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
          Inspection Records Analytics
        </Typography>
        <Grid container spacing={4}>
          {/* KPIs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Inspections</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {totalInspections}
                </Typography>
                <Typography variant="body2">Total number of inspections conducted.</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Failed Inspections</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  {failedInspections.length}
                </Typography>
                <Typography variant="body2">Inspections tagged as 'Failed'.</Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Charts */}
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={inspectionResultDistributionChart} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
