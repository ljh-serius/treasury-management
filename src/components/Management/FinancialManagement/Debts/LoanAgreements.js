export const fieldsConfig = {
    loanId: { label: 'Loan ID', type: 'text', faker: 'datatype.uuid' },
    lender: { label: 'Lender', type: 'text', faker: 'company.name' },
    loanAmount: { label: 'Loan Amount', type: 'number', faker: 'finance.amount' },
    interestRate: { label: 'Interest Rate (%)', type: 'number', faker: 'finance.amount' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'repaid', label: 'Repaid' },
            { id: 'defaulted', label: 'Defaulted' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Loan Agreements';
export const collectionName = 'loan-agreements';
