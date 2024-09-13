export const fieldsConfig = {
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    propertyName: { label: 'Property Name', type: 'text', faker: 'company.name' },
    location: { label: 'Location', type: 'text', faker: 'address.streetAddress' },
    size: { label: 'Size (sq ft)', type: 'number', faker: 'finance.amount' },
    usage: {
      label: 'Usage',
      type: 'select',
      options: [
        { id: 'office', label: 'Office' },
        { id: 'warehouse', label: 'Warehouse' },
        { id: 'factory', label: 'Factory' },
        { id: 'retail', label: 'Retail' },
      ],
      faker: 'random.arrayElement',
    },
    purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Property Details';
  export const collectionName = 'property-details';
  