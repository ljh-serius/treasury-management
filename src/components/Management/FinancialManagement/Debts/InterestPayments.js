export const fieldsConfig = {
    paymentId: { label: 'Payment ID', type: 'text', faker: 'datatype.uuid' },
    loanId: { label: 'Loan ID', type: 'text', faker: 'datatype.uuid' },
    lender: { label: 'Lender', type: 'text', faker: 'company.name' },
    paymentAmount: { label: 'Payment Amount', type: 'number', faker: 'finance.amount' },
    interestRate: { label: 'Interest Rate (%)', type: 'number', faker: 'finance.amount' },
    paymentDate: { label: 'Payment Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'paid', label: 'Paid' },
            { id: 'due', label: 'Due' },
            { id: 'overdue', label: 'Overdue' },
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

export const entityName = 'Interest Payments';
export const collectionName = 'interest-payments';