export const fieldsConfig = {
    routeId: { label: 'Route ID', type: 'text', faker: 'datatype.uuid' },
    origin: { label: 'Origin', type: 'text', faker: 'address.city' },
    destination: { label: 'Destination', type: 'text', faker: 'address.city' },
    transportMode: {
      label: 'Transport Mode',
      type: 'select',
      options: [
        { id: 'air', label: 'Air' },
        { id: 'sea', label: 'Sea' },
        { id: 'road', label: 'Road' }
      ],
      faker: 'random.arrayElement',
    },
    estimatedDeliveryTime: { label: 'Estimated Delivery Time', type: 'number', faker: 'datatype.number' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'critical', label: 'Critical' },
        { id: 'standard', label: 'Standard' },
        { id: 'priority', label: 'Priority' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Logistics Routes';
export const collectionName = 'logistics-routes';
