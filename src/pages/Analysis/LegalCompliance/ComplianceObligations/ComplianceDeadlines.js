import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ComplianceDeadlinesAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalDeadlines: 0,
    pendingDeadlines: 0,
    metDeadlines: 0,
    overdueDeadlines: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const deadlines = await fetchItems();
      setData(deadlines);
      calculateKPIs(deadlines);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalDeadlines = items.length;
    const pendingDeadlines = items.filter((item) => item.status === 'pending').length;
    const metDeadlines = items.filter((item) => item.status === 'met').length;
    const overdueDeadlines = items.filter((item) => item.status === 'overdue').length;

    setKpis({
      totalDeadlines,
      pendingDeadlines,
      metDeadlines,
      overdueDeadlines,
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Deadline Status Distribution',
    },
    series: [
      {
        name: 'Deadlines',
        colorByPoint: true,
        data: [
          { name: 'Pending', y: kpis.pendingDeadlines },
          { name: 'Met', y: kpis.metDeadlines },
          { name: 'Overdue', y: kpis.overdueDeadlines },
        ],
      },
    ],
  };

  const complianceTypeChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Deadlines by Compliance Type',
    },
    xAxis: {
      categories: ['Financial', 'Regulatory', 'Legal'],
    },
    yAxis: {
      title: {
        text: 'Number of Deadlines',
      },
    },
    series: [
      {
        name: 'Compliance Deadlines',
        data: [
          data.filter((item) => item.complianceType === 'financial').length,
          data.filter((item) => item.complianceType === 'regulatory').length,
          data.filter((item) => item.complianceType === 'legal').length,
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Compliance Deadlines Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Deadlines</Typography>
              <Typography variant="h4">{kpis.totalDeadlines}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Pending Deadlines</Typography>
              <Typography variant="h4">{kpis.pendingDeadlines}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Met Deadlines</Typography>
              <Typography variant="h4">{kpis.metDeadlines}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Overdue Deadlines</Typography>
              <Typography variant="h4">{kpis.overdueDeadlines}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={complianceTypeChart} />
      </Box>
    </Box>
  );
};

export default ComplianceDeadlinesAnalytics;
