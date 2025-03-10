export const fieldsConfig = {
  priceListId: { label: 'Price List ID', type: 'text', faker: 'datatype.uuid' },
  productId: { label: 'Product ID', type: 'text', faker: 'datatype.uuid' },
  productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
  basePrice: { label: 'Base Price', type: 'number', faker: 'commerce.price' },
  discountRate: { label: 'Discount Rate (%)', type: 'number', faker: 'datatype.number' },
  currency: {
    label: 'Currency',
    type: 'select',
    options: [
      { id: 'USD', label: 'USD' },
      { id: 'EUR', label: 'EUR' },
      { id: 'GBP', label: 'GBP' },
      { id: 'JPY', label: 'JPY' },
      { id: 'INR', label: 'INR' },
    ],
    faker: 'finance.currencyCode',
  },
  validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
  validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'promotional', label: 'Promotional' },
      { id: 'standard', label: 'Standard' },
      { id: 'limited-time', label: 'Limited Time' },
      { id: 'seasonal', label: 'Seasonal' },
      { id: 'wholesale', label: 'Wholesale' },
    ],
    multiple: true,
    faker: 'lorem.words',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Price Lists';
export const collectionName = 'price-lists';
