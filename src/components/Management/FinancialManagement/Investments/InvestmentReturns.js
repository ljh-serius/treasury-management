export const fieldsConfig = {
    returnId: { label: 'Return ID', type: 'text', faker: 'datatype.uuid' },
    investmentId: { label: 'Investment ID', type: 'text', faker: 'datatype.uuid' },
    investmentType: {
        label: 'Investment Type',
        type: 'select',
        options: [
            { id: 'equity', label: 'Equity' },
            { id: 'fixed-income', label: 'Fixed Income' },
            { id: 'real-estate', label: 'Real Estate' },
        ],
        faker: 'random.arrayElement',
    },
    returnAmount: { label: 'Return Amount', type: 'number', faker: 'finance.amount' },
    returnDate: { label: 'Return Date', type: 'date', faker: 'date.past' },
    roi: { label: 'ROI (%)', type: 'number', faker: 'finance.amount' },
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
            { id: 'received', label: 'Received' },
            { id: 'pending', label: 'Pending' },
            { id: 'missed', label: 'Missed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Investment Returns';
export const collectionName = 'investment-returns';
