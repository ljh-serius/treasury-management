export const fieldsConfig = {
    feedbackId: { label: 'Feedback ID', type: 'text', faker: 'datatype.uuid' },
    stakeholderName: { label: 'Stakeholder Name', type: 'text', faker: 'name.fullName' },
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
    comments: { label: 'Comments', type: 'text', faker: 'lorem.paragraph' },
    responseStatus: {
        label: 'Response Status',
        type: 'select',
        options: [
            { id: 'not-responded', label: 'Not Responded' },
            { id: 'responded', label: 'Responded' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Stakeholder Feedback';
export const collectionName = 'stakeholder-feedback';
