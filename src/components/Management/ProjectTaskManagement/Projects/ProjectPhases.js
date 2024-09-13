export const fieldsConfig = {
  phaseId: { label: 'Phase ID', type: 'text', faker: 'datatype.uuid' },
  projectId: { label: 'Project ID', type: 'text', faker: 'datatype.uuid' },
  phaseName: { label: 'Phase Name', type: 'text', faker: 'commerce.productName' },
  startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
  endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
  phaseStatus: {
    label: 'Phase Status',
    type: 'select',
    options: [
      { id: 'not-started', label: 'Not Started' },
      { id: 'in-progress', label: 'In Progress' },
      { id: 'completed', label: 'Completed' },
      { id: 'on-hold', label: 'On Hold' },
    ],
    faker: 'random.arrayElement',
  },
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'urgent', label: 'Urgent' },
      { id: 'review', label: 'Review' },
      { id: 'completed', label: 'Completed' },
      { id: 'on-hold', label: 'On Hold' },
      { id: 'important', label: 'Important' },
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Project Phases';
export const collectionName = 'project-phases';
  