export const fieldsConfig = {
  depreciationId: { label: 'Depreciation ID', type: 'text', faker: 'datatype.uuid' },
  assetName: { label: 'Asset Name', type: 'text', faker: 'commerce.productName' },
  purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
  depreciationRate: { label: 'Depreciation Rate', type: 'number', faker: 'datatype.float' },
  accumulatedDepreciation: { label: 'Accumulated Depreciation', type: 'number', faker: 'finance.amount' },
  ecoContribution: { label: 'Eco Contribution', type: 'number', faker: 'finance.amount' },  // Eco-tax contribution (French-specific)
  tags: {
    label: 'Tags',
    type: 'select',
    options: [
      { id: 'fully_depreciated', label: 'Fully Depreciated' },
      { id: 'under_depreciation', label: 'Under Depreciation' },
      { id: 'residual_value', label: 'Residual Value' }
    ],
    multiple: true,
    faker: 'random.arrayElement',
  },
  createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
  lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
  createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Asset Depreciation';
export const collectionName = 'asset-depreciation';
