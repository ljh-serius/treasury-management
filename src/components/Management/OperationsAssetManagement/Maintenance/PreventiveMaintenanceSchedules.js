export const fieldsConfig = {
    maintenanceId: { label: 'Maintenance ID', type: 'text', faker: 'datatype.uuid' },
    assetId: { label: 'Asset ID', type: 'text', faker: 'datatype.uuid' },
    maintenanceDate: { label: 'Maintenance Date', type: 'date', faker: 'date.past' },
    maintenanceType: {
        label: 'Maintenance Type',
        type: 'select',
        options: [
            { id: 'preventive', label: 'Preventive' },
            { id: 'corrective', label: 'Corrective' },
            { id: 'predictive', label: 'Predictive' },
        ],
        faker: 'random.arrayElement',
    },
    cost: { label: 'Cost', type: 'number', faker: 'finance.amount' },
    vendor: { label: 'Vendor', type: 'text', faker: 'company.name' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'completed', label: 'Completed' },
            { id: 'pending', label: 'Pending' },
            { id: 'in_progress', label: 'In Progress' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'review', label: 'Review' },
            { id: 'important', label: 'Important' },
            { id: 'completed', label: 'Completed' },
            { id: 'follow-up', label: 'Follow-Up' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};


export const entityName = 'Preventive Maintenance Schedules';
export const collectionName = 'preventive-maintenance-schedules';
