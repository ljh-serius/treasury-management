import React, { useState, useEffect } from 'react';
import BaseManagementComponent from '../components/BaseManagementComponent/BaseManagementComponent';
import { useParams } from 'react-router-dom';

function ManagementComponent({ showAnalytics }) {
    const { entity } = useParams();
    const capitalizedComponentName = entity.charAt(0).toUpperCase() + entity.slice(1);

    const [config, setConfig] = useState(null);
    const [AnalysisComponent, setAnalysisComponent] = useState(null);

    useEffect(() => {
        const loadConfig = async () => {
            try {
                console.log("File to import :", `../components/Management/${capitalizedComponentName}`)
                const configModule = await import(`../components/Management/${capitalizedComponentName}`);
                const analysisModule = await import(`./Analysis/${capitalizedComponentName}`);

                setConfig({
                    fieldsConfig: configModule.fieldsConfig,
                    entityName: configModule.entityName,
                    fetchItems: configModule.fetchItems,
                    addItem: configModule.addItem,
                    updateItem: configModule.updateItem,
                    deleteItem: configModule.deleteItem,
                    headCells: configModule.headCells,
                });

                setAnalysisComponent(() => analysisModule.default);
            } catch (error) {
                console.error('Error loading modules:', error);
            }
        };

        loadConfig();
    }, [capitalizedComponentName]);

    if (!config || !AnalysisComponent) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {showAnalytics ? (
                <AnalysisComponent fetchItems={config.fetchItems} />
            ) : (
                <BaseManagementComponent
                    fieldConfig={config.fieldsConfig}
                    entityName={config.entityName}
                    fetchItems={config.fetchItems}
                    addItem={config.addItem}
                    updateItem={config.updateItem}
                    deleteItem={config.deleteItem}
                    headCells={config.headCells}
                />
            )}
        </>
    );
}

export default ManagementComponent;
