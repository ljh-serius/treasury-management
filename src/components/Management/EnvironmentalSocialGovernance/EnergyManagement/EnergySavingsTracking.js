export const fieldsConfig = {
    trackingId: { label: 'Tracking ID', type: 'text', faker: 'datatype.uuid' },
    year: { label: 'Year', type: 'text', faker: 'date.past' },
    totalSavings: { label: 'Total Savings (MWh)', type: 'number', faker: 'finance.amount' },
    costSavings: { label: 'Cost Savings', type: 'number', faker: 'finance.amount' },
    reductionTarget: { label: 'Reduction Target (%)', type: 'number', faker: 'finance.amount' },
    achievedReduction: { label: 'Achieved Reduction (%)', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Energy Savings Tracking';
export const collectionName = 'energy-savings-tracking';
