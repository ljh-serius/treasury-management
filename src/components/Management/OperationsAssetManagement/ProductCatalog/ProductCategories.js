export const fieldsConfig = {
    categoryId: { label: 'Category ID', type: 'text', faker: 'datatype.uuid' },
    categoryName: { label: 'Category Name', type: 'text', faker: 'commerce.department' },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'popular', label: 'Popular' },
        { id: 'new', label: 'New' },
        { id: 'featured', label: 'Featured' },
        { id: 'seasonal', label: 'Seasonal' },
        { id: 'clearance', label: 'Clearance' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Product Categories';
export const collectionName = 'product-categories';
