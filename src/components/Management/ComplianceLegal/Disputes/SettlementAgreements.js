export const fieldsConfig = {
    agreementId: { label: 'Agreement ID', type: 'text', faker: 'datatype.uuid' },
    caseName: { label: 'Case Name', type: 'text', faker: 'company.catchPhrase' },
    settlementAmount: { label: 'Settlement Amount', type: 'number', faker: 'finance.amount' },
    settlementDate: { label: 'Settlement Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
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

export const entityName = 'Settlement Agreements';
export const collectionName = 'settlement-agreements';
