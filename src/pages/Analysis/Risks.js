import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, Backdrop, CircularProgress } from '@mui/material';

export default function ExtendedRiskAnalysisDashboard({ fetchItems }) {
  const [risksData, setRisksData] = useState([]);
  const [riskSeverityDistribution, setRiskSeverityDistribution] = useState([]);
  const [riskTypeDistribution, setRiskTypeDistribution] = useState([]);
  const [riskTrendData, setRiskTrendData] = useState([]);
  const [financialImpactData, setFinancialImpactData] = useState([]);
  const [riskOwnerDistribution, setRiskOwnerDistribution] = useState([]);
  const [overallRiskLevel, setOverallRiskLevel] = useState('Safe');
  const [totalFinancialImpact, setTotalFinancialImpact] = useState(0);
  const [topRisks, setTopRisks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      const data = await fetchItems();
      setRisksData(data);
      processRiskData(data);
      setLoading(false); // Stop loading
    };

    fetchData();
  }, [fetchItems]);

  const processRiskData = (data) => {
    // Risk Severity Distribution
    const severityCounts = data.reduce((acc, risk) => {
      acc[risk.severity] = (acc[risk.severity] || 0) + 1;
      return acc;
    }, {});

    setRiskSeverityDistribution(Object.keys(severityCounts).map(key => ({
      name: key,
      y: severityCounts[key],
      riskNames: data.filter(risk => risk.severity === key).map(risk => risk.riskName).join(', ')
    })));

    // Risk Type Distribution
    const typeCounts = data.reduce((acc, risk) => {
      acc[risk.riskType] = (acc[risk.riskType] || 0) + 1;
      return acc;
    }, {});

    setRiskTypeDistribution(Object.keys(typeCounts).map(key => ({
      name: key,
      y: typeCounts[key],
      riskNames: data.filter(risk => risk.riskType === key).map(risk => risk.riskName).join(', ')
    })));

    // Risk Trend Data (Monthly trends of new risks)
    const trendCounts = data.reduce((acc, risk) => {
      const month = new Date(risk.createdDate).getMonth() + 1; // Get month from date
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    setRiskTrendData(Object.keys(trendCounts).map(key => ({
      name: `Month ${key}`,
      y: trendCounts[key],
    })));

    // Financial Impact Data
    const financialImpact = data.reduce((acc, risk) => {
      const impact = Number(risk.financialImpact) || 0; // Ensure financialImpact is a number
      acc.total += impact;
      acc.breakdown.push({ name: risk.riskName, y: impact });
      return acc;
    }, { total: 0, breakdown: [] });

    setTotalFinancialImpact(financialImpact.total);
    setFinancialImpactData(financialImpact.breakdown);

    // Risk Owner Distribution
    const ownerCounts = data.reduce((acc, risk) => {
      acc[risk.owner] = (acc[risk.owner] || 0) + 1;
      return acc;
    }, {});

    setRiskOwnerDistribution(Object.keys(ownerCounts).map(key => ({
      name: key,
      y: ownerCounts[key],
    })));

    // Overall Risk Level (simplified logic)
    const highOrCriticalRisks = data.filter(risk => risk.severity === 'High' || risk.severity === 'Critical');
    setOverallRiskLevel(highOrCriticalRisks.length > 10 ? 'Threatened' : 'Safe');

    // Top 5 Risks (by severity and impact)
    const topRisksList = data
      .sort((a, b) => (b.severity === 'Critical' ? 1 : 0) - (a.severity === 'Critical' ? 1 : 0) || (Number(b.financialImpact) || 0) - (Number(a.financialImpact) || 0))
      .slice(0, 5);
    setTopRisks(topRisksList);
  };

  const severityChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Risk Severity Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b><br/>Risks: {point.riskNames}'
    },
    series: [
      {
        name: 'Risks',
        colorByPoint: true,
        data: riskSeverityDistribution,
      },
    ],
  };

  const typeChartOptions = {
    chart: {
      type: 'pie',
    },
    title: {
      text: 'Risk Type Distribution',
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.y}</b><br/>Risks: {point.riskNames}'
    },
    series: [
      {
        name: 'Risks',
        colorByPoint: true,
        data: riskTypeDistribution,
      },
    ],
  };

  const trendChartOptions = {
    chart: {
      type: 'line',
    },
    title: {
      text: 'Risk Trends Over Time',
    },
    xAxis: {
      categories: riskTrendData.map(data => data.name),
    },
    series: [
      {
        name: 'Number of Risks',
        data: riskTrendData.map(data => data.y),
      },
    ],
  };

  const financialImpactChartOptions = {
    chart: {
      type: 'column',
    },
    title: {
      text: 'Financial Impact of Risks',
    },
    tooltip: {
      pointFormat: '<b>{point.name}</b>: ${point.y:.2f}'
    },
    series: [
      {
        name: 'Financial Impact',
        data: financialImpactData,
      },
    ],
  };

  const ownerDistributionChartOptions = {
    chart: {
      type: 'bar',
    },
    title: {
      text: 'Risk Ownership Distribution',
    },
    series: [
      {
        name: 'Risks',
        data: riskOwnerDistribution,
      },
    ],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          Risk Analysis Dashboard
        </Typography>
        <Grid container spacing={4}>
          {/* KPI Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Overall Risk Level</Typography>
                <Typography
                  variant="h4"
                  color={overallRiskLevel === 'Safe' ? 'green' : 'red'}
                  sx={{ fontWeight: 'bold' }}
                >
                  {overallRiskLevel}
                </Typography>
                <Typography variant="body2">
                  {overallRiskLevel === 'Safe'
                    ? 'The company is currently in a safe state with manageable risks.'
                    : 'The company is threatened by high or critical risks.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total Financial Impact</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${totalFinancialImpact.toFixed(2)}
                </Typography>
                <Typography variant="body2">
                  This represents the total financial exposure due to identified risks.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Top 5 Risks</Typography>
                <ol>
                  {topRisks.map(risk => (
                    <li key={risk.riskId}>
                      <Typography variant="body2">
                        {risk.riskName} - Severity: {risk.severity} - Impact: ${Number(risk.financialImpact || 0).toFixed(2)}
                      </Typography>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>
          </Grid>

          {/* Chart Section */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={severityChartOptions} />
          </Grid>
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={typeChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={trendChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={financialImpactChartOptions} />
          </Grid>
          <Grid item xs={12} md={12}>
            <HighchartsReact highcharts={Highcharts} options={ownerDistributionChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
