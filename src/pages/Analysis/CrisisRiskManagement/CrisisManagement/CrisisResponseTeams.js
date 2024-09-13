import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CrisisResponseTeamAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalTeams: 0,
    activeTeams: 0,
    inactiveTeams: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchItems();
      setData(result);

      // Calculate KPIs
      const totalTeams = result.length;
      const activeTeams = result.filter(team => team.status === 'active').length;
      const inactiveTeams = result.filter(team => team.status === 'inactive').length;

      setKpis({ totalTeams, activeTeams, inactiveTeams });
    };

    fetchData();
  }, [fetchItems]);

  // Highcharts configuration for Team Status Distribution
  const statusDistributionOptions = {
    chart: { type: 'pie' },
    title: { text: 'Team Status Distribution' },
    series: [
      {
        name: 'Teams',
        data: [
          { name: 'Active', y: kpis.activeTeams },
          { name: 'Inactive', y: kpis.inactiveTeams },
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
              <Typography variant="h5">Total Teams</Typography>
              <Typography variant="h4">{kpis.totalTeams}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Active Teams</Typography>
              <Typography variant="h4">{kpis.activeTeams}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5">Inactive Teams</Typography>
              <Typography variant="h4">{kpis.inactiveTeams}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Highcharts for Team Status Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Team Status Distribution</Typography>
              <HighchartsReact highcharts={Highcharts} options={statusDistributionOptions} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CrisisResponseTeamAnalytics;
