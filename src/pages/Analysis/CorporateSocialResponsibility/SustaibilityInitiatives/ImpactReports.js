import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const ImpactReportsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalReports: 0,
    totalFinancialImpact: 0,
    draftReports: 0,
    finalReports: 0,
    archivedReports: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const reports = await fetchItems();
      setData(reports);
      calculateKPIs(reports);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (reports) => {
    const totalReports = reports.length;
    const totalFinancialImpact = reports.reduce((sum, report) => sum + report.financialImpact, 0);
    const draftReports = reports.filter((report) => report.status === 'draft').length;
    const finalReports = reports.filter((report) => report.status === 'final').length;
    const archivedReports = reports.filter((report) => report.status === 'archived').length;

    setKpis({
      totalReports,
      totalFinancialImpact,
      draftReports,
      finalReports,
      archivedReports,
    });
  };

  const reportStatusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Report Status Distribution',
    },
    series: [
      {
        name: 'Reports',
        colorByPoint: true,
        data: [
          { name: 'Draft', y: kpis.draftReports },
          { name: 'Final', y: kpis.finalReports },
          { name: 'Archived', y: kpis.archivedReports },
        ],
      },
    ],
  };

  const financialImpactChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Financial Impact per Report',
    },
    xAxis: {
      categories: data.map((report) => report.reportTitle),
    },
    yAxis: {
      title: {
        text: 'Financial Impact ($)',
      },
    },
    series: [
      {
        name: 'Financial Impact',
        data: data.map((report) => report.financialImpact),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Impact Reports Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Reports</Typography>
              <Typography variant="h4">{kpis.totalReports}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Financial Impact</Typography>
              <Typography variant="h4">${kpis.totalFinancialImpact.toLocaleString()}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Draft Reports</Typography>
              <Typography variant="h4">{kpis.draftReports}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Final Reports</Typography>
              <Typography variant="h4">{kpis.finalReports}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Archived Reports</Typography>
              <Typography variant="h4">{kpis.archivedReports}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={reportStatusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={financialImpactChart} />
      </Box>
    </Box>
  );
};

export default ImpactReportsAnalytics;
