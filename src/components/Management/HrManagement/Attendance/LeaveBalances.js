export const fieldsConfig = {
  balanceId: { label: 'Balance ID', type: 'text', faker: 'datatype.uuid' },
  employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
  leaveType: {
      label: 'Leave Type',
      type: 'select',
      options: [
          { id: 'annual', label: 'Annual' },
          { id: 'sick', label: 'Sick' },
          { id: 'maternity', label: 'Maternity' },
      ],
      faker: 'random.arrayElement',
  },
  availableDays: { label: 'Available Days', type: 'number', faker: 'datatype.number' },
  takenDays: { label: 'Taken Days', type: 'number', faker: 'datatype.number' },
  remainingDays: { label: 'Remaining Days', type: 'number', faker: 'datatype.number' },
  status: {
      label: 'Status',
      type: 'select',
      options: [
          { id: 'active', label: 'Active' },
          { id: 'expired', label: 'Expired' },
      ],
      faker: 'random.arrayElement',
  },
  tags: {
      label: 'Tags',
      type: 'select',
      options: [
          { id: 'urgent', label: 'Urgent' },
          { id: 'review', label: 'Review' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Leave Balances';
export const collectionName = 'leave-balances';
