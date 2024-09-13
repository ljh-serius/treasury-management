import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RiskIdentificationAnalytics = ({ fetchItems }) => {
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

    const highRiskCount = data.filter(item => item.likelihood === 'high').length;
    const mediumRiskCount = data.filter(item => item.likelihood === 'medium').length;
    const lowRiskCount = data.filter(item => item.likelihood === 'low').length;

    const highImpactCount = data.filter(item => item.impact === 'high').length;
    const mediumImpactCount = data.filter(item => item.impact === 'medium').length;
    const lowImpactCount = data.filter(item => item.impact === 'low').length;

    const statusCounts = data.reduce((acc, item) => {
        acc[item.status] = (acc[item.status] || 0) + 1;
        return acc;
    }, {});

    const riskLikelihoodOptions = {
        chart: { type: 'pie' },
        title: { text: 'Risk Likelihood Distribution' },
        series: [
            {
                name: 'Likelihood',
                colorByPoint: true,
                data: [
                    { name: 'High', y: highRiskCount },
                    { name: 'Medium', y: mediumRiskCount },
                    { name: 'Low', y: lowRiskCount },
                ],
            },
        ],
    };

    const riskImpactOptions = {
        chart: { type: 'pie' },
        title: { text: 'Risk Impact Distribution' },
        series: [
            {
                name: 'Impact',
                colorByPoint: true,
                data: [
                    { name: 'High', y: highImpactCount },
                    { name: 'Medium', y: mediumImpactCount },
                    { name: 'Low', y: lowImpactCount },
                ],
            },
        ],
    };

    const statusOptions = {
        chart: { type: 'column' },
        title: { text: 'Risk Status Distribution' },
        xAxis: { categories: Object.keys(statusCounts) },
        series: [
            {
                name: 'Status',
                data: Object.values(statusCounts),
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Risk Identification Analytics</Typography>
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
                        <Typography variant="h6">High Risk Likelihood</Typography>
                        <Typography variant="h4">{highRiskCount}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">High Risk Impact</Typography>
                        <Typography variant="h4">{highImpactCount}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={riskLikelihoodOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={riskImpactOptions} />
            </Grid>

            <Grid item xs={12}>
                <HighchartsReact highcharts={Highcharts} options={statusOptions} />
            </Grid>
        </Grid>
    );
};

export default RiskIdentificationAnalytics;
