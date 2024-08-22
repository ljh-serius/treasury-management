export const fieldsConfig = {
    investmentId: { label: 'Investment ID', type: 'text', faker: 'datatype.uuid' },
    projectName: { label: 'Project Name', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    investmentAmount: { label: 'Investment Amount', type: 'number', faker: 'finance.amount' },
    projectManager: { label: 'Project Manager', type: 'text', faker: 'name.fullName' },
    communityBenefited: { label: 'Community Benefited', type: 'text', faker: 'address.city' },
    impactAssessment: { label: 'Impact Assessment', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'planned', label: 'Planned' },
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Community Investment';
export const collectionName = 'community-investment';
