export const fieldsConfig = {
    agreementId: { label: 'Agreement ID', type: 'text', faker: 'datatype.uuid' },
    tenantName: { label: 'Tenant Name', type: 'text', faker: 'name.fullName' },
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    monthlyRent: { label: 'Monthly Rent', type: 'number', faker: 'finance.amount' },
    securityDeposit: { label: 'Security Deposit', type: 'number', faker: 'finance.amount' },
    leaseTerms: { label: 'Lease Terms', type: 'text', faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'urgent', label: 'Urgent' },
        { id: 'important', label: 'Important' },
        { id: 'renewal', label: 'Renewal' },
        { id: 'expiring-soon', label: 'Expiring Soon' },
        { id: 'under-review', label: 'Under Review' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Rental Agreements';
  export const collectionName = 'rental-agreements';
  