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
};

export const entityName = 'Vendor Scorecards';
export const collectionName = 'vendor-scorecards';
