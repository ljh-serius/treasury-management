export const fieldsConfig = {
    scheduleId: { label: 'Schedule ID', type: 'text', faker: 'datatype.uuid' },
    loanId: { label: 'Loan ID', type: 'text', faker: 'datatype.uuid' },
    lender: { label: 'Lender', type: 'text', faker: 'company.name' },
    maturityDate: { label: 'Maturity Date', type: 'date', faker: 'date.future' },
    principalAmount: { label: 'Principal Amount', type: 'number', faker: 'finance.amount' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'due', label: 'Due' },
            { id: 'paid', label: 'Paid' },
            { id: 'defaulted', label: 'Defaulted' },
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

export const entityName = 'Debt Maturity Schedules';
export const collectionName = 'debt-maturity-schedules';
