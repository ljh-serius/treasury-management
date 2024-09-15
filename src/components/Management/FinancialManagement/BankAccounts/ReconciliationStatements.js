export const fieldsConfig = {
    statementId: { label: 'Statement ID', type: 'text', faker: 'datatype.uuid' },
    accountId: { label: 'Account ID', type: 'text', faker: 'datatype.uuid' },
    reconciliationDate: { label: 'Reconciliation Date', type: 'date', faker: 'date.past' },
    balance: { label: 'Balance', type: 'number', faker: 'finance.amount' },
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
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'completed', label: 'Completed' },
            { id: 'pending', label: 'Pending' },
            { id: 'discrepancy', label: 'Discrepancy' },
        ],
        faker: 'random.arrayElement',
    },
    latePaymentFee: { label: 'Late Payment Fee', type: 'number', faker: 'finance.amount' },  // Penalty for late payments
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // French-specific eco-tax contribution field
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

export const entityName = 'Reconcilation Statements';
export const collectionName = 'reconciliation-statements';