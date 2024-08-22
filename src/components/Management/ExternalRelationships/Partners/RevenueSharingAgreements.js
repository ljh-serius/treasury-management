export const fieldsConfig = {
    agreementId: { label: 'Agreement ID', type: 'text', faker: 'datatype.uuid' },
    partnerName: { label: 'Partner Name', type: 'text', faker: 'company.name' },
    agreementDate: { label: 'Agreement Date', type: 'date', faker: 'date.past' },
    revenueShare: { label: 'Revenue Share (%)', type: 'number', faker: 'finance.amount' },
    duration: { label: 'Duration (years)', type: 'number', faker: 'finance.amount' },
    terms: { label: 'Terms', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'expired', label: 'Expired' },
            { id: 'terminated', label: 'Terminated' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
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
};

export const entityName = 'Revenue Sharing Agreements';
export const collectionName = 'revenue-sharing-agreements';
