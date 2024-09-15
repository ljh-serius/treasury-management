export const fieldsConfig = {
    allocationId: { label: 'Allocation ID', type: 'text', faker: 'datatype.uuid' },
    department: { label: 'Department', type: 'text', faker: 'commerce.department' },
    budgetedAmount: { label: 'Budgeted Amount', type: 'number', faker: 'finance.amount' },
    actualAmount: { label: 'Actual Amount', type: 'number', faker: 'finance.amount' },
    fiscalYear: { label: 'Fiscal Year', type: 'number', faker: 'date.past' },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
    variance: { label: 'Variance', type: 'number', faker: 'finance.amount' },  // Budget vs actual variance
    latePaymentFee: { label: 'Late Payment Fee', type: 'number', faker: 'finance.amount' },  // Penalty for late payments
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
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'on_track', label: 'On Track' },
            { id: 'over_budget', label: 'Over Budget' },
            { id: 'under_budget', label: 'Under Budget' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Budget Allocations';
export const collectionName = 'budget-allocations';

