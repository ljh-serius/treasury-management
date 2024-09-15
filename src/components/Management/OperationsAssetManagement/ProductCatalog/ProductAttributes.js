export const fieldsConfig = {
  attributeId: { label: 'Attribute ID', type: 'text', faker: 'datatype.uuid' },
  attributeName: { label: 'Attribute Name', type: 'text', faker: 'commerce.productAdjective' },
  valueType: {
    label: 'Value Type',
    type: 'select',
    options: [
      { id: 'string', label: 'String' },
      { id: 'number', label: 'Number' },
      { id: 'boolean', label: 'Boolean' },
      { id: 'date', label: 'Date' }
    ],
    faker: 'random.arrayElement',
  },
  ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'customizable', label: 'Customizable' },
      { id: 'required', label: 'Required' },
      { id: 'optional', label: 'Optional' },
      { id: 'system', label: 'System' }
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Product Attributes';
export const collectionName = 'product-attributes';
