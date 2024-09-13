import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const CrisisResponsePlansAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const result = await fetchItems();
            setData(result);
            setLoading(false);
        }
        fetchData();
    }, [fetchItems]);

    if (loading) {
        return <CircularProgress />;
    }

    // Calculate KPIs
    const totalPlans = data.length;
    const draftPlans = data.filter(plan => plan.status === 'draft').length;
    const activePlans = data.filter(plan => plan.status === 'active').length;
    const archivedPlans = data.filter(plan => plan.status === 'archived').length;

    // Highcharts options
    const statusOptions = {
        chart: { type: 'pie' },
        title: { text: 'Plan Status Distribution' },
        series: [
            {
                name: 'Plans',
                colorByPoint: true,
                data: [
                    { name: 'Draft', y: draftPlans },
                    { name: 'Active', y: activePlans },
                    { name: 'Archived', y: archivedPlans },
                ],
            },
        ],
    };

    const lastUpdatedCounts = data.reduce((acc, plan) => {
        const date = new Date(plan.lastUpdated).toLocaleDateString();
        acc[date] = (acc[date] || 0) + 1;
        return acc;
    }, {});

    const lastUpdatedOptions = {
        chart: { type: 'column' },
        title: { text: 'Last Updated Plans Over Time' },
        xAxis: { categories: Object.keys(lastUpdatedCounts) },
        series: [
            {
                name: 'Plans',
                data: Object.values(lastUpdatedCounts),
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Crisis Response Plans Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Plans</Typography>
                        <Typography variant="h4">{totalPlans}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Active Plans</Typography>
                        <Typography variant="h4">{activePlans}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Draft Plans</Typography>
                        <Typography variant="h4">{draftPlans}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={statusOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={lastUpdatedOptions} />
            </Grid>
        </Grid>
    );
};

export default CrisisResponsePlansAnalytics;
