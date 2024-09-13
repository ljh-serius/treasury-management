import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const EmployeePortalAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalPortals: 0,
    activePortals: 0,
    maintenancePortals: 0,
    decommissionedPortals: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const portals = await fetchItems();
      setData(portals);
      calculateKPIs(portals);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (portals) => {
    const totalPortals = portals.length;
    const activePortals = portals.filter((p) => p.status === 'active').length;
    const maintenancePortals = portals.filter((p) => p.status === 'maintenance').length;
    const decommissionedPortals = portals.filter((p) => p.status === 'decommissioned').length;

    setKpis({
      totalPortals,
      activePortals,
      maintenancePortals,
      decommissionedPortals,
    });
  };

  const portalStatusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Portal Status Distribution',
    },
    series: [
      {
        name: 'Portals',
        colorByPoint: true,
        data: [
          { name: 'Active', y: kpis.activePortals },
          { name: 'Under Maintenance', y: kpis.maintenancePortals },
          { name: 'Decommissioned', y: kpis.decommissionedPortals },
        ],
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Employee Portals Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Portals</Typography>
              <Typography variant="h4">{kpis.totalPortals}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Active Portals</Typography>
              <Typography variant="h4">{kpis.activePortals}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Under Maintenance</Typography>
              <Typography variant="h4">{kpis.maintenancePortals}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Decommissioned Portals</Typography>
              <Typography variant="h4">{kpis.decommissionedPortals}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={portalStatusChart} />
      </Box>
    </Box>
  );
};

export default EmployeePortalAnalytics;
