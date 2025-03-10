export const fieldsConfig = {
    briefId: { label: 'Brief ID', type: 'text', faker: 'datatype.uuid' },
    caseId: { label: 'Case ID', type: 'text', faker: 'datatype.uuid' },
    briefTitle: { label: 'Brief Title', type: 'text', faker: 'lorem.sentence' },
    author: { label: 'Author', type: 'text', faker: 'name.fullName' },
    submissionDate: { label: 'Submission Date', type: 'date', faker: 'date.past' },
    court: { label: 'Court', type: 'text', faker: 'company.name' },
    content: { label: 'Content', type: 'text', faker: 'lorem.paragraphs' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'submitted', label: 'Submitted' },
            { id: 'under-review', label: 'Under Review' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Legal Briefs';
export const collectionName = 'legal-briefs';
