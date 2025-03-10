export const fieldsConfig = {
    appearanceId: { label: 'Appearance ID', type: 'text', faker: 'datatype.uuid' },
    caseId: { label: 'Case ID', type: 'text', faker: 'datatype.uuid' },
    appearanceDate: { label: 'Appearance Date', type: 'date', faker: 'date.past' },
    court: { label: 'Court', type: 'text', faker: 'company.name' },
    judge: { label: 'Judge', type: 'text', faker: 'name.fullName' },
    attorney: { label: 'Attorney', type: 'text', faker: 'name.fullName' },
    notes: { label: 'Notes', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'scheduled', label: 'Scheduled' },
            { id: 'completed', label: 'Completed' },
            { id: 'postponed', label: 'Postponed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Court Appearances';
export const collectionName = 'court-appearances';
