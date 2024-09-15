export const fieldsConfig = {
    ledgerId: { label: 'Ledger ID', type: 'text', faker: 'datatype.uuid' },
    vendorName: { label: 'Vendor Name', type: 'text', faker: 'company.name' },
    vendorId: { label: 'Vendor ID', type: 'text', faker: 'datatype.uuid' },
    transactionDate: { label: 'Transaction Date', type: 'date', faker: 'date.past' },
    amount: { label: 'Amount', type: 'number', faker: 'finance.amount' },
    balance: { label: 'Balance', type: 'number', faker: 'finance.amount' },
    currency: {
        label: 'Currency',
        type: 'select',
        options: [
            { id: 'USD', label: 'USD' },
            { id: 'EUR', label: 'EUR' },
            { id: 'GBP', label: 'GBP' },
            { id: 'JPY', label: 'JPY' },
            { id: 'AUD', label: 'AUD' },
        ],
        faker: 'finance.currencyCode',
    },
    transactionType: {
        label: 'Transaction Type',
        type: 'select',
        options: [
            { id: 'invoice', label: 'Invoice' },
            { id: 'payment', label: 'Payment' },
            { id: 'credit', label: 'Credit' },
        ],
        faker: 'random.arrayElement',
    }, // Additional field for transaction classification
    dueDate: { label: 'Due Date', type: 'date', faker: 'date.future' }, // Due date for payments
    overdueStatus: { 
        label: 'Overdue Status', 
        type: 'select', 
        options: [
            { id: 'yes', label: 'Overdue' },
            { id: 'no', label: 'Not Overdue' },
        ], 
        faker: 'random.arrayElement' 
    },  // Overdue status for the ledger item
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

export const entityName = 'Creditors Ledger';
export const collectionName = 'creditors-ledger';