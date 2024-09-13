export const fieldsConfig = {
    targetId: { label: 'Target ID', type: 'text', faker: 'datatype.uuid' },
    companyName: { label: 'Company Name', type: 'text', faker: 'company.name' },
    industry: { label: 'Industry', type: 'text', faker: 'company.bs' },
    location: { label: 'Location', type: 'text', faker: 'address.city' },
    marketValue: { label: 'Market Value', type: 'number', faker: 'finance.amount' },
    revenue: { label: 'Revenue', type: 'number', faker: 'finance.amount' },
    employeeCount: { label: 'Employee Count', type: 'number', faker: 'finance.amount' },
    rationale: { label: 'Rationale', type: 'text', faker: 'lorem.paragraph' },
    identifiedBy: { label: 'Identified By', type: 'text', faker: 'name.fullName' },
    identificationDate: { label: 'Identification Date', type: 'date', faker: 'date.past' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'under-review', label: 'Under Review' },
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
        { id: 'low-risk', label: 'Low Risk' },
        { id: 'high-risk', label: 'High Risk' },
        { id: 'pending', label: 'Pending' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Target Identification';
  export const collectionName = 'target-identification';
  