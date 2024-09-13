import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RiskScoringAnalytics = ({ fetchItems }) => {
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

    const highRiskCount = data.filter(item => item.overallRiskScore > 75).length;
    const mediumRiskCount = data.filter(item => item.overallRiskScore > 50 && item.overallRiskScore <= 75).length;
    const lowRiskCount = data.filter(item => item.overallRiskScore <= 50).length;

    const statusCounts = data.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {});

    const likelihoodCounts = data.reduce((acc, item) => {
        acc[item.likelihoodScore] = (acc[item.likelihoodScore] || 0) + 1;
        return acc;
    }, {});

    const statusOptions = {
        chart: { type: 'pie' },
        title: { text: 'Risk Status Distribution' },
        series: [
            {
                name: 'Status',
                colorByPoint: true,
                data: [
                    { name: 'Active', y: statusCounts.active || 0 },
                    { name: 'Mitigated', y: statusCounts.mitigated || 0 },
                    { name: 'Archived', y: statusCounts.archived || 0 },
                ],
            },
        ],
    };

    const likelihoodOptions = {
        chart: { type: 'column' },
        title: { text: 'Likelihood Score Distribution' },
        xAxis: { categories: ['High', 'Medium', 'Low'] },
        series: [
            {
                name: 'Likelihood Score',
                data: [
                    likelihoodCounts.high || 0,
                    likelihoodCounts.medium || 0,
                    likelihoodCounts.low || 0,
                ],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Risk Scoring Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Risks</Typography>
                        <Typography variant="h4">{data.length}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">High Risks</Typography>
                        <Typography variant="h4">{highRiskCount}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Medium Risks</Typography>
                        <Typography variant="h4">{mediumRiskCount}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={statusOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={likelihoodOptions} />
            </Grid>
        </Grid>
    );
};

export default RiskScoringAnalytics;
