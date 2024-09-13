export const fieldsConfig = {
    discontinuationId: { label: 'Discontinuation ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    reasonForDiscontinuation: { label: 'Reason For Discontinuation', type: 'text', faker: 'lorem.sentence' },
    discontinuationDate: { label: 'Discontinuation Date', type: 'date', faker: 'date.past' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'phased_out', label: 'Phased Out' },
        { id: 'obsolete', label: 'Obsolete' },
        { id: 'replaced', label: 'Replaced' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Product Discontinuation';
export const collectionName = 'product-discontinuation';
