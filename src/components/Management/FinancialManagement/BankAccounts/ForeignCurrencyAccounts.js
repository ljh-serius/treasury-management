export const fieldsConfig = {
    accountId: { label: 'Account ID', type: 'text', faker: 'datatype.uuid' },
    accountName: { label: 'Account Name', type: 'text', faker: 'finance.accountName' },
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
    balance: { label: 'Balance', type: 'number', faker: 'finance.amount' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
            { id: 'closed', label: 'Closed' },
        ],
        faker: 'random.arrayElement',
    },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // French-specific eco-tax contribution field
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Foreign Currency Amounts';
export const collectionName = 'foreign-currency-amounts';