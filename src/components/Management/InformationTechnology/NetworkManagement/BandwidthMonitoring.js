export const fieldsConfig = {
    monitoringId: { label: 'Monitoring ID', type: 'text', faker: 'datatype.uuid' },
    networkName: { label: 'Network Name', type: 'text', faker: 'company.name' },
    monitoredDate: { label: 'Monitored Date', type: 'date', faker: 'date.past' },
    averageUsage: { label: 'Average Usage (Mbps)', type: 'number', faker: 'finance.amount' },
    peakUsage: { label: 'Peak Usage (Mbps)', type: 'number', faker: 'finance.amount' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'critical', label: 'Critical' },
            { id: 'high-usage', label: 'High Usage' },
            { id: 'low-usage', label: 'Low Usage' },
            { id: 'bandwidth-management', label: 'Bandwidth Management' },
        ],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Bandwidth Monitoring';
export const collectionName = 'bandwidth-monitoring';
