export const fieldsConfig = {
    structureId: { label: 'Structure ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    baseSalary: { label: 'Base Salary', type: 'number', faker: 'finance.amount' },
    bonusPercentage: { label: 'Bonus Percentage', type: 'number', faker: 'datatype.number' },
    allowances: { label: 'Allowances', type: 'number', faker: 'finance.amount' },
    structureEffectiveDate: { label: 'Effective Date', type: 'date', faker: 'date.past' },
    structureExpiryDate: { label: 'Expiry Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'expired', label: 'Expired' },
            { id: 'pending', label: 'Pending' },
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

export const entityName = 'Salary Structure';
export const collectionName = 'salary-structure';
