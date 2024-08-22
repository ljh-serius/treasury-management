export const fieldsConfig = {
    sourcingId: { label: 'Sourcing ID', type: 'text', faker: 'datatype.uuid' },
    sourcingTitle: { label: 'Sourcing Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    supplierName: { label: 'Supplier Name', type: 'text', faker: 'company.name' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    certification: { label: 'Certification', type: 'text', faker: 'company.catchPhrase' },
    auditResults: { label: 'Audit Results', type: 'text', faker: 'lorem.paragraph' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'approved', label: 'Approved' },
            { id: 'pending', label: 'Pending' },
            { id: 'rejected', label: 'Rejected' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'review', label: 'Review' },
            { id: 'important', label: 'Important' },
            { id: 'completed', label: 'Completed' },
            { id: 'follow-up', label: 'Follow-Up' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
    budget: { label: 'Budget', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Sustainable Sourcing';
export const collectionName = 'sustainable-sourcing';
