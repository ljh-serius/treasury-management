export const fieldsConfig = {
    documentId: { label: 'Document ID', type: 'text', faker: 'datatype.uuid' },
    shipmentId: { label: 'Shipment ID', type: 'text', faker: 'datatype.uuid' },
    documentType: {
      label: 'Document Type',
      type: 'select',
      options: [
        { id: 'bill-of-lading', label: 'Bill of Lading' },
        { id: 'invoice', label: 'Invoice' },
        { id: 'export-declaration', label: 'Export Declaration' },
      ],
      faker: 'random.arrayElement',
    },
    issueDate: { label: 'Issue Date', type: 'date', faker: 'date.past' },
    expirationDate: { label: 'Expiration Date', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'review', label: 'Review' },
        { id: 'pending', label: 'Pending' },
        { id: 'completed', label: 'Completed' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Customs Documentation';
  export const collectionName = 'customs-documentation';
  