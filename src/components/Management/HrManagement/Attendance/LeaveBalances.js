export const fieldsConfig = {
  employeeId: { label: 'Employee ID', type: 'text', faker: 'datatype.uuid' },
  leaveType: {
    label: 'Leave Type',
    type: 'select',
    options: [
      { id: 'vacation', label: 'Vacation' },
      { id: 'sick_leave', label: 'Sick Leave' },
      { id: 'personal_leave', label: 'Personal Leave' },
    ],
    faker: 'random.arrayElement',
  },
  totalLeaves: { label: 'Total Leaves', type: 'number', faker: 'datatype.number' },
  usedLeaves: { label: 'Used Leaves', type: 'number', faker: 'datatype.number' },
  remainingLeaves: { label: 'Remaining Leaves', type: 'number', faker: 'datatype.number' },
  fiscalYear: { label: 'Fiscal Year', type: 'number', faker: 'date.past' },
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'HR', label: 'HR' },
      { id: 'employee-management', label: 'Employee Management' },
      { id: 'leave-tracking', label: 'Leave Tracking' },
      { id: 'vacation-leave', label: 'Vacation Leave' },
    ],
    multiple: true,
    faker: 'lorem.words',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Leave Balances';
export const collectionName = 'leave-balances';
