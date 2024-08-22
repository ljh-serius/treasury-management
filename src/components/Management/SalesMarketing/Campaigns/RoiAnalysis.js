export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    campaignId: { label: 'Campaign ID', type: 'text', faker: 'datatype.uuid' },
    roiValue: { label: 'ROI Value', type: 'number', faker: 'finance.amount' },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    recordedDate: { label: 'Recorded Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'ROI Analysis';
export const collectionName = 'roi-analysis';

