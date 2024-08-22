export const fieldsConfig = {
    recordId: { label: 'Record ID', type: 'text', faker: 'datatype.uuid' },
    year: { label: 'Year', type: 'text', faker: 'date.past' },
    totalEmissions: { label: 'Total Emissions (tons CO2e)', type: 'number', faker: 'finance.amount' },
    scope1Emissions: { label: 'Scope 1 Emissions (tons CO2e)', type: 'number', faker: 'finance.amount' },
    scope2Emissions: { label: 'Scope 2 Emissions (tons CO2e)', type: 'number', faker: 'finance.amount' },
    scope3Emissions: { label: 'Scope 3 Emissions (tons CO2e)', type: 'number', faker: 'finance.amount' },
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

export const entityName = 'Carbon Footprint Tracking';
export const collectionName = 'carbon-footprint-tracking';
