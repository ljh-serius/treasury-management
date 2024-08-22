export const fieldsConfig = {
    analysisId: { label: 'Analysis ID', type: 'text', faker: 'datatype.uuid' },
    department: { label: 'Department', type: 'text', faker: 'company.bs' },
    skillGapIdentified: { label: 'Skill Gap Identified', type: 'text', faker: 'lorem.sentence' },
    analysisDate: { label: 'Analysis Date', type: 'date', faker: 'date.past' },
    recommendedTraining: { label: 'Recommended Training', type: 'text', faker: 'lorem.sentence' },
    priorityLevel: {
        label: 'Priority Level',
        type: 'select',
        options: [
            { id: 'high', label: 'High' },
            { id: 'medium', label: 'Medium' },
            { id: 'low', label: 'Low' },
        ],
        faker: 'random.arrayElement',
    },
    conductedBy: { label: 'Conducted By', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Training Needs Analysis';
export const collectionName = 'training-needs-analysis';
