export const fieldsConfig = {
    filingId: { label: 'Filing ID', type: 'text', faker: 'datatype.uuid' },
    taxYear: { label: 'Tax Year', type: 'number', faker: 'date.past' },
    taxAmount: { label: 'Tax Amount', type: 'number', faker: 'finance.amount' },
    filingDate: { label: 'Filing Date', type: 'date', faker: 'date.past' },
    ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'filed', label: 'Filed' },
            { id: 'due', label: 'Due' },
            { id: 'overdue', label: 'Overdue' },
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

export const entityName = 'Tax Filings';
export const collectionName = 'tax-filings';
