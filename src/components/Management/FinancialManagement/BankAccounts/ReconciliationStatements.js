export const fieldsConfig = {
    statementId: { label: 'Statement ID', type: 'text', faker: 'datatype.uuid' },
    accountId: { label: 'Account ID', type: 'text', faker: 'datatype.uuid' },
    reconciliationDate: { label: 'Reconciliation Date', type: 'date', faker: 'date.past' },
    balance: { label: 'Balance', type: 'number', faker: 'finance.amount' },
    currency: {
        label: 'Currency',
        type: 'select',
        options: [],  // Populate with actual currency options
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
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Reconcilation Statements';

export const collectionName = 'reconciliation-statements';

