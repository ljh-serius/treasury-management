export const fieldsConfig = {
    feedbackId: { label: 'Feedback ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    feedbackDate: { label: 'Feedback Date', type: 'date', faker: 'date.past' },
    feedbackType: {
        label: 'Feedback Type',
        type: 'select',
        options: [
            { id: 'positive', label: 'Positive' },
            { id: 'neutral', label: 'Neutral' },
            { id: 'negative', label: 'Negative' },
        ],
        faker: 'random.arrayElement',
    },
    comments: { label: 'Comments', type: 'text', faker: 'lorem.sentences' },
    resolutionStatus: {
        label: 'Resolution Status',
        type: 'select',
        options: [
            { id: 'resolved', label: 'Resolved' },
            { id: 'unresolved', label: 'Unresolved' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Feedback Analysis';
export const collectionName = 'feedback-analysis';
