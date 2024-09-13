import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const VendorScorecardsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalScorecards: 0,
    excellentVendors: 0,
    goodVendors: 0,
    averageVendors: 0,
    poorVendors: 0,
    averageScore: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const scorecards = await fetchItems();
      setData(scorecards);
      calculateKPIs(scorecards);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalScorecards = items.length;
    const excellentVendors = items.filter((item) => item.overallRating === 'excellent').length;
    const goodVendors = items.filter((item) => item.overallRating === 'good').length;
    const averageVendors = items.filter((item) => item.overallRating === 'average').length;
    const poorVendors = items.filter((item) => item.overallRating === 'poor').length;
    const averageScore =
      items.reduce((acc, curr) => acc + parseFloat(curr.score || 0), 0) / totalScorecards;

    setKpis({
      totalScorecards,
      excellentVendors,
      goodVendors,
      averageVendors,
      poorVendors,
      averageScore: averageScore.toFixed(2),
    });
  };

  const ratingChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Vendor Rating Distribution',
    },
    series: [
      {
        name: 'Vendors',
        colorByPoint: true,
        data: [
          { name: 'Excellent', y: kpis.excellentVendors },
          { name: 'Good', y: kpis.goodVendors },
          { name: 'Average', y: kpis.averageVendors },
          { name: 'Poor', y: kpis.poorVendors },
        ],
      },
    ],
  };

  const scoreChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Vendor Scores by Name',
    },
    xAxis: {
      categories: data.map((item) => item.vendorName),
    },
    yAxis: {
      title: {
        text: 'Score',
      },
    },
    series: [
      {
        name: 'Score',
        data: data.map((item) => parseFloat(item.score || 0)),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Vendor Scorecards Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Scorecards</Typography>
              <Typography variant="h4">{kpis.totalScorecards}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Excellent Vendors</Typography>
              <Typography variant="h4">{kpis.excellentVendors}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Good Vendors</Typography>
              <Typography variant="h4">{kpis.goodVendors}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Vendors</Typography>
              <Typography variant="h4">{kpis.averageVendors}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Poor Vendors</Typography>
              <Typography variant="h4">{kpis.poorVendors}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Average Score</Typography>
              <Typography variant="h4">{kpis.averageScore}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={ratingChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={scoreChart} />
      </Box>
    </Box>
  );
};

export default VendorScorecardsAnalytics;
