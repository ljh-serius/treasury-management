export const fieldsConfig = {
    recordId: { label: 'Record ID', type: 'text', faker: 'datatype.uuid' },
    year: { label: 'Year', type: 'text', faker: 'date.past' },
    wasteType: {
        label: 'Waste Type',
        type: 'select',
        options: [
            { id: 'hazardous', label: 'Hazardous' },
            { id: 'non-hazardous', label: 'Non-Hazardous' },
            { id: 'recyclable', label: 'Recyclable' },
        ],
        faker: 'random.arrayElement',
    },
    totalWasteGenerated: { label: 'Total Waste Generated (tons)', type: 'number', faker: 'finance.amount' },
    wasteDisposed: { label: 'Waste Disposed (tons)', type: 'number', faker: 'finance.amount' },
    wasteRecycled: { label: 'Waste Recycled (tons)', type: 'number', faker: 'finance.amount' },
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

export const entityName = 'Waste Management';
export const collectionName = 'waste-management';
