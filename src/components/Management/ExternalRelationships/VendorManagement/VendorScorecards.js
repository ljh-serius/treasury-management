export const fieldsConfig = {
    scorecardId: { label: 'Scorecard ID', type: 'text', faker: 'datatype.uuid' },
    vendorName: { label: 'Vendor Name', type: 'text', faker: 'company.name' },
    assessmentDate: { label: 'Assessment Date', type: 'date', faker: 'date.past' },
    criteria: { label: 'Criteria', type: 'text', faker: 'lorem.sentence' },
    score: { label: 'Score', type: 'number', faker: 'finance.amount' },
    overallRating: {
        label: 'Overall Rating',
        type: 'select',
        options: [
            { id: 'excellent', label: 'Excellent' },
            { id: 'good', label: 'Good' },
            { id: 'average', label: 'Average' },
            { id: 'poor', label: 'Poor' },
        ],
        faker: 'random.arrayElement',
    },
    recommendations: { label: 'Recommendations', type: 'text', faker: 'lorem.paragraph' },
    reviewer: { label: 'Reviewer', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
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
};

export const entityName = 'Vendor Scorecards';
export const collectionName = 'vendor-scorecards';
