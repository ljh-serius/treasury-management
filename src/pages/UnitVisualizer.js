import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Visualizer = () => {
    const { entity, id } = useParams(); // Get entity and id from the URL
    const componentName = entity.charAt(0).toLocaleUpperCase() + entity.slice(1);
    const [itemData, setItemData] = useState(null);
    const [config, setConfig] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadConfigAndData = async () => {
            try {
                // Dynamically import the config file based on the entity
                const configModule = await import(`../components/Management/${componentName}`);
                setConfig(configModule); // Assume each config exports `fieldsConfig`
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
    }, [config, entity, id]);

    if (loading) return <p>Loading...</p>;

    console.log("Config", config)

    if (!config || !itemData) return <p>Invalid entity name or configuration file not found.</p>;

    return (
        <div>
            {Object.keys(config.fieldsConfig).map((fieldKey) => {
                const field = config.fieldsConfig[fieldKey];
                const value = itemData[fieldKey];

                return (
                    <div key={fieldKey} style={{ marginBottom: '10px' }}>
                        <strong>{field.label}:</strong> {renderField(value, field)}
                    </div>
                );
            })}
        </div>
    );
};

function renderField(value, fieldConfig) {
    if (fieldConfig.type === 'select' && Array.isArray(fieldConfig.options)) {
        const optionLabels = Array.isArray(value)
            ? value.map(val => fieldConfig.options.find(opt => opt.id === val)?.label).join(', ')
            : fieldConfig.options.find(opt => opt.id === value)?.label;

        return optionLabels || 'N/A';
    }

    if (fieldConfig.type === 'date') {
        return new Date(value).toLocaleDateString();
    }

    if (fieldConfig.type === 'checkbox') {
        return value ? 'Yes' : 'No';
    }

    return value || 'N/A';
}

export default Visualizer;
