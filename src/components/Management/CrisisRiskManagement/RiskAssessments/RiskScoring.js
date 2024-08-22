export const fieldsConfig = {
    scoreId: { label: 'Score ID', type: 'text', faker: 'datatype.uuid' },
    riskId: { label: 'Risk ID', type: 'text', faker: 'datatype.uuid' },
    riskTitle: { label: 'Risk Title', type: 'text', faker: 'lorem.sentence' },
    likelihoodScore: {
        label: 'Likelihood Score',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
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
    impactScore: {
        label: 'Impact Score',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    overallRiskScore: { label: 'Overall Risk Score', type: 'number', faker: 'finance.amount' },
    scoringDate: { label: 'Scoring Date', type: 'date', faker: 'date.past' },
    scoredBy: { label: 'Scored By', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'mitigated', label: 'Mitigated' },
            { id: 'archived', label: 'Archived' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Risk Scoring';
export const collectionName = 'risk-scoring';
