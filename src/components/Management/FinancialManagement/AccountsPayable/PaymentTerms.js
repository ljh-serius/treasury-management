export const fieldsConfig = {
    termId: { label: 'Term ID', type: 'text', faker: 'datatype.uuid' },
    termName: { label: 'Term Name', type: 'text', faker: 'finance.transactionType' },
    description: { label: 'Description', type: 'text', faker: 'lorem.sentence' },
    netDays: { label: 'Net Days', type: 'number', faker: 'datatype.number' },
    isActive: {
      label: 'Is Active',
      type: 'select',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],  // Populate with actual tags
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
  };
  
export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));

export const entityName = 'Payment Terms';


export const collectionName = 'payment-terms';
