export const fieldsConfig = {
    reportId: { label: 'Report ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    issueDescription: { label: 'Issue Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    severity: {
      label: 'Severity',
      type: 'select',
      options: [
        { id: 'minor', label: 'Minor' },
        { id: 'major', label: 'Major' },
        { id: 'critical', label: 'Critical' }
      ],
      faker: 'random.arrayElement',
    },
    resolutionStatus: {
      label: 'Resolution Status',
      type: 'select',
      options: [
        { id: 'open', label: 'Open' },
        { id: 'in_progress', label: 'In Progress' },
        { id: 'closed', label: 'Closed' }
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'non_urgent', label: 'Non-Urgent' },
        { id: 'follow_up', label: 'Follow-Up' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Non-conformance Reports';
export const collectionName = 'non-conformance-reports';
