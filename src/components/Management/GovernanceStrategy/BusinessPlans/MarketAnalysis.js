export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    marketSegment: { label: 'Market Segment', type: 'text', faker: 'commerce.department' },
    demographicData: { label: 'Demographic Data', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    competitiveLandscape: { label: 'Competitive Landscape', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    marketTrends: { label: 'Market Trends', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    analyst: { label: 'Analyst', type: 'text', faker: 'name.fullName' },
    analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
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
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Market Analysis';
export const collectionName = 'market-analysis'