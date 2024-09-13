export const fieldsConfig = {
    recordId: { label: 'Record ID', type: 'text', faker: 'datatype.uuid' },
    taxYear: { label: 'Tax Year', type: 'number', faker: 'date.past' },
    vatAmount: { label: 'VAT Amount', type: 'number', faker: 'finance.amount' },
    gstAmount: { label: 'GST Amount', type: 'number', faker: 'finance.amount' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'submitted', label: 'Submitted' },
            { id: 'pending', label: 'Pending' },
            { id: 'reviewed', label: 'Reviewed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'VAT/GST Records';
export const collectionName = 'vat-gst-records';
