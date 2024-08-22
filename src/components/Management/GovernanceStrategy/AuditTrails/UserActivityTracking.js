export const fieldsConfig = {
    activityId: { label: 'Activity ID', type: 'text', faker: 'datatype.uuid' },
    userId: { label: 'User ID', type: 'text', faker: 'datatype.uuid' },
    activityType: {
      label: 'Activity Type',
      type: 'select',
      options: [
        { id: 'login', label: 'Login' },
        { id: 'data-update', label: 'Data Update' },
        { id: 'file-upload', label: 'File Upload' },
        { id: 'logout', label: 'Logout' },
      ],
      faker: 'random.arrayElement',
    },
    activityDate: { label: 'Activity Date', type: 'date', faker: 'date.past' },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    ipAddress: { label: 'IP Address', type: 'text', faker: 'internet.ip' },
    deviceInfo: { label: 'Device Info', type: 'text', faker: 'internet.userAgent' },
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

  
export const entityName = 'User Activity Tracking';
export const collectionName = 'user-activity-tracking'
  