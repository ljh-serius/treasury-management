export const fieldsConfig = {
    deadlineId: { label: 'Deadline ID', type: 'text', faker: 'datatype.uuid' },
    complianceType: {
        label: 'Compliance Type',
        type: 'select',
        options: [
            { id: 'financial', label: 'Financial' },
            { id: 'regulatory', label: 'Regulatory' },
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
            { id: 'met', label: 'Met' },
            { id: 'overdue', label: 'Overdue' },
        ],
        faker: 'random.arrayElement',
    },
    responsibleParty: { label: 'Responsible Party', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Compliance Deadlines';
export const collectionName = 'compliance-deadlines';
