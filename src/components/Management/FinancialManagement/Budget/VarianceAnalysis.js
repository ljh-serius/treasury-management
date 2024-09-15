export const fieldsConfig = {
    varianceId: { label: 'Variance ID', type: 'text', faker: 'datatype.uuid' },
    department: { label: 'Department', type: 'text', faker: 'commerce.department' },
    budgetedAmount: { label: 'Budgeted Amount', type: 'number', faker: 'finance.amount' },
    actualAmount: { label: 'Actual Amount', type: 'number', faker: 'finance.amount' },
    varianceAmount: { label: 'Variance Amount', type: 'number', faker: 'finance.amount' },
    variancePercentage: { label: 'Variance Percentage', type: 'number', faker: 'datatype.float' },
    fiscalYear: { label: 'Fiscal Year', type: 'number', faker: 'date.past' },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
    reasonForVariance: { label: 'Reason For Variance', type: 'text', faker: 'lorem.sentence' },
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
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Variance Analysis';
export const collectionName = 'variance-analysis';
