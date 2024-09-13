export const fieldsConfig = {
    promotionId: { label: 'Promotion ID', type: 'text', faker: 'datatype.uuid' },
    promotionName: { label: 'Promotion Name', type: 'text', faker: 'commerce.productName' },
    promotionDescription: { label: 'Promotion Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    discountRate: { label: 'Discount Rate (%)', type: 'number', faker: 'datatype.number' },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'seasonal', label: 'Seasonal' },
        { id: 'clearance', label: 'Clearance' },
        { id: 'holiday', label: 'Holiday' },
        { id: 'limited-time', label: 'Limited Time' },
        { id: 'bulk-purchase', label: 'Bulk Purchase' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Promotional Pricing';
  export const collectionName = 'promotional-pricing';
  