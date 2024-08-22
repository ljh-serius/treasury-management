export const fieldsConfig = {
    maintenanceId: { label: 'Maintenance ID', type: 'text', faker: 'datatype.uuid' },
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    maintenanceType: {
        label: 'Maintenance Type',
        type: 'select',
        options: [
            { id: 'preventive', label: 'Preventive' },
            { id: 'corrective', label: 'Corrective' },
            { id: 'emergency', label: 'Emergency' },
        ],
        faker: 'random.arrayElement',
    },
    scheduledDate: { label: 'Scheduled Date', type: 'date', faker: 'date.future' },
    completionDate: { label: 'Completion Date', type: 'date', faker: 'date.future' },
    cost: { label: 'Cost', type: 'number', faker: 'finance.amount' },
    maintenanceDetails: { label: 'Maintenance Details', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Facility Maintenance';
export const collectionName = 'facility-maintenance';
