export const fieldsConfig = {
    auditId: { label: 'Audit ID', type: 'text', faker: 'datatype.uuid' },
    taxYear: { label: 'Tax Year', type: 'number', faker: 'date.past' },
    auditAmount: { label: 'Audit Amount', type: 'number', faker: 'finance.amount' },
    auditor: { label: 'Auditor', type: 'text', faker: 'company.name' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'failed', label: 'Failed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Tax Audits';
export const collectionName = 'tax-audits';
