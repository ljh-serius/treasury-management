import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';

const BusinessContinuityPlansAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const items = await fetchItems(); // Fetching data using the function passed as prop
            setData(items);
            setLoading(false);
        }
        fetchData();
    }, [fetchItems]);

    if (loading) {
        return <Typography>Loading...</Typography>;
    }

    const totalPlans = data.length;
    const activePlans = data.filter(plan => plan.status === 'active').length;
    const archivedPlans = data.filter(plan => plan.status === 'archived').length;

    const statusChartOptions = {
        title: { text: 'Plan Status Distribution' },
        chart: { type: 'pie' },
        series: [
            {
                name: 'Plans',
                colorByPoint: true,
                data: [
                    { name: 'Draft', y: data.filter(plan => plan.status === 'draft').length },
                    { name: 'Active', y: activePlans },
                    { name: 'Archived', y: archivedPlans },
                ],
            },
        ],
    };

    const reviewDateChartOptions = {
        title: { text: 'Plans by Review Date' },
        chart: { type: 'line' },
        xAxis: {
            categories: data.map(plan => new Date(plan.reviewDate).getFullYear()),
        },
        series: [
            {
                name: 'Plans',
                data: data.map(plan => new Date(plan.reviewDate).getTime()),
            },
        ],
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
                Business Continuity Plans Analytics
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Total Plans</Typography>
                        <Typography variant="h4">{totalPlans}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Active Plans</Typography>
                        <Typography variant="h4">{activePlans}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">Archived Plans</Typography>
                        <Typography variant="h4">{archivedPlans}</Typography>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} sx={{ marginTop: 3 }}>
                <Grid item xs={12} md={6}>
                    <HighchartsReact highcharts={Highcharts} options={statusChartOptions} />
                </Grid>
                <Grid item xs={12} md={6}>
                    <HighchartsReact highcharts={Highcharts} options={reviewDateChartOptions} />
                </Grid>
            </Grid>
        </Box>
    );
};

export default BusinessContinuityPlansAnalytics;
