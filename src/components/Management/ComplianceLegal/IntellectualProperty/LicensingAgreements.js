export const fieldsConfig = {
    agreementId: { label: 'Agreement ID', type: 'text', faker: 'datatype.uuid' },
    licenseeName: { label: 'Licensee Name', type: 'text', faker: 'company.name' },
    licenseType: {
        label: 'License Type',
        type: 'select',
        options: [
            { id: 'exclusive', label: 'Exclusive' },
            { id: 'non_exclusive', label: 'Non-Exclusive' },
            { id: 'royalty_free', label: 'Royalty-Free' },
        ],
        faker: 'random.arrayElement',
    },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
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

export const entityName = 'Licensing Agreements';
export const collectionName = 'licensing-agreements';
