export const fieldsConfig = {
  approvalId: { label: 'Approval ID', type: 'text', faker: 'datatype.uuid' },
  timesheetId: { label: 'Timesheet ID', type: 'text', faker: 'datatype.uuid' },
  approverId: { label: 'Approver ID', type: 'text', faker: 'datatype.uuid' },
  approvalDate: { label: 'Approval Date', type: 'date', faker: 'date.past' },
  approvalStatus: {
    label: 'Approval Status',
    type: 'select',
    options: [
      { id: 'approved', label: 'Approved' },
      { id: 'rejected', label: 'Rejected' },
      { id: 'pending', label: 'Pending' },
    ],
    faker: 'random.arrayElement',
  },
  remarks: { label: 'Remarks', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'urgent', label: 'Urgent' },
      { id: 'pending-review', label: 'Pending Review' },
      { id: 'approved', label: 'Approved' },
      { id: 'rejected', label: 'Rejected' },
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Timesheets Approvals';
export const collectionName = 'timesheets-approval';
