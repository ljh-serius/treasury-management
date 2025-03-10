export const fieldsConfig = {
    trackingId: { label: 'Tracking ID', type: 'text', faker: 'datatype.uuid' },
    assetName: { label: 'Asset Name', type: 'text', faker: 'commerce.productName' },
    location: { label: 'Location', type: 'text', faker: 'address.streetAddress' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'in_use', label: 'In Use' },
        { id: 'maintenance', label: 'Maintenance' },
        { id: 'idle', label: 'Idle' },
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'critical', label: 'Critical' },
        { id: 'non_critical', label: 'Non-Critical' },
        { id: 'high_value', label: 'High Value' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Asset Tracking';
export const collectionName = 'asset-tracking';
