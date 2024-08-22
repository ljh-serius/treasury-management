export const fieldsConfig = {
    caseId: { label: 'Case ID', type: 'text', faker: 'datatype.uuid' },
    caseTitle: { label: 'Case Title', type: 'text', faker: 'lorem.sentence' },
    caseType: {
        label: 'Case Type',
        type: 'select',
        options: [
            { id: 'civil', label: 'Civil' },
            { id: 'criminal', label: 'Criminal' },
            { id: 'regulatory', label: 'Regulatory' },
        ],
        faker: 'random.arrayElement',
    },
    court: { label: 'Court', type: 'text', faker: 'company.name' },
    judge: { label: 'Judge', type: 'text', faker: 'name.fullName' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'open', label: 'Open' },
            { id: 'closed', label: 'Closed' },
            { id: 'pending', label: 'Pending' },
        ],
        faker: 'random.arrayElement',
    },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.sentence' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Case Management';
export const collectionName = 'case-management';
