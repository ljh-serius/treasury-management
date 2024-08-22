export const fieldsConfig = {
    transferId: { label: 'Transfer ID', type: 'text', faker: 'datatype.uuid' },
    fromAccountId: { label: 'From Account ID', type: 'text', faker: 'datatype.uuid' },
    toAccountId: { label: 'To Account ID', type: 'text', faker: 'datatype.uuid' },
    transferDate: { label: 'Transfer Date', type: 'date', faker: 'date.past' },
    amount: { label: 'Amount', type: 'number', faker: 'finance.amount' },
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
            { id: 'failed', label: 'Failed' },
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

    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};


export const entityName = 'Bank Transfers';

export const collectionName = 'bank-transfers';

