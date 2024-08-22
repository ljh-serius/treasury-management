export const fieldsConfig = {
    submissionId: { label: 'Submission ID', type: 'text', faker: 'datatype.uuid' },
    ideaTitle: { label: 'Idea Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    submittedBy: { label: 'Submitted By', type: 'text', faker: 'name.fullName' },
    department: { label: 'Department', type: 'text', faker: 'company.bs' },
    submissionDate: { label: 'Submission Date', type: 'date', faker: 'date.past' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'reviewed', label: 'Reviewed' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Idea Submission';
export const collectionName = 'idea-submission';
