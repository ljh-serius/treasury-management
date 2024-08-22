export const fieldsConfig = {
    initiativeId: { label: 'Initiative ID', type: 'text', faker: 'datatype.uuid' },
    initiativeTitle: { label: 'Initiative Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    goals: { label: 'Goals', type: 'text', faker: 'lorem.sentences' },
    achievedResults: { label: 'Achieved Results', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
            { id: 'planned', label: 'Planned' },
        ],
        faker: 'random.arrayElement',
    },
    projectManager: { label: 'Project Manager', type: 'text', faker: 'name.fullName' },
    budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Green Initiatives';
export const collectionName = 'green-initiatives';
