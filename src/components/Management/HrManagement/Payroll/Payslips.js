export const fieldsConfig = {
    payslipId: { label: 'Payslip ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    salary: { label: 'Salary', type: 'number', faker: 'finance.amount' },
    bonus: { label: 'Bonus', type: 'number', faker: 'finance.amount' },
    deductions: { label: 'Deductions', type: 'number', faker: 'finance.amount' },
    netPay: { label: 'Net Pay', type: 'number', faker: 'finance.amount' },
    payslipDate: { label: 'Payslip Date', type: 'date', faker: 'date.past' },
    issueDate: { label: 'Issue Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'issued', label: 'Issued' },
            { id: 'pending', label: 'Pending' },
            { id: 'retracted', label: 'Retracted' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
            { id: 'review', label: 'Review' },
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
