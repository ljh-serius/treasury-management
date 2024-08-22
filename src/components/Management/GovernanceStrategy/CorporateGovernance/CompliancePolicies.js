export const fieldsConfig = {
    policyId: { label: 'Policy ID', type: 'text', faker: 'datatype.uuid' },
    policyName: { label: 'Policy Name', type: 'text', faker: 'company.bs' },
    policyDescription: { label: 'Policy Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    implementationDate: { label: 'Implementation Date', type: 'date', faker: 'date.past' },
    reviewDate: { label: 'Review Date', type: 'date', faker: 'date.future' },
    policyOwner: { label: 'Policy Owner', type: 'text', faker: 'name.fullName' },
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
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  
export const entityName = 'Compliane Policies';
export const collectionName = 'compliance-policies'