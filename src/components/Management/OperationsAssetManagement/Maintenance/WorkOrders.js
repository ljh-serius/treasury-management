export const fieldsConfig = {
    workOrderId: { label: 'Work Order ID', type: 'text', faker: 'datatype.uuid' },
    assetName: { label: 'Asset Name', type: 'text', faker: 'commerce.productName' },
    description: { label: 'Description', type: 'text', faker: 'lorem.sentence' },
    priority: {
      label: 'Priority',
      type: 'select',
      options: [
        { id: 'high', label: 'High' },
        { id: 'medium', label: 'Medium' },
        { id: 'low', label: 'Low' }
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'scheduled', label: 'Scheduled' },
        { id: 'unscheduled', label: 'Unscheduled' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Work Orders';
export const collectionName = 'work-orders';
