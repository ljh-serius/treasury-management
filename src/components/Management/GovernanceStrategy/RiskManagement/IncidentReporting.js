export const fieldsConfig = {
    incidentId: { label: 'Incident ID', type: 'text', faker: 'datatype.uuid' },
    incidentDescription: { label: 'Incident Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    incidentDate: { label: 'Incident Date', type: 'date', faker: 'date.past' },
    reportedBy: { label: 'Reported By', type: 'text', faker: 'name.fullName' },
    severity: {
      label: 'Severity',
      type: 'select',
      options: [
        { id: 'low', label: 'Low' },
        { id: 'medium', label: 'Medium' },
        { id: 'high', label: 'High' },
      ],
      faker: 'random.arrayElement',
    },
    actionsTaken: { label: 'Actions Taken', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'open', label: 'Open' },
        { id: 'in-progress', label: 'In Progress' },
        { id: 'closed', label: 'Closed' },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };

export const entityName = 'Incident Reporting';
export const collectionName = 'incident-reporting'
  