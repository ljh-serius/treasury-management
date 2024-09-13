export const fieldsConfig = {
    updateId: { label: 'Update ID', type: 'text', faker: 'datatype.uuid' },
    updateTitle: { label: 'Update Title', type: 'text', faker: 'company.catchPhrase' },
    issuedDate: { label: 'Issued Date', type: 'date', faker: 'date.past' },
    effectiveDate: { label: 'Effective Date', type: 'date', faker: 'date.future' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending_review', label: 'Pending Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'implemented', label: 'Implemented' },
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

export const entityName = 'Regulatory Updates';
export const collectionName = 'regulatory-updates';
