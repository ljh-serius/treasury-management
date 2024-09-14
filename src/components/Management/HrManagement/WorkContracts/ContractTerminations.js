export const fieldsConfig = {
    terminationId: { label: 'Termination ID', type: 'text', faker: 'datatype.uuid' },
    contractId: { label: 'Contract ID', type: 'text', faker: 'datatype.uuid' },
    terminationDate: { label: 'Termination Date', type: 'date', faker: 'date.past' },
    reason: { label: 'Reason for Termination', type: 'text', faker: 'lorem.sentence' },
    terminationType: {
        label: 'Termination Type',
        type: 'select',
        options: [
            { id: 'voluntary', label: 'Voluntary' },
            { id: 'involuntary', label: 'Involuntary' },
            { id: 'retirement', label: 'Retirement' },
        ],
        faker: 'random.arrayElement',
    },
    payoutAmount: { label: 'Payout Amount', type: 'number', faker: 'finance.amount' },
    status: {
        label: 'Termination Status',
        type: 'select',
        options: [
            { id: 'processed', label: 'Processed' },
            { id: 'pending', label: 'Pending' },
            { id: 'cancelled', label: 'Cancelled' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
            { id: 'review', label: 'Review' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Contract Terminations';
export const collectionName = 'contract-terminations';
