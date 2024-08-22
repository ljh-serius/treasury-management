export const fieldsConfig = {
    caseId: { label: 'Case ID', type: 'text', faker: 'datatype.uuid' },
    caseName: { label: 'Case Name', type: 'text', faker: 'company.catchPhrase' },
    caseType: {
        label: 'Case Type',
        type: 'select',
        options: [
            { id: 'civil', label: 'Civil' },
            { id: 'criminal', label: 'Criminal' },
            { id: 'arbitration', label: 'Arbitration' },
        ],
        faker: 'random.arrayElement',
    },
    courtName: { label: 'Court Name', type: 'text', faker: 'company.name' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'open', label: 'Open' },
            { id: 'closed', label: 'Closed' },
            { id: 'settled', label: 'Settled' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Legal Proceedings';
export const collectionName = 'legal-proceedings';