export const fieldsConfig = {
    arbitrationId: { label: 'Arbitration ID', type: 'text', faker: 'datatype.uuid' },
    caseName: { label: 'Case Name', type: 'text', faker: 'company.catchPhrase' },
    arbitrationDate: { label: 'Arbitration Date', type: 'date', faker: 'date.past' },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.sentence' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'open', label: 'Open' },
            { id: 'closed', label: 'Closed' },
            { id: 'ongoing', label: 'Ongoing' },
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
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Arbitration Records';
export const collectionName = 'arbitration-records';
