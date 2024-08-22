export const fieldsConfig = {
    initiativeId: { label: 'Initiative ID', type: 'text', faker: 'datatype.uuid' },
    initiativeName: { label: 'Initiative Name', type: 'text', faker: 'company.catchPhrase' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    energyGenerated: { label: 'Energy Generated (MWh)', type: 'number', faker: 'finance.amount' },
    costSavings: { label: 'Cost Savings', type: 'number', faker: 'finance.amount' },
    carbonReduction: { label: 'Carbon Reduction (tons CO2e)', type: 'number', faker: 'finance.amount' },
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

export const entityName = 'Renewable Energy Initiatives';
export const collectionName = 'renewable-energy-initiatives';
