export const fieldsConfig = {
    shipmentId: { label: 'Shipment ID', type: 'text', faker: 'datatype.uuid' },
    trackingNumber: { label: 'Tracking Number', type: 'text', faker: 'finance.account' },
    carrier: { label: 'Carrier', type: 'text', faker: 'company.name' },
    shipmentDate: { label: 'Shipment Date', type: 'date', faker: 'date.past' },
    estimatedArrival: { label: 'Estimated Arrival', type: 'date', faker: 'date.future' },
    currentStatus: {
      label: 'Current Status',
      type: 'select',
      options: [
        { id: 'in-transit', label: 'In Transit' },
        { id: 'delivered', label: 'Delivered' },
        { id: 'delayed', label: 'Delayed' },
        { id: 'canceled', label: 'Canceled' },
      ],
      faker: 'random.arrayElement',
    },
    destination: { label: 'Destination', type: 'text', faker: 'address.city' },
    origin: { label: 'Origin', type: 'text', faker: 'address.city' },
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
  
export const entityName = 'Shipment Tracking';
export const collectionName = 'shipment-tracking'