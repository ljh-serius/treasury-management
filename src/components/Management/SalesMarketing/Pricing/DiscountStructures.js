export const fieldsConfig = {
    discountId: { label: 'Discount ID', type: 'text', faker: 'datatype.uuid' },
    discountName: { label: 'Discount Name', type: 'text', faker: 'commerce.productName' },
    discountPercentage: { label: 'Discount Percentage (%)', type: 'number', faker: 'datatype.number' },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Discount Structures';
export const collectionName = 'discount-structures';
