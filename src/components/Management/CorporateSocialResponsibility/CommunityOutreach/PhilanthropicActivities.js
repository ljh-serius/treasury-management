export const fieldsConfig = {
    activityId: { label: 'Activity ID', type: 'text', faker: 'datatype.uuid' },
    activityTitle: { label: 'Activity Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    beneficiary: { label: 'Beneficiary', type: 'text', faker: 'name.fullName' },
    amountDonated: { label: 'Amount Donated', type: 'number', faker: 'finance.amount' },
    impact: { label: 'Impact', type: 'text', faker: 'lorem.paragraph' },
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

export const entityName = 'Philanthropic Activities';
export const collectionName = 'philanthropic-activities';
