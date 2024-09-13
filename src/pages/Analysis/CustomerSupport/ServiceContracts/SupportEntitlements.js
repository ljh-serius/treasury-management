import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const SupportEntitlementsAnalytics = ({ fetchItems }) => {
    const [data, setData] = useState([]);
    const [kpis, setKpis] = useState({
        totalEntitlements: 0,
        activeEntitlements: 0,
        expiredEntitlements: 0,
        premiumSupport: 0,
    });

    useEffect(() => {
        fetchItems().then((response) => {
            setData(response);
            calculateKpis(response);
        });
    }, [fetchItems]);

    const calculateKpis = (items) => {
        const totalEntitlements = items.length;
        const activeEntitlements = items.filter(
            (item) => new Date(item.validityEndDate) > new Date()
        ).length;
        const expiredEntitlements = totalEntitlements - activeEntitlements;
        const premiumSupport = items.filter((item) => item.supportLevel === 'premium').length;

        setKpis({
            totalEntitlements,
            activeEntitlements,
            expiredEntitlements,
            premiumSupport,
        });
    };

    // Chart configurations for Support Levels
    const supportLevelChartOptions = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Support Level Distribution',
        },
        series: [
            {
                name: 'Support Level',
                colorByPoint: true,
                data: [
                    {
                        name: 'Basic',
                        y: data.filter((item) => item.supportLevel === 'basic').length,
                    },
                    {
                        name: 'Premium',
                        y: data.filter((item) => item.supportLevel === 'premium').length,
                    },
                    {
                        name: 'Enterprise',
                        y: data.filter((item) => item.supportLevel === 'enterprise').length,
                    },
                ],
            },
        ],
    };

    // Chart configurations for Active vs Expired Entitlements
    const entitlementsChartOptions = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Entitlements Status',
        },
        xAxis: {
            categories: ['Entitlements'],
        },
        series: [
            {
                name: 'Active',
                data: [kpis.activeEntitlements],
            },
            {
                name: 'Expired',
                data: [kpis.expiredEntitlements],
            },
        ],
    };

    return (
        <Grid container spacing={3}>
            {/* KPIs */}
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Total Entitlements</Typography>
                        <Typography variant="h4">{kpis.totalEntitlements}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Active Entitlements</Typography>
                        <Typography variant="h4">{kpis.activeEntitlements}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Expired Entitlements</Typography>
                        <Typography variant="h4">{kpis.expiredEntitlements}</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <Card>
                    <CardContent>
                        <Typography variant="h6">Premium Support</Typography>
                        <Typography variant="h4">{kpis.premiumSupport}</Typography>
                    </CardContent>
                </Card>
            </Grid>

            {/* Charts */}
            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={supportLevelChartOptions} />
            </Grid>
            <Grid item xs={12} md={6}>
                <HighchartsReact highcharts={Highcharts} options={entitlementsChartOptions} />
            </Grid>
        </Grid>
    );
};

export default SupportEntitlementsAnalytics;
