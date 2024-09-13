export const fieldsConfig = {
    discountId: { label: 'Discount ID', type: 'text', faker: 'datatype.uuid' },
    discountName: { label: 'Discount Name', type: 'text', faker: 'commerce.productName' },
    discountRate: { label: 'Discount Rate', type: 'number', faker: 'datatype.float' },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'seasonal', label: 'Seasonal' },
        { id: 'limited_time', label: 'Limited Time' },
        { id: 'bulk', label: 'Bulk' },
        { id: 'clearance', label: 'Clearance' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Discounts';
export const collectionName = 'discounts';
