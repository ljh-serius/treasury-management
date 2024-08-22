export const fieldsConfig = {
    sdlcId: { label: 'SDLC ID', type: 'text', faker: 'datatype.uuid' },
    projectName: { label: 'Project Name', type: 'text', faker: 'company.name' },
    phase: {
        label: 'Phase',
        type: 'select',
        options: [
            { id: 'requirements', label: 'Requirements' },
            { id: 'design', label: 'Design' },
            { id: 'implementation', label: 'Implementation' },
            { id: 'testing', label: 'Testing' },
            { id: 'deployment', label: 'Deployment' },
            { id: 'maintenance', label: 'Maintenance' },
        ],
        faker: 'random.arrayElement',
    },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'not-started', label: 'Not Started' },
            { id: 'in-progress', label: 'In Progress' },
            { id: 'completed', label: 'Completed' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Software Development Lifecycle';
export const collectionName = 'software-development-lifecycle';
