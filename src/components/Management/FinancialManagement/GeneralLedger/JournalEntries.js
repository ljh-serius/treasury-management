export const fieldsConfig = {
    entryId: { label: 'Entry ID', type: 'text', faker: 'datatype.uuid' },
    accountId: { label: 'Account ID', type: 'text', faker: 'datatype.uuid' },
    date: { label: 'Date', type: 'date', faker: 'date.past' },
    debit: { label: 'Debit', type: 'number', faker: 'finance.amount' },
    credit: { label: 'Credit', type: 'number', faker: 'finance.amount' },
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
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
    description: { label: 'Description', type: 'text', faker: 'lorem.sentence' },
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

export const entityName = 'Journal Entries';
export const collectionName = 'journal-entries';
