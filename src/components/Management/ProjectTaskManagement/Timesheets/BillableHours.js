export const fieldsConfig = {
    billableId: { label: 'Billable ID', type: 'text', faker: 'datatype.uuid' },
    taskId: { label: 'Task ID', type: 'text', faker: 'datatype.uuid' },
    employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
    billableHours: { label: 'Billable Hours', type: 'number', faker: 'datatype.number' },
    billingRate: { label: 'Billing Rate', type: 'number', faker: 'finance.amount' },
    totalAmount: { label: 'Total Amount', type: 'number', faker: 'finance.amount' },
    invoiceStatus: {
      label: 'Invoice Status',
      type: 'select',
      options: [
        { id: 'invoiced', label: 'Invoiced' },
        { id: 'not-invoiced', label: 'Not Invoiced' },
        { id: 'disputed', label: 'Disputed' },
      ],
      faker: 'random.arrayElement',
    },
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

export const entityName = 'Billable Hours';
export const collectionName = 'billable-hours';