import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, CircularProgress } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const AnnouncementsAnalytics = ({ fetchItems }) => {
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
    const totalAnnouncements = data.length;
    const urgentAnnouncements = data.filter(item => item.tags.includes('urgent')).length;

    const announcementsByAudience = {
        allEmployees: data.filter(item => item.audience === 'all-employees').length,
        management: data.filter(item => item.audience === 'management').length,
        departmentSpecific: data.filter(item => item.audience === 'department-specific').length,
    };

    // Highcharts options
    const audienceDistributionOptions = {
        chart: { type: 'pie' },
        title: { text: 'Audience Distribution' },
        series: [
            {
                name: 'Audience',
                colorByPoint: true,
                data: [
                    { name: 'All Employees', y: announcementsByAudience.allEmployees },
                    { name: 'Management', y: announcementsByAudience.management },
                    { name: 'Department Specific', y: announcementsByAudience.departmentSpecific },
                ],
            },
        ],
    };

    const urgentAnnouncementOptions = {
        chart: { type: 'bar' },
        title: { text: 'Urgent Announcements' },
        xAxis: { categories: ['Urgent', 'Non-Urgent'] },
        series: [
            {
                name: 'Urgency',
                data: [urgentAnnouncements, totalAnnouncements - urgentAnnouncements],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Typography variant="h4">Announcements Analytics</Typography>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Announcements</Typography>
                        <Typography variant="h4">{totalAnnouncements}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={4}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Urgent Announcements</Typography>
                        <Typography variant="h4">{urgentAnnouncements}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={audienceDistributionOptions} />
            </Grid>

            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={urgentAnnouncementOptions} />
            </Grid>
        </Grid>
    );
};

export default AnnouncementsAnalytics;
