import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CrisisScenariosAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalScenarios: 0,
    activeScenarios: 0,
    archivedScenarios: 0,
    highLikelihood: 0,
    mediumLikelihood: 0,
    lowLikelihood: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchItems();
      setData(result);

      // Calculate KPIs
      const totalScenarios = result.length;
      const activeScenarios = result.filter(scenario => scenario.status === 'active').length;
      const archivedScenarios = result.filter(scenario => scenario.status === 'archived').length;
      const highLikelihood = result.filter(scenario => scenario.likelihood === 'high').length;
      const mediumLikelihood = result.filter(scenario => scenario.likelihood === 'medium').length;
      const lowLikelihood = result.filter(scenario => scenario.likelihood === 'low').length;

      setKpis({
        totalScenarios,
        activeScenarios,
        archivedScenarios,
        highLikelihood,
        mediumLikelihood,
        lowLikelihood,
      });
    };

    fetchData();
  }, [fetchItems]);

  // Highcharts configuration for Likelihood Distribution
  const likelihoodDistributionOptions = {
    chart: { type: 'column' },
    title: { text: 'Likelihood Distribution' },
    xAxis: { categories: ['Likelihood'] },
    series: [
      { name: 'High', data: [kpis.highLikelihood] },
      { name: 'Medium', data: [kpis.mediumLikelihood] },
      { name: 'Low', data: [kpis.lowLikelihood] },
    ],
  };

  // Highcharts configuration for Status Distribution
  const statusDistributionOptions = {
    chart: { type: 'pie' },
    title: { text: 'Scenario Status Distribution' },
    series: [
      {
        name: 'Scenarios',
        data: [
          { name: 'Active', y: kpis.activeScenarios },
          { name: 'Archived', y: kpis.archivedScenarios },
        ],
      },
    ],
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        {/* KPIs */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Total Scenarios</Typography>
              <Typography variant="h4">{kpis.totalScenarios}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Active Scenarios</Typography>
              <Typography variant="h4">{kpis.activeScenarios}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Archived Scenarios</Typography>
              <Typography variant="h4">{kpis.archivedScenarios}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Highcharts for Likelihood Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Likelihood Distribution</Typography>
              <HighchartsReact highcharts={Highcharts} options={likelihoodDistributionOptions} />
            </CardContent>
          </Card>
        </Grid>

        {/* Highcharts for Scenario Status Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Scenario Status Distribution</Typography>
              <HighchartsReact highcharts={Highcharts} options={statusDistributionOptions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CrisisScenariosAnalytics;
