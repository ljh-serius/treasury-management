export const fieldsConfig = {
    leadId: { label: 'Lead ID', type: 'text', faker: 'datatype.uuid' },
    score: { label: 'Score', type: 'number', faker: 'datatype.number' },
    criteria: { label: 'Criteria', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Lead Scoring';
export const collectionName = 'lead-scoring';
