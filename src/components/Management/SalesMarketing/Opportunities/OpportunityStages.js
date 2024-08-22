export const fieldsConfig = {
    opportunityId: { label: 'Opportunity ID', type: 'text', faker: 'datatype.uuid' },
    stageName: { label: 'Stage Name', type: 'text', faker: 'commerce.department' },
    stageOrder: { label: 'Stage Order', type: 'number', faker: 'datatype.number' },
    stageDescription: { label: 'Stage Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
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

export const entityName = 'Opportunity Stages';
export const collectionName = 'oppurtunity-stages';
