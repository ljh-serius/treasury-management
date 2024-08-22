export const fieldsConfig = {
    npsId: { label: 'NPS ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    surveyDate: { label: 'Survey Date', type: 'date', faker: 'date.past' },
    score: {
        label: 'Score',
        type: 'select',
        options: [
            { id: '0', label: '0' },
            { id: '1', label: '1' },
            { id: '2', label: '2' },
            { id: '3', label: '3' },
            { id: '4', label: '4' },
            { id: '5', label: '5' },
            { id: '6', label: '6' },
            { id: '7', label: '7' },
            { id: '8', label: '8' },
            { id: '9', label: '9' },
            { id: '10', label: '10' },
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
    comments: { label: 'Comments', type: 'text', faker: 'lorem.sentences' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Net Promoter Score';
export const collectionName = 'net-promoter-score';
