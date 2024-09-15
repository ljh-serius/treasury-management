export const fieldsConfig = {
    creditId: { label: 'Credit ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    creditLimit: { label: 'Credit Limit', type: 'number', faker: 'finance.amount' },
    outstandingBalance: { label: 'Outstanding Balance', type: 'number', faker: 'finance.amount' },
    currency: {
        label: 'Currency',
        type: 'select',
        options: [
            { id: 'USD', label: 'USD' },
            { id: 'EUR', label: 'EUR' },
            { id: 'GBP', label: 'GBP' },
            { id: 'JPY', label: 'JPY' },
            { id: 'AUD', label: 'AUD' },
        ],
        faker: 'finance.currencyCode',
    },
    riskLevel: {
        label: 'Risk Level',
        type: 'select',
        options: [
            { id: 'low', label: 'Low' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'High' },
        ],
        faker: 'random.arrayElement',
    },
    latePaymentFee: { label: 'Late Payment Fee', type: 'number', faker: 'finance.amount' },  // Penalty for late payments
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
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

export const entityName = 'Credit Management';
export const collectionName = 'credit-management';
