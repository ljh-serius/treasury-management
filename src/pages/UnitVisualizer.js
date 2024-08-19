import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    CircularProgress,
    Divider,
    Chip,
    Container,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';

const Visualizer = () => {
    const { entity, id } = useParams();
    const componentName = entity.charAt(0).toUpperCase() + entity.slice(1);
    const [itemData, setItemData] = useState(null);
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadConfigAndData = async () => {
            try {
                const configModule = await import(`../components/Management/${componentName}`);
                setConfig(configModule);
            } catch (error) {
                console.error("Error loading configuration:", error);
            }
        };

        loadConfigAndData();
    }, [entity]);

    useEffect(() => {
        const fetchData = async () => {
            if (config) {
                try {
                    const data = await config.fetchItemById(id);
                    setItemData(data);
                } catch (error) {
                    console.error("Error fetching item data:", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchData();
    }, [config, id]);

    if (loading) return <CircularProgress />;

    if (!config || !itemData) return <Typography variant="h6">Invalid entity name or configuration file not found.</Typography>;

    return (
        <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
            <Card sx={{ width: '100%', mt: 4, boxShadow: 3 }}>
                <CardContent>
                    <Typography variant="h4" gutterBottom>
                        {entity.charAt(0).toUpperCase() + entity.slice(1)} Details
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Grid container spacing={2}>
                        {Object.keys(config.fieldsConfig).map((fieldKey) => {
                            const field = config.fieldsConfig[fieldKey];
                            const value = itemData[fieldKey];

                            return (
                                <Grid item xs={12} sm={6} key={fieldKey}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {field.label}:
                                    </Typography>
                                    {renderField(value, field)}
                                </Grid>
                            );
                        })}
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Visualizer;

function renderField(value, fieldConfig) {
    if (fieldConfig.type === 'select' && Array.isArray(fieldConfig.options)) {
        if (Array.isArray(value)) {
            return (
                <Box display="flex" flexWrap="wrap" mt={1}>
                    {value.map(val => {
                        const optionLabel = fieldConfig.options.find(opt => opt.id === val)?.label;
                        return optionLabel ? (
                            <Link to={`${fieldConfig.link}/${val}`}>
                                <Chip
                                key={val}
                                label={optionLabel}
                                color="primary"
                                variant="outlined"
                                style={{ margin: '4px' }}
                            />
                         </Link>
                        ) : null;
                    })}
                </Box>
            );
        } else {
            const optionLabel = fieldConfig.options.find(opt => opt.id === value)?.label;
            return (
                <Box mt={1}>
                    {optionLabel ? (
                        <Chip label={optionLabel} color="primary" variant="outlined" />
                    ) : 'N/A'}
                </Box>
            );
        }
    }

    if (fieldConfig.type === 'date') {
        return <Typography variant="body1">{new Date(value).toLocaleDateString()}</Typography>;
    }

    if (fieldConfig.type === 'checkbox') {
        return <Typography variant="body1">{value ? 'Yes' : 'No'}</Typography>;
    }

    return <Typography variant="body1">{value || 'N/A'}</Typography>;
}
