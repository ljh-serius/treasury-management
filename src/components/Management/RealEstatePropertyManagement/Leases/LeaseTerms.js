export const fieldsConfig = {
    leaseId: { label: 'Lease ID', type: 'text', faker: 'datatype.uuid' },
    tenantName: { label: 'Tenant Name', type: 'text', faker: 'name.fullName' },
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    leaseStartDate: { label: 'Lease Start Date', type: 'date', faker: 'date.past' },
    leaseEndDate: { label: 'Lease End Date', type: 'date', faker: 'date.future' },
    monthlyRent: { label: 'Monthly Rent', type: 'number', faker: 'finance.amount' },
    securityDeposit: { label: 'Security Deposit', type: 'number', faker: 'finance.amount' },
    terms: { label: 'Terms', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Lease Terms';
export const collectionName = 'lease-terms';
