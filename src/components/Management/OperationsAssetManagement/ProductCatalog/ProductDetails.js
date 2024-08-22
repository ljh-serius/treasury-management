export const fieldsConfig = {
    productId: { label: 'Product ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    category: {
      label: 'Category',
      type: 'select',
      options: [],  // Populate with actual categories
      faker: 'commerce.department',
    },
    price: { label: 'Price', type: 'number', faker: 'commerce.price' },
    currency: {
      label: 'Currency',
      type: 'select',
      options: [],  // Populate with actual currency options
      faker: 'finance.currencyCode',
    },
    stockQuantity: { label: 'Stock Quantity', type: 'number', faker: 'datatype.number' },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],  // Populate with actual tags
      multiple: true,
      faker: 'lorem.words',
    },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'available', label: 'Available' },
        { id: 'out_of_stock', label: 'Out of Stock' },
        { id: 'discontinued', label: 'Discontinued' },
      ],
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
  };
  
export const entityName = 'Product Details';
export const collectionName = 'product-details';
