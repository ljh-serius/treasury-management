export const fieldsConfig = {
    programId: { label: 'Program ID', type: 'text', faker: 'datatype.uuid' },
    programTitle: { label: 'Program Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    mentorName: { label: 'Mentor Name', type: 'text', faker: 'name.fullName' },
    menteeName: { label: 'Mentee Name', type: 'text', faker: 'name.fullName' },
    goals: { label: 'Goals', type: 'text', faker: 'lorem.sentences' },
    progress: { label: 'Progress (%)', type: 'number', faker: 'finance.amount' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'completed', label: 'Completed' },
            { id: 'on-hold', label: 'On Hold' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Mentorship Programs';
export const collectionName = 'mentorship-programs';
