export const fieldsConfig = {
    renewalId: { label: 'Renewal ID', type: 'text', faker: 'datatype.uuid' },
    serviceId: { label: 'Service ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    renewalDate: { label: 'Renewal Date', type: 'date', faker: 'date.past' },
    newEndDate: { label: 'New End Date', type: 'date', faker: 'date.future' },
    terms: { label: 'Terms', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'completed', label: 'Completed' },
            { id: 'failed', label: 'Failed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Service Renewals';
export const collectionName = 'service-renewals';
