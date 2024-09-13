export const fieldsConfig = {
    creditId: { label: 'Credit ID', type: 'text', faker: 'datatype.uuid' },
    taxYear: { label: 'Tax Year', type: 'number', faker: 'date.past' },
    creditAmount: { label: 'Credit Amount', type: 'number', faker: 'finance.amount' },
    creditType: { label: 'Credit Type', type: 'text', faker: 'commerce.department' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'claimed', label: 'Claimed' },
            { id: 'pending', label: 'Pending' },
            { id: 'denied', label: 'Denied' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Tax Credits';
export const collectionName = 'tax-credits';
