import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const TaxFilingsAnalytics = ({ fetchItems }) => {
  const [data, setData] = useState([]);
  const [kpis, setKpis] = useState({
    totalFilings: 0,
    filedFilings: 0,
    dueFilings: 0,
    overdueFilings: 0,
    totalTaxAmount: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const filings = await fetchItems();
      setData(filings);
      calculateKPIs(filings);
    };

    loadData();
  }, [fetchItems]);

  const calculateKPIs = (items) => {
    const totalFilings = items.length;
    const filedFilings = items.filter((item) => item.status === 'filed').length;
    const dueFilings = items.filter((item) => item.status === 'due').length;
    const overdueFilings = items.filter((item) => item.status === 'overdue').length;
    const totalTaxAmount = items.reduce((acc, curr) => acc + parseFloat(curr.taxAmount || 0), 0);

    setKpis({
      totalFilings,
      filedFilings,
      dueFilings,
      overdueFilings,
      totalTaxAmount: totalTaxAmount.toFixed(2),
    });
  };

  const statusChart = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Tax Filing Status Distribution',
    },
    series: [
      {
        name: 'Filings',
        colorByPoint: true,
        data: [
          { name: 'Filed', y: kpis.filedFilings },
          { name: 'Due', y: kpis.dueFilings },
          { name: 'Overdue', y: kpis.overdueFilings },
        ],
      },
    ],
  };

  const taxAmountChart = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Tax Amounts by Year',
    },
    xAxis: {
      categories: data.map((item) => item.taxYear),
    },
    yAxis: {
      title: {
        text: 'Tax Amount',
      },
    },
    series: [
      {
        name: 'Tax Amount',
        data: data.map((item) => parseFloat(item.taxAmount || 0)),
      },
    ],
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Tax Filings Analytics
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Filings</Typography>
              <Typography variant="h4">{kpis.totalFilings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Filed Filings</Typography>
              <Typography variant="h4">{kpis.filedFilings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Due Filings</Typography>
              <Typography variant="h4">{kpis.dueFilings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Overdue Filings</Typography>
              <Typography variant="h4">{kpis.overdueFilings}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Tax Amount</Typography>
              <Typography variant="h4">${kpis.totalTaxAmount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={statusChart} />
      </Box>

      <Box mt={4}>
        <HighchartsReact highcharts={Highcharts} options={taxAmountChart} />
      </Box>
    </Box>
  );
};

export default TaxFilingsAnalytics;
