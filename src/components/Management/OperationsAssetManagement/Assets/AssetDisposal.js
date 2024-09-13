export const fieldsConfig = {
    disposalId: { label: 'Disposal ID', type: 'text', faker: 'datatype.uuid' },
    assetName: { label: 'Asset Name', type: 'text', faker: 'commerce.productName' },
    disposalDate: { label: 'Disposal Date', type: 'date', faker: 'date.past' },
    disposalReason: { label: 'Disposal Reason', type: 'text', faker: 'lorem.sentence' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'obsolete', label: 'Obsolete' },
        { id: 'end_of_life', label: 'End of Life' },
        { id: 'replacement', label: 'Replacement' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Asset Disposal';
export const collectionName = 'asset-disposal';
