import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CaseManagementAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalCases: 0,
    openCases: 0,
    closedCases: 0,
    pendingCases: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const cases = await fetchItems();
      setData(cases);
      calculateKPIs(cases);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalCases = items.length;
    const openCases = items.filter((item) => item.status === 'open').length;
    const closedCases = items.filter((item) => item.status === 'closed').length;
    const pendingCases = items.filter((item) => item.status === 'pending').length;

    setKpis({
      totalCases,
      openCases,
      closedCases,
      pendingCases,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Case Status Distribution',
    },
    series: [
      {
        name: 'Cases',
        colorByPoint: true,
        data: [
          { name: 'Open', y: kpis.openCases },
          { name: 'Closed', y: kpis.closedCases },
          { name: 'Pending', y: kpis.pendingCases },
        ],
      },
    ],
  };

  const caseTypeChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Cases by Type',
    },
    xAxis: {
      categories: ['Civil', 'Criminal', 'Regulatory'],
    },
    yAxis: {
      title: {
        text: 'Number of Cases',
      },
    },
    series: [
      {
        name: 'Cases',
        data: [
          data.filter((item) => item.caseType === 'civil').length,
          data.filter((item) => item.caseType === 'criminal').length,
          data.filter((item) => item.caseType === 'regulatory').length,
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Case Management Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Cases</Typography>
              <Typography variant="h4">{kpis.totalCases}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Open Cases</Typography>
              <Typography variant="h4">{kpis.openCases}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Closed Cases</Typography>
              <Typography variant="h4">{kpis.closedCases}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Cases</Typography>
              <Typography variant="h4">{kpis.pendingCases}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={caseTypeChart} />
      </Box>
    </Box>
  );
};

export default CaseManagementAnalytics;
