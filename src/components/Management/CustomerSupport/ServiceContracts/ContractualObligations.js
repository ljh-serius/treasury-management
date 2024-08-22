export const fieldsConfig = {
    obligationId: { label: 'Obligation ID', type: 'text', faker: 'datatype.uuid' },
    contractId: { label: 'Contract ID', type: 'text', faker: 'datatype.uuid' },
    obligationType: {
        label: 'Obligation Type',
        type: 'select',
        options: [
            { id: 'service-delivery', label: 'Service Delivery' },
            { id: 'support-response', label: 'Support Response' },
            { id: 'maintenance', label: 'Maintenance' },
        ],
        faker: 'random.arrayElement',
    },
    dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'fulfilled', label: 'Fulfilled' },
            { id: 'overdue', label: 'Overdue' },
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
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Contractual Obligations';
export const collectionName = 'contractual-obligations';
