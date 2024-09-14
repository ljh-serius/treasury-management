export const fieldsConfig = {
    programId: { label: 'Program ID', type: 'text', faker: 'datatype.uuid' },
    programName: { label: 'Program Name', type: 'text', faker: 'company.bsNoun' },
    programType: {
        label: 'Program Type',
        type: 'select',
        options: [
            { id: 'technical', label: 'Technical' },
            { id: 'leadership', label: 'Leadership' },
            { id: 'compliance', label: 'Compliance' },
        ],
        faker: 'random.arrayElement',
    },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    participants: { label: 'Number of Participants', type: 'number', faker: 'datatype.number' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'ongoing', label: 'Ongoing' },
            { id: 'completed', label: 'Completed' },
            { id: 'cancelled', label: 'Cancelled' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
            { id: 'review', label: 'Review' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Training Programs';
export const collectionName = 'training-programs';
