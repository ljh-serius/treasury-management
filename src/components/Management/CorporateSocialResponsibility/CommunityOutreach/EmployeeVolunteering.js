export const fieldsConfig = {
    volunteeringId: { label: 'Volunteering ID', type: 'text', faker: 'datatype.uuid' },
    activityTitle: { label: 'Activity Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    participants: { label: 'Participants', type: 'text', faker: 'name.fullName' },
    hoursContributed: { label: 'Hours Contributed', type: 'number', faker: 'finance.amount' },
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
    coordinator: { label: 'Coordinator', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Employee Volunteering';
export const collectionName = 'employee-volunteering';
