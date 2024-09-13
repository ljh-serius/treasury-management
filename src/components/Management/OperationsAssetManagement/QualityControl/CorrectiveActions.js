export const fieldsConfig = {
    actionId: { label: 'Action ID', type: 'text', faker: 'datatype.uuid' },
    reportId: { label: 'Report ID', type: 'text', faker: 'datatype.uuid' },
    correctiveAction: { label: 'Corrective Action', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    responsiblePerson: { label: 'Responsible Person', type: 'text', faker: 'name.fullName' },
    deadline: { label: 'Deadline', type: 'date', faker: 'date.future' },
    completionStatus: {
      label: 'Completion Status',
      type: 'select',
      options: [
        { id: 'not_started', label: 'Not Started' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'completed', label: 'Completed' }
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high_priority', label: 'High Priority' },
        { id: 'low_priority', label: 'Low Priority' },
        { id: 'time_sensitive', label: 'Time Sensitive' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Corrective Actions';
export const collectionName = 'corrective-actions';
