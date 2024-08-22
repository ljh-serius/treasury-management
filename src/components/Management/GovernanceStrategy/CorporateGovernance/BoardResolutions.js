export const fieldsConfig = {
    resolutionId: { label: 'Resolution ID', type: 'text', faker: 'datatype.uuid' },
    resolutionTitle: { label: 'Resolution Title', type: 'text', faker: 'company.bs' },
    resolutionText: { label: 'Resolution Text', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    resolutionDate: { label: 'Resolution Date', type: 'date', faker: 'date.past' },
    approvedBy: { label: 'Approved By', type: 'text', faker: 'name.fullName' },
    resolutionStatus: {
      label: 'Resolution Status',
      type: 'select',
      options: [
        { id: 'approved', label: 'Approved' },
        { id: 'rejected', label: 'Rejected' },
        { id: 'pending', label: 'Pending' },
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
  
  
export const entityName = 'Board Resolutions';
export const collectionName = 'board-resolutions'