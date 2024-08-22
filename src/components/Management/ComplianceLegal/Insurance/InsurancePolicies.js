export const fieldsConfig = {
    policyId: { label: 'Policy ID', type: 'text', faker: 'datatype.uuid' },
    policyName: { label: 'Policy Name', type: 'text', faker: 'company.catchPhrase' },
    insuranceType: {
        label: 'Insurance Type',
        type: 'select',
        options: [
            { id: 'liability', label: 'Liability' },
            { id: 'property', label: 'Property' },
            { id: 'health', label: 'Health' },
            { id: 'auto', label: 'Auto' },
        ],
        faker: 'random.arrayElement',
    },
    coverageAmount: { label: 'Coverage Amount', type: 'number', faker: 'finance.amount' },
    premium: { label: 'Premium', type: 'number', faker: 'finance.amount' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Insurance Policies';
export const collectionName = 'insurance-policies';