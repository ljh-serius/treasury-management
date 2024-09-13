export const fieldsConfig = {
    renewalId: { label: 'Renewal ID', type: 'text', faker: 'datatype.uuid' },
    policyName: { label: 'Policy Name', type: 'text', faker: 'company.catchPhrase' },
    renewalDate: { label: 'Renewal Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'completed', label: 'Completed' },
            { id: 'canceled', label: 'Canceled' },
        ],
        faker: 'random.arrayElement',
    },
    coverageAmount: { label: 'Coverage Amount', type: 'number', faker: 'finance.amount' },
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

export const entityName = 'Policy Renewals';
export const collectionName = 'policy-renewals';
