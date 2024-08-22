export const fieldsConfig = {
    accountId: { label: 'Account ID', type: 'text', faker: 'datatype.uuid' },
    debit: { label: 'Debit', type: 'number', faker: 'finance.amount' },
    credit: { label: 'Credit', type: 'number', faker: 'finance.amount' },
    balance: { label: 'Balance', type: 'number', faker: 'finance.amount' },
    currency: {
      label: 'Currency',
      type: 'select',
      options: [],  // Populate with actual currency options
      faker: 'finance.currencyCode',
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
  
export const entityName = 'Trial Balance';
export const collectionName = 'trial-balance';
