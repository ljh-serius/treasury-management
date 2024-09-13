import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const BusinessImpactAnalysisAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [totalImpact, setTotalImpact] = useState(0);
  const [highImpactProcesses, setHighImpactProcesses] = useState(0);
  const [lowImpactProcesses, setLowImpactProcesses] = useState(0);

  useEffect(() => {
    fetchItems().then((items) => {
      setData(items);

      // Calculate KPIs
      setTotalImpact(items.length);
      setHighImpactProcesses(items.filter(item => item.impactLevel === 'high').length);
      setLowImpactProcesses(items.filter(item => item.impactLevel === 'low').length);
    });
  }, [fetchItems]);

  const chartOptions = {
    title: {
      text: 'Impact Levels Breakdown',
    },
    series: [{
      type: 'pie',
      data: [
        { name: 'High Impact', y: highImpactProcesses },
        { name: 'Medium Impact', y: totalImpact - highImpactProcesses - lowImpactProcesses },
        { name: 'Low Impact', y: lowImpactProcesses }
      ]
    }],
    accessibility: {
      point: {
        valueSuffix: '%'
      }
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    }
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        Business Impact Analysis Dashboard
      </Typography>

      {/* KPIs Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Processes</Typography>
              <Typography variant="h4">{totalImpact}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">High Impact Processes</Typography>
              <Typography variant="h4">{highImpactProcesses}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Low Impact Processes</Typography>
              <Typography variant="h4">{lowImpactProcesses}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Highcharts Pie Chart */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Impact Level Distribution
          </Typography>
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default BusinessImpactAnalysisAnalytics;
