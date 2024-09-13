export const fieldsConfig = {
    locationId: { label: 'Location ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    aisle: { label: 'Aisle', type: 'text', faker: 'datatype.number' },
    shelf: { label: 'Shelf', type: 'text', faker: 'datatype.number' },
    bin: { label: 'Bin', type: 'text', faker: 'datatype.number' },
    quantityInLocation: { label: 'Quantity in Location', type: 'number', faker: 'datatype.number' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'critical_stock', label: 'Critical Stock' },
        { id: 'bulk_stock', label: 'Bulk Stock' },
        { id: 'seasonal_stock', label: 'Seasonal Stock' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Inventory Locations';
export const collectionName = 'inventory-locations';
