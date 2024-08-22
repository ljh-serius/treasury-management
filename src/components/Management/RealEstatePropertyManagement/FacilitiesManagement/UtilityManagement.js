export const fieldsConfig = {
    utilityId: { label: 'Utility ID', type: 'text', faker: 'datatype.uuid' },
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    utilityType: {
        label: 'Utility Type',
        type: 'select',
        options: [
            { id: 'electricity', label: 'Electricity' },
            { id: 'water', label: 'Water' },
            { id: 'gas', label: 'Gas' },
            { id: 'internet', label: 'Internet' },
        ],
        faker: 'random.arrayElement',
    },
    consumptionAmount: { label: 'Consumption Amount', type: 'number', faker: 'finance.amount' },
    billingDate: { label: 'Billing Date', type: 'date', faker: 'date.past' },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Utility Management';
export const collectionName = 'utility-management';
