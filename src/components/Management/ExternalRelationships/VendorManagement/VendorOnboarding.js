export const fieldsConfig = {
    onboardingId: { label: 'Onboarding ID', type: 'text', faker: 'datatype.uuid' },
    vendorName: { label: 'Vendor Name', type: 'text', faker: 'company.name' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
            { id: 'on-hold', label: 'On Hold' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
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
};

export const entityName = 'Vendor Onboarding';
export const collectionName = 'vendor-onboarding';
