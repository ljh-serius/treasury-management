export const fieldsConfig = {
    auditId: { label: 'Audit ID', type: 'text', faker: 'datatype.uuid' },
    auditDate: { label: 'Audit Date', type: 'date', faker: 'date.past' },
    auditorName: { label: 'Auditor Name', type: 'text', faker: 'name.fullName' },
    department: { label: 'Department', type: 'text', faker: 'commerce.department' },
    complianceStatus: {
      label: 'Compliance Status',
      type: 'select',
      options: [
        { id: 'compliant', label: 'Compliant' },
        { id: 'non_compliant', label: 'Non-Compliant' },
        { id: 'pending', label: 'Pending' },
      ],
      faker: 'random.arrayElement',
    },
    findings: { label: 'Findings', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
          { id: 'urgent', label: 'Urgent' },
          { id: 'review', label: 'Review' },
          { id: 'important', label: 'Important' },
          { id: 'completed', label: 'Completed' },
          { id: 'follow-up', label: 'Follow-Up' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
  },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
  };
  
  
export const entityName = 'Compliance Audits';
export const collectionName = 'comliance-audits'