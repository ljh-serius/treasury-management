export const fieldsConfig = {
    assignmentId: { label: 'Assignment ID', type: 'text', faker: 'datatype.uuid' },
    taskId: { label: 'Task ID', type: 'text', faker: 'datatype.uuid' },
    assigneeId: { label: 'Assignee ID', type: 'text', faker: 'datatype.uuid' },
    assignedBy: { label: 'Assigned By', type: 'text', faker: 'name.fullName' },
    role: { label: 'Role', type: 'text', faker: 'name.jobTitle' },
    assignmentDate: { label: 'Assignment Date', type: 'date', faker: 'date.past' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Tasks Assignments';
export const collectionName = 'tasks-assignements';