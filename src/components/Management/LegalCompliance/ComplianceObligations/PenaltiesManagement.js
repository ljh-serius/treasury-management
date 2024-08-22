export const fieldsConfig = {
    penaltyId: { label: 'Penalty ID', type: 'text', faker: 'datatype.uuid' },
    penaltyType: {
        label: 'Penalty Type',
        type: 'select',
        options: [
            { id: 'financial', label: 'Financial' },
            { id: 'regulatory', label: 'Regulatory' },
            { id: 'legal', label: 'Legal' },
        ],
        faker: 'random.arrayElement',
    },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    amount: { label: 'Amount', type: 'number', faker: 'finance.amount' },
    dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'paid', label: 'Paid' },
            { id: 'overdue', label: 'Overdue' },
        ],
        faker: 'random.arrayElement',
    },
    imposedBy: { label: 'Imposed By', type: 'text', faker: 'company.name' },
    responsibleParty: { label: 'Responsible Party', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Penalties Management';
export const collectionName = 'penalties-management';
