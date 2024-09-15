export const fieldsConfig = {
    investmentId: { label: 'Investment ID', type: 'text', faker: 'datatype.uuid' },
    issuerName: { label: 'Issuer Name', type: 'text', faker: 'company.name' },
    bondType: {
        label: 'Bond Type',
        type: 'select',
        options: [
            { id: 'government', label: 'Government' },
            { id: 'corporate', label: 'Corporate' },
            { id: 'municipal', label: 'Municipal' },
        ],
        faker: 'random.arrayElement',
    },
    faceValue: { label: 'Face Value', type: 'number', faker: 'finance.amount' },
    interestRate: { label: 'Interest Rate (%)', type: 'number', faker: 'finance.amount' },
    maturityDate: { label: 'Maturity Date', type: 'date', faker: 'date.future' },
    purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
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
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'matured', label: 'Matured' },
            { id: 'sold', label: 'Sold' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Fixed Income Investments';
export const collectionName = 'fixed-income-investments';
