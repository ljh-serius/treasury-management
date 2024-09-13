import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const NewsletterAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalNewsletters: 0,
    audienceAllEmployees: 0,
    audienceManagement: 0,
    audienceDepartmentSpecific: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const newsletters = await fetchItems();
      setData(newsletters);
      calculateKPIs(newsletters);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (newsletters) => {
    const totalNewsletters = newsletters.length;
    const audienceAllEmployees = newsletters.filter((n) => n.audience === 'all-employees').length;
    const audienceManagement = newsletters.filter((n) => n.audience === 'management').length;
    const audienceDepartmentSpecific = newsletters.filter((n) => n.audience === 'department-specific').length;

    setKpis({
      totalNewsletters,
      audienceAllEmployees,
      audienceManagement,
      audienceDepartmentSpecific,
    });
  };

  const audienceDistributionChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Audience Distribution',
    },
    series: [
      {
        name: 'Newsletters',
        colorByPoint: true,
        data: [
          { name: 'All Employees', y: kpis.audienceAllEmployees },
          { name: 'Management', y: kpis.audienceManagement },
          { name: 'Department Specific', y: kpis.audienceDepartmentSpecific },
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Newsletter Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Newsletters</Typography>
              <Typography variant="h4">{kpis.totalNewsletters}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">All Employees</Typography>
              <Typography variant="h4">{kpis.audienceAllEmployees}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Management</Typography>
              <Typography variant="h4">{kpis.audienceManagement}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Department Specific</Typography>
              <Typography variant="h4">{kpis.audienceDepartmentSpecific}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={audienceDistributionChart} />
      </Box>
    </Box>
  );
};

export default NewsletterAnalytics;
