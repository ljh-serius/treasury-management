export const fieldsConfig = {
    milestoneId: { label: 'Milestone ID', type: 'text', faker: 'datatype.uuid' },
    projectName: { label: 'Project Name', type: 'text', faker: 'company.catchPhrase' },
    milestoneTitle: { label: 'Milestone Title', type: 'text', faker: 'lorem.sentence' },
    milestoneDescription: { label: 'Milestone Description', type: 'text', faker: 'lorem.paragraph' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
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
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'critical', label: 'Critical' },
        { id: 'high-priority', label: 'High Priority' },
        { id: 'low-priority', label: 'Low Priority' },
        { id: 'on-hold', label: 'On Hold' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Project Milestones';
  export const collectionName = 'project-milestones';
  