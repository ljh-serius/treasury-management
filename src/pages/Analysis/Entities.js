import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Grid, Card, CardContent, Typography, Container, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

const EntitiesAnalysis = ({ fetchItems }) => {
    const [entitiesData, setEntitiesData] = useState([]);
    const [statusDistribution, setStatusDistribution] = useState([]);
    const [typeDistribution, setTypeDistribution] = useState([]);
    const [regionDistribution, setRegionDistribution] = useState([]);
    const [entitiesByManager, setEntitiesByManager] = useState([]);
    const [entitiesOverTime, setEntitiesOverTime] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        async function loadData() {
            setLoading(true); // Start loading
            const entities = await fetchItems();
            setEntitiesData(entities);
            analyzeData(entities);
            setLoading(false); // Stop loading
        }

        loadData();
    }, [fetchItems]);

    const analyzeData = (entities) => {
        // Calculate distribution by status
        const statusDist = entities.reduce((acc, entity) => {
            acc[entity.status] = (acc[entity.status] || 0) + 1;
            return acc;
        }, {});
        const statusData = Object.keys(statusDist).map(key => ({
            name: key,
            y: statusDist[key],
        }));
        setStatusDistribution(statusData);

        // Calculate distribution by type
        const typeDist = entities.reduce((acc, entity) => {
            acc[entity.type] = (acc[entity.type] || 0) + 1;
            return acc;
        }, {});
        const typeData = Object.keys(typeDist).map(key => ({
            name: key,
            y: typeDist[key],
        }));
        setTypeDistribution(typeData);

        // Calculate distribution by region
        const regionDist = entities.reduce((acc, entity) => {
            acc[entity.region] = (acc[entity.region] || 0) + 1;
            return acc;
        }, {});
        const regionData = Object.keys(regionDist).map(key => ({
            name: key,
            y: regionDist[key],
        }));
        setRegionDistribution(regionData);

        // Calculate entities managed by each manager
        const managerDist = entities.reduce((acc, entity) => {
            acc[entity.managerId] = (acc[entity.managerId] || 0) + 1;
            return acc;
        }, {});
        const managerData = Object.keys(managerDist).map(key => ({
            name: key,
            y: managerDist[key],
        }));
        setEntitiesByManager(managerData);

        // Calculate entities added over time (monthly)
        const timeDist = entities.reduce((acc, entity) => {
            const month = new Date(entity.creationDate).toLocaleString('default', { month: 'short', year: 'numeric' });
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
        const timeData = Object.keys(timeDist).map(key => ({
            name: key,
            y: timeDist[key],
        }));
        setEntitiesOverTime(timeData);
    };

    // Highcharts options for status distribution
    const statusOptions = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Entities by Status',
        },
        series: [
            {
                name: 'Entities',
                colorByPoint: true,
                data: statusDistribution,
            },
        ],
    };

    // Highcharts options for type distribution
    const typeOptions = {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Entities by Type',
        },
        series: [
            {
                name: 'Entities',
                colorByPoint: true,
                data: typeDistribution,
            },
        ],
    };

    // Highcharts options for region distribution
    const regionOptions = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Entities by Region',
        },
        xAxis: {
            categories: regionDistribution.map(region => region.name),
            title: {
                text: 'Region',
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Entities',
            },
        },
        series: [
            {
                name: 'Entities',
                data: regionDistribution.map(region => region.y),
            },
        ],
    };

    // Highcharts options for entities by manager
    const managerOptions = {
        chart: {
            type: 'bar',
        },
        title: {
            text: 'Entities Managed by Each Manager',
        },
        xAxis: {
            categories: entitiesByManager.map(manager => manager.name),
            title: {
                text: 'Manager',
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Entities',
            },
        },
        series: [
            {
                name: 'Entities',
                data: entitiesByManager.map(manager => manager.y),
            },
        ],
    };

    // Highcharts options for entities over time
    const timeOptions = {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Entities Added Over Time',
        },
        xAxis: {
            categories: entitiesOverTime.map(time => time.name),
            title: {
                text: 'Time (Monthly)',
            },
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number of Entities',
            },
        },
        series: [
            {
                name: 'Entities',
                data: entitiesOverTime.map(time => time.y),
            },
        ],
    };

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Box sx={{ padding: 4 }}>
                <Grid container spacing={3}>
                    {/* Status Distribution Chart */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Entities by Status
                                </Typography>
                                <HighchartsReact highcharts={Highcharts} options={statusOptions} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Type Distribution Chart */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Entities by Type
                                </Typography>
                                <HighchartsReact highcharts={Highcharts} options={typeOptions} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Region Distribution Chart */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Entities by Region
                                </Typography>
                                <HighchartsReact highcharts={Highcharts} options={regionOptions} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Entities by Manager Chart */}
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Entities Managed by Each Manager
                                </Typography>
                                <HighchartsReact highcharts={Highcharts} options={managerOptions} />
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Entities Over Time Chart */}
                    <Grid item xs={12}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" component="div">
                                    Entities Added Over Time
                                </Typography>
                                <HighchartsReact highcharts={Highcharts} options={timeOptions} />
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default EntitiesAnalysis;
