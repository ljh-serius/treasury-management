export const fieldsConfig = {
    priceListId: { label: 'Price List ID', type: 'text', faker: 'datatype.uuid' },
    priceListName: { label: 'Price List Name', type: 'text', faker: 'commerce.productName' },
    currency: {
      label: 'Currency',
      type: 'select',
      options: [
        { id: 'USD', label: 'USD' },
        { id: 'EUR', label: 'EUR' },
        { id: 'GBP', label: 'GBP' },
        { id: 'JPY', label: 'JPY' }
      ],
      faker: 'random.arrayElement',
    },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'global', label: 'Global' },
        { id: 'regional', label: 'Regional' },
        { id: 'discounted', label: 'Discounted' },
        { id: 'promotional', label: 'Promotional' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Price Lists';
export const collectionName = 'price-lists';
