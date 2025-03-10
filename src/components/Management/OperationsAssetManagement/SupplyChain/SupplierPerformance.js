export const fieldsConfig = {
    supplierId: { label: 'Supplier ID', type: 'text', faker: 'datatype.uuid' },
    supplierName: { label: 'Supplier Name', type: 'text', faker: 'company.name' },
    performanceRating: { label: 'Performance Rating', type: 'number', faker: 'datatype.number' },
    lastReviewDate: { label: 'Last Review Date', type: 'date', faker: 'date.past' },
    nextReviewDate: { label: 'Next Review Date', type: 'date', faker: 'date.future' },
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

    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'approved', label: 'Approved' },
            { id: 'pending', label: 'Pending' },
            { id: 'rejected', label: 'Rejected' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Supplier Performance';
export const collectionName = 'supplier-performance';
