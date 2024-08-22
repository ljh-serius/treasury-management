export const fieldsConfig = {
    taxId: { label: 'Tax ID', type: 'text', faker: 'datatype.uuid' },
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    taxYear: { label: 'Tax Year', type: 'text', faker: 'date.past' },
    amountDue: { label: 'Amount Due', type: 'number', faker: 'finance.amount' },
    dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' },
    paymentStatus: {
        label: 'Payment Status',
        type: 'select',
        options: [
            { id: 'paid', label: 'Paid' },
            { id: 'pending', label: 'Pending' },
            { id: 'overdue', label: 'Overdue' },
        ],
        faker: 'random.arrayElement',
    },
    paymentDate: { label: 'Payment Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Property Taxes';
export const collectionName = 'property-taxes';
