export const fieldsConfig = {
    trainingId: { label: 'Training ID', type: 'text', faker: 'datatype.uuid' },
    trainingTitle: { label: 'Training Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    trainerName: { label: 'Trainer Name', type: 'text', faker: 'name.fullName' },
    duration: { label: 'Duration (days)', type: 'number', faker: 'finance.amount' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.future' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    location: { label: 'Location', type: 'text', faker: 'address.city' },
    targetGroup: {
        label: 'Target Group',
        type: 'select',
        options: [
            { id: 'executives', label: 'Executives' },
            { id: 'senior-managers', label: 'Senior Managers' },
            { id: 'board-members', label: 'Board Members' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Executive Training';
export const collectionName = 'executive-training';
