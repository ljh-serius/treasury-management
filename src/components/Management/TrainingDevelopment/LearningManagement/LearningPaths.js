export const fieldsConfig = {
    pathId: { label: 'Path ID', type: 'text', faker: 'datatype.uuid' },
    pathTitle: { label: 'Path Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    department: { label: 'Department', type: 'text', faker: 'company.bs' },
    coursesIncluded: {
        label: 'Courses Included',
        type: 'text',
        faker: 'lorem.words',
    },
    estimatedDuration: { label: 'Estimated Duration (hours)', type: 'number', faker: 'finance.amount' },
    targetSkills: { label: 'Target Skills', type: 'text', faker: 'lorem.words' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Learning Paths';
export const collectionName = 'learning-paths';
