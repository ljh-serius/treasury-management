import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Box, Typography, Grid, Card, CardContent, Container, CircularProgress, Backdrop } from '@mui/material';

export default function ROIAnalysisDashboard({ fetchItems }) {
  const [analysisData, setAnalysisData] = useState([]);
  const [roiOverTime, setROIOverTime] = useState([]);
  const [costAnalysis, setCostAnalysis] = useState([]);
  const [conversionRate, setConversionRate] = useState(0);
  const [totalROI, setTotalROI] = useState(0);
  const [averageROI, setAverageROI] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      setLoading(true);
      const data = await fetchItems();
      setAnalysisData(data);
      processAnalysisData(data);
      setLoading(false);
    };

    fetchDataAsync();
  }, [fetchItems]);

  const processAnalysisData = (data) => {
    // Total ROI
    const totalROIValue = data.reduce((acc, analysis) => acc + Number(analysis.roiValue), 0);
    setTotalROI(totalROIValue);

    // Average ROI
    setAverageROI(totalROIValue / data.length);

    // ROI Over Time
    const roiTimeData = data.map(analysis => ({
      date: new Date(analysis.recordedDate).getTime(),
      value: Number(analysis.roiValue),
    })).sort((a, b) => a.date - b.date);
    setROIOverTime(roiTimeData);

    // Conversion Rate (assuming we have this data in the description or tags)
    const conversions = data.filter(analysis => analysis.tags.includes('conversion-rate'));
    setConversionRate((conversions.length / data.length) * 100);

    // Cost Analysis (for chart)
    const costData = data.reduce((acc, analysis) => {
      const campaignName = `Campaign ${analysis.campaignId.slice(-4)}`;
      acc[campaignName] = (acc[campaignName] || 0) + Number(analysis.roiValue);
      return acc;
    }, {});
    setCostAnalysis(Object.keys(costData).map(key => ({
      name: key,
      y: costData[key],
    })));
  };

  // Highcharts options
  const roiChartOptions = {
    chart: { type: 'line' },
    title: { text: 'ROI Over Time' },
    xAxis: { type: 'datetime', title: { text: 'Date' } },
    yAxis: { title: { text: 'ROI Value' } },
    series: [{ name: 'ROI', data: roiOverTime.map(item => [item.date, item.value]) }],
  };

  const conversionRateChartOptions = {
    chart: { type: 'pie' },
    title: { text: 'Conversion Rate' },
    series: [{
      name: 'Conversion Rate',
      data: [
        { name: 'Converted', y: conversionRate },
        { name: 'Not Converted', y: 100 - conversionRate },
      ],
    }],
  };

  const costAnalysisChartOptions = {
    chart: { type: 'column' },
    title: { text: 'Cost Analysis by Campaign' },
    series: [{ name: 'Cost', data: costAnalysis }],
  };

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box sx={{ padding: 4 }}>
        <Typography variant="h4" gutterBottom>
          ROI Analysis Dashboard
        </Typography>

        <Grid container spacing={4}>
          {/* KPIs Section */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Total ROI</Typography>
                <Typography variant="h4" color="green" sx={{ fontWeight: 'bold' }}>
                  ${totalROI.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Average ROI</Typography>
                <Typography variant="h4" color="blue" sx={{ fontWeight: 'bold' }}>
                  ${averageROI.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="h6">Conversion Rate</Typography>
                <Typography variant="h4" color="purple" sx={{ fontWeight: 'bold' }}>
                  {conversionRate.toFixed(2)}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={4} sx={{ marginTop: 4 }}>
          {/* ROI Over Time */}
          <Grid item xs={12}>
            <HighchartsReact highcharts={Highcharts} options={roiChartOptions} />
          </Grid>

          {/* Conversion Rate Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={conversionRateChartOptions} />
          </Grid>

          {/* Cost Analysis Chart */}
          <Grid item xs={12} md={6}>
            <HighchartsReact highcharts={Highcharts} options={costAnalysisChartOptions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
