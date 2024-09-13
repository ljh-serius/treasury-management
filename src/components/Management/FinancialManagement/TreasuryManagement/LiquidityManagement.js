export const fieldsConfig = {
    liquidityId: { label: 'Liquidity ID', type: 'text', faker: 'datatype.uuid' },
    availableCash: { label: 'Available Cash', type: 'number', faker: 'finance.amount' },
    shortTermInvestments: { label: 'Short-Term Investments', type: 'number', faker: 'finance.amount' },
    cashEquivalents: { label: 'Cash Equivalents', type: 'number', faker: 'finance.amount' },
    liquidityRatio: { label: 'Liquidity Ratio', type: 'number', faker: 'datatype.float' },
    fiscalPeriod: { label: 'Fiscal Period', type: 'text', faker: 'date.month' },
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

export const entityName = 'Liquidity Management';
export const collectionName = 'liquidity-management';
