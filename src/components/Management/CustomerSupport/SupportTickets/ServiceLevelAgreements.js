export const fieldsConfig = {
    slaId: { label: 'SLA ID', type: 'text', faker: 'datatype.uuid' },
    serviceId: { label: 'Service ID', type: 'text', faker: 'datatype.uuid' },
    agreementDate: { label: 'Agreement Date', type: 'date', faker: 'date.past' },
    responseTime: { label: 'Response Time (hours)', type: 'number', faker: 'finance.amount' },
    resolutionTime: { label: 'Resolution Time (hours)', type: 'number', faker: 'finance.amount  ' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'expired', label: 'Expired' },
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
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Service Level Agreements';
export const collectionName = 'service-level-agreements';
