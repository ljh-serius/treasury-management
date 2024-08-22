export const fieldsConfig = {
    investmentId: { label: 'Investment ID', type: 'text', faker: 'datatype.uuid' },
    companyName: { label: 'Company Name', type: 'text', faker: 'company.name' },
    sharesHeld: { label: 'Shares Held', type: 'number', faker: 'datatype.number' },
    purchasePrice: { label: 'Purchase Price', type: 'number', faker: 'finance.amount' },
    currentValue: { label: 'Current Value', type: 'number', faker: 'finance.amount' },
    purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
          { id: 'urgent', label: 'Urgent' },
          { id: 'review', label: 'Review' },
          { id: 'important', label: 'Important' },
          { id: 'completed', label: 'Completed' },
          { id: 'follow-up', label: 'Follow-Up' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
  },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'active', label: 'Active' },
        { id: 'sold', label: 'Sold' },
        { id: 'inactive', label: 'Inactive' },
      ],
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
  };
  
export const entityName = 'Equity Investments';
export const collectionName = 'equity-investments';
