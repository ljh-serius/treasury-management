export const fieldsConfig = {
    allocationId: { label: 'Allocation ID', type: 'text', faker: 'datatype.uuid' },
    projectId: { label: 'Project ID', type: 'text', faker: 'datatype.uuid' },
    resourceId: { label: 'Resource ID', type: 'text', faker: 'datatype.uuid' },
    allocatedHours: { label: 'Allocated Hours', type: 'number', faker: 'datatype.number' },
    role: { label: 'Role', type: 'text', faker: 'name.jobTitle' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'high-priority', label: 'High Priority' },
        { id: 'on-hold', label: 'On Hold' },
        { id: 'completed', label: 'Completed' },
        { id: 'review', label: 'Review' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Resource Allocations';
  export const collectionName = 'resource-allocations';
  