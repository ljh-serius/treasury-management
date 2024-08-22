export const fieldsConfig = {
    payslipId: { label: 'Payslip ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    salaryAmount: { label: 'Salary Amount', type: 'number', faker: 'finance.amount' },
    bonusAmount: { label: 'Bonus Amount', type: 'number', faker: 'finance.amount' },
    deductions: { label: 'Deductions', type: 'number', faker: 'finance.amount' },
    netPay: { label: 'Net Pay', type: 'number', faker: 'finance.amount' },
    payDate: { label: 'Pay Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'paid', label: 'Paid' },
            { id: 'pending', label: 'Pending' },
            { id: 'failed', label: 'Failed' },
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

export const entityName = 'Payslips';
export const collectionName = 'payslips';

