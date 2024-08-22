export const fieldsConfig = {
    obligationId: { label: 'Obligation ID', type: 'text', faker: 'datatype.uuid' },
    obligationType: {
        label: 'Obligation Type',
        type: 'select',
        options: [
            { id: 'regulatory', label: 'Regulatory' },
            { id: 'contractual', label: 'Contractual' },
            { id: 'legal', label: 'Legal' },
        ],
        faker: 'random.arrayElement',
    },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
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
    responsibleParty: { label: 'Responsible Party', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Obligation Tracking';
export const collectionName = 'obligation-tracking';
