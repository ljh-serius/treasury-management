export const fieldsConfig = {
    segmentId: { label: 'Segment ID', type: 'text', faker: 'datatype.uuid' },
    segmentName: { label: 'Segment Name', type: 'text', faker: 'company.catchPhrase' },
    criteria: { label: 'Criteria', type: 'text', faker: 'lorem.sentence' },
    customerCount: { label: 'Customer Count', type: 'number', faker: 'datatype.number' },
    revenueContribution: { label: 'Revenue Contribution', type: 'number', faker: 'finance.amount' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],  // Populate with actual tags
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
  };
  

      
export const entityName = 'Customer Segementation';
export const collectionName = 'customer-segmentation';
