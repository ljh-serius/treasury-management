export const fieldsConfig = {
    assetId: { label: 'Asset ID', type: 'text', faker: 'datatype.uuid' },
    assetType: {
        label: 'Asset Type',
        type: 'select',
        options: [
            { id: 'hardware', label: 'Hardware' },
            { id: 'software', label: 'Software' },
        ],
        faker: 'random.arrayElement',
    },
    purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
    deploymentDate: { label: 'Deployment Date', type: 'date', faker: 'date.past' },
    retirementDate: { label: 'Retirement Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'in-use', label: 'In Use' },
            { id: 'retired', label: 'Retired' },
            { id: 'maintenance', label: 'Maintenance' },
        ],
        faker: 'random.arrayElement',
    },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Asset Lifecycle';
export const collectionName = 'asset-lifecycle';
