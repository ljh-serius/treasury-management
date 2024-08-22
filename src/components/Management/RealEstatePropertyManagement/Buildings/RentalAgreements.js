export const fieldsConfig = {
    agreementId: { label: 'Agreement ID', type: 'text', faker: 'datatype.uuid' },
    tenantName: { label: 'Tenant Name', type: 'text', faker: 'name.fullName' },
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    monthlyRent: { label: 'Monthly Rent', type: 'number', faker: 'finance.amount' },
    securityDeposit: { label: 'Security Deposit', type: 'number', faker: 'finance.amount' },
    leaseTerms: { label: 'Lease Terms', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Rental Agreements';
export const collectionName = 'rental-agreements';
