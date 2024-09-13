import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const DisasterRecoveryAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalPlans: 0,
    activePlans: 0,
    archivedPlans: 0,
    draftPlans: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchItems();
      setData(result);

      // Calculate KPIs
      const totalPlans = result.length;
      const activePlans = result.filter(plan => plan.status === 'active').length;
      const archivedPlans = result.filter(plan => plan.status === 'archived').length;
      const draftPlans = result.filter(plan => plan.status === 'draft').length;

      setKpis({ totalPlans, activePlans, archivedPlans, draftPlans });
    };

    fetchData();
  }, [fetchItems]);

  // Highcharts configuration for Plans Status Distribution
  const statusDistributionOptions = {
    chart: { type: 'pie' },
    title: { text: 'Plan Status Distribution' },
    series: [
      {
        name: 'Plans',
        data: [
          { name: 'Active', y: kpis.activePlans },
          { name: 'Archived', y: kpis.archivedPlans },
          { name: 'Draft', y: kpis.draftPlans },
        ],
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* KPIs */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Plans</Typography>
              <Typography variant="h4">{kpis.totalPlans}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Active Plans</Typography>
              <Typography variant="h4">{kpis.activePlans}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Archived Plans</Typography>
              <Typography variant="h4">{kpis.archivedPlans}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h5">Draft Plans</Typography>
              <Typography variant="h4">{kpis.draftPlans}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Highcharts for Plan Status Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Plan Status Distribution</Typography>
              <HighchartsReact highcharts={Highcharts} options={statusDistributionOptions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DisasterRecoveryAnalytics;
