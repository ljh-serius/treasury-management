export const fieldsConfig = {
    recordId: { label: 'Record ID', type: 'text', faker: 'datatype.uuid' },
    year: { label: 'Year', type: 'text', faker: 'date.past' },
    energyType: {
        label: 'Energy Type',
        type: 'select',
        options: [
            { id: 'electricity', label: 'Electricity' },
            { id: 'natural-gas', label: 'Natural Gas' },
            { id: 'renewable', label: 'Renewable' },
        ],
        faker: 'random.arrayElement',
    },
    totalConsumption: { label: 'Total Consumption (MWh)', type: 'number', faker: 'finance.amount' },
    cost: { label: 'Cost', type: 'number', faker: 'finance.amount' },
    reductionTarget: { label: 'Reduction Target (%)', type: 'number', faker: 'finance.amount' },
    achievedReduction: { label: 'Achieved Reduction (%)', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
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
};

export const entityName = 'Energy Consumption';
export const collectionName = 'energy-consumption';
