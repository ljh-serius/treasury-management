import React, { useState, useEffect } from 'react';
import BaseManagementComponent from '../components/Management/Base';
import { useParams } from 'react-router-dom';

const getPath = (path) => {
    return path.split('-').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join('');
}

function ManagementComponent({ showAnalytics }) {
    const { module, subModule, component } = useParams();
    const capitalizedModuleName = getPath(module);
    const capitalizedSubModuleName = getPath(subModule);
    const capitalizedComponentName = getPath(component);

    const [config, setConfig] = useState(null);
    const [AnalysisComponent, setAnalysisComponent] = useState(null);

    useEffect(() => {
        const loadConfig = async () => {
            try {
                console.log("File to import :", `../components/Management${capitalizedModuleName}/${capitalizedSubModuleName}/${capitalizedComponentName}`)
                const configModule = await import(`../components/Management/${capitalizedModuleName}/${capitalizedSubModuleName}/${capitalizedComponentName}`);
                const analysisModule = await import(`./Analysis/${capitalizedModuleName}/${capitalizedSubModuleName}/${capitalizedComponentName}`);

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
