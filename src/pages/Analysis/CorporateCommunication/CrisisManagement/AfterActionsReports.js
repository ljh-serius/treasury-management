import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AfterActionReportsAnalytics = ({ fetchItems }) => {
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

    const draftReports = data.filter(item => item.status === 'draft').length;
    const finalReports = data.filter(item => item.status === 'final').length;
    const archivedReports = data.filter(item => item.status === 'archived').length;

    const statusOptions = {
        chart: { type: 'pie' },
        title: { text: 'Report Status Distribution' },
        series: [
            {
                name: 'Reports',
                colorByPoint: true,
                data: [
                    { name: 'Draft', y: draftReports },
                    { name: 'Final', y: finalReports },
                    { name: 'Archived', y: archivedReports },
                ],
            },
        ],
    };

    const preparedByCounts = data.reduce((acc, item) => {
        acc[item.preparedBy] = (acc[item.preparedBy] || 0) + 1;
        return acc;
    }, {});

    const preparedByOptions = {
        chart: { type: 'column' },
        title: { text: 'Reports Prepared by Individuals' },
        xAxis: { categories: Object.keys(preparedByCounts) },
        series: [
            {
                name: 'Reports',
                data: Object.values(preparedByCounts),
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">After-Action Reports Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Reports</Typography>
                        <Typography variant="h4">{data.length}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Draft Reports</Typography>
                        <Typography variant="h4">{draftReports}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Final Reports</Typography>
                        <Typography variant="h4">{finalReports}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={statusOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={preparedByOptions} />
            </Grid>
        </Grid>
    );
};

export default AfterActionReportsAnalytics;
