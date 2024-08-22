export const fieldsConfig = {
    performanceId: { label: 'Performance ID', type: 'text', faker: 'datatype.uuid' },
    campaignId: { label: 'Campaign ID', type: 'text', faker: 'datatype.uuid' },
    metricName: { label: 'Metric Name', type: 'text', faker: 'commerce.productName' },
    value: { label: 'Value', type: 'number', faker: 'datatype.number' },
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

export const entityName = 'Campaign Performance';
export const collectionName = 'campaign-performance';
