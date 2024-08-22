export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    strength: { label: 'Strength', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    weakness: { label: 'Weakness', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    opportunity: { label: 'Opportunity', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    threat: { label: 'Threat', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    conductedBy: { label: 'Conducted By', type: 'text', faker: 'name.fullName' },
    conductedDate: { label: 'Conducted Date', type: 'date', faker: 'date.past' },
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

export const entityName = 'SWOT Analysis';
export const collectionName = 'swot-analysis'