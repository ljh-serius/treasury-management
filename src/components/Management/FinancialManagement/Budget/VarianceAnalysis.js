export const fieldsConfig = {
    varianceId: { label: 'Variance ID', type: 'text', faker: 'datatype.uuid' },
    department: { label: 'Department', type: 'text', faker: 'commerce.department' },
    budgetedAmount: { label: 'Budgeted Amount', type: 'number', faker: 'finance.amount' },
    actualAmount: { label: 'Actual Amount', type: 'number', faker: 'finance.amount' },
    varianceAmount: { label: 'Variance Amount', type: 'number', faker: 'finance.amount' },
    variancePercentage: { label: 'Variance Percentage', type: 'number', faker: 'datatype.float' },
    fiscalYear: { label: 'Fiscal Year', type: 'number', faker: 'date.past' },
    reasonForVariance: { label: 'Reason For Variance', type: 'text', faker: 'lorem.sentence' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Variance Analysis';
export const collectionName = 'variance-analysis';
