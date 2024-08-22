export const fieldsConfig = {
    bidId: { label: 'Bid ID', type: 'text', faker: 'datatype.uuid' },
    supplierId: { label: 'Supplier ID', type: 'text', faker: 'datatype.uuid' },
    submissionDate: { label: 'Submission Date', type: 'date', faker: 'date.past' },
    bidAmount: { label: 'Bid Amount', type: 'number', faker: 'finance.amount' },
    bidDetails: { label: 'Bid Details', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'submitted', label: 'Submitted' },
            { id: 'under-review', label: 'Under Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Supplier Bids';
export const collectionName = 'supplier-bids';
