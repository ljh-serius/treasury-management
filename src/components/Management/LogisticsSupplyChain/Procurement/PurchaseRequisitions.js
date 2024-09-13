export const fieldsConfig = {
    requisitionId: { label: 'Requisition ID', type: 'text', faker: 'datatype.uuid' },
    requesterId: { label: 'Requester ID', type: 'text', faker: 'datatype.uuid' },
    requestDate: { label: 'Request Date', type: 'date', faker: 'date.past' },
    itemsRequested: { label: 'Items Requested', type: 'text', faker: 'commerce.productDescription' },
    quantity: { label: 'Quantity', type: 'number', faker: 'finance.amount' },
    totalCost: { label: 'Total Cost', type: 'number', faker: 'finance.amount' },
    approvalStatus: {
      label: 'Approval Status',
      type: 'select',
      options: [
        { id: 'pending', label: 'Pending' },
        { id: 'approved', label: 'Approved' },
        { id: 'rejected', label: 'Rejected' },
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'high-priority', label: 'High Priority' },
        { id: 'urgent', label: 'Urgent' },
        { id: 'pending', label: 'Pending' },
        { id: 'approved', label: 'Approved' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Purchase Requisitions';
  export const collectionName = 'purchase-requisitions';
  