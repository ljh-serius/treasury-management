export const fieldsConfig = {
    proposalId: { label: 'Proposal ID', type: 'text', faker: 'datatype.uuid' },
    proposalTitle: { label: 'Proposal Title', type: 'text', faker: 'lorem.sentence' },
    researcher: { label: 'Researcher', type: 'text', faker: 'name.fullName' },
    department: { label: 'Department', type: 'text', faker: 'company.bs' },
    submissionDate: { label: 'Submission Date', type: 'date', faker: 'date.past' },
    approvalStatus: {
        label: 'Approval Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'approved', label: 'Approved' },
            { id: 'rejected', label: 'Rejected' },
        ],
        faker: 'random.arrayElement',
    },
    budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Research Proposals';
export const collectionName = 'research-proposals';
