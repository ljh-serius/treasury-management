export const fieldsConfig = {
    agingId: { label: 'Aging ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    daysInInventory: { label: 'Days in Inventory', type: 'number', faker: 'datatype.number' },
    agingCategory: {
      label: 'Aging Category',
      type: 'select',
      options: [
        { id: 'less_than_30_days', label: 'Less than 30 Days' },
        { id: '30_to_60_days', label: '30 to 60 Days' },
        { id: 'more_than_60_days', label: 'More than 60 Days' }
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'slow_moving', label: 'Slow Moving' },
        { id: 'obsolete', label: 'Obsolete' },
        { id: 'excess_stock', label: 'Excess Stock' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Inventory Aging';
export const collectionName = 'inventory-aging';
