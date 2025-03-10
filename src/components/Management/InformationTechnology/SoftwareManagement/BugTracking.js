export const fieldsConfig = {
    bugId: { label: 'Bug ID', type: 'text', faker: 'datatype.uuid' },
    projectName: { label: 'Project Name', type: 'text', faker: 'company.name' },
    reporter: { label: 'Reporter', type: 'text', faker: 'name.fullName' },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'open', label: 'Open' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'resolved', label: 'Resolved' },
            { id: 'closed', label: 'Closed' },
        ],
        faker: 'random.arrayElement',
    },
    severity: {
        label: 'Severity',
        type: 'select',
        options: [
            { id: 'low', label: 'Low' },
            { id: 'medium', label: 'Medium' },
            { id: 'high', label: 'High' },
            { id: 'critical', label: 'Critical' },
        ],
        faker: 'random.arrayElement',
    },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    updatedDate: { label: 'Updated Date', type: 'date', faker: 'date.recent' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
};

export const entityName = 'Bug Tracking';
export const collectionName = 'bug-tracking';
