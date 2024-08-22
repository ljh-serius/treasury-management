export const fieldsConfig = {
    negotiationId: { label: 'Negotiation ID', type: 'text', faker: 'datatype.uuid' },
    supplierId: { label: 'Supplier ID', type: 'text', faker: 'datatype.uuid' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    termsNegotiated: { label: 'Terms Negotiated', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'failed', label: 'Failed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Contract Negotiations';
export const collectionName = 'contract-negotiations';
