import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const RiskResponsePlanningAnalytics = ({ fetchItems }) => {
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

    const notStartedCount = data.filter(item => item.status === 'not-started').length;
    const inProgressCount = data.filter(item => item.status === 'in-progress').length;
    const completedCount = data.filter(item => item.status === 'completed').length;

    const responsiblePeopleCounts = data.reduce((acc, item) => {
        acc[item.responsiblePerson] = (acc[item.responsiblePerson] || 0) + 1;
        return acc;
    }, {});

    const statusOptions = {
        chart: { type: 'pie' },
        title: { text: 'Risk Response Status Distribution' },
        series: [
            {
                name: 'Status',
                colorByPoint: true,
                data: [
                    { name: 'Not Started', y: notStartedCount },
                    { name: 'In Progress', y: inProgressCount },
                    { name: 'Completed', y: completedCount },
                ],
            },
        ],
    };

    const responsiblePersonOptions = {
        chart: { type: 'bar' },
        title: { text: 'Actions by Responsible Person' },
        xAxis: { categories: Object.keys(responsiblePeopleCounts) },
        series: [
            {
                name: 'Tasks',
                data: Object.values(responsiblePeopleCounts),
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Risk Response Planning Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Response Plans</Typography>
                        <Typography variant="h4">{data.length}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Completed Response Plans</Typography>
                        <Typography variant="h4">{completedCount}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">In Progress Response Plans</Typography>
                        <Typography variant="h4">{inProgressCount}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={statusOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={responsiblePersonOptions} />
            </Grid>
        </Grid>
    );
};

export default RiskResponsePlanningAnalytics;
