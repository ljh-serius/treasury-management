export const fieldsConfig = {
    withholdingId: { label: 'Withholding ID', type: 'text', faker: 'datatype.uuid' },
    taxYear: { label: 'Tax Year', type: 'number', faker: 'date.past' },
    withheldAmount: { label: 'Withheld Amount', type: 'number', faker: 'finance.amount' },
    payer: { label: 'Payer', type: 'text', faker: 'company.name' },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'withheld', label: 'Withheld' },
            { id: 'paid', label: 'Paid' },
            { id: 'pending', label: 'Pending' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Withholding Taxes';
export const collectionName = 'withholding-taxes';
