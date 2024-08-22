export const fieldsConfig = {
    tenantId: { label: 'Tenant ID', type: 'text', faker: 'datatype.uuid' },
    tenantName: { label: 'Tenant Name', type: 'text', faker: 'name.fullName' },
    propertyId: { label: 'Property ID', type: 'text', faker: 'datatype.uuid' },
    contactDetails: { label: 'Contact Details', type: 'text', faker: 'phone.imei' },
    leaseStartDate: { label: 'Lease Start Date', type: 'date', faker: 'date.past' },
    leaseEndDate: { label: 'Lease End Date', type: 'date', faker: 'date.future' },
    monthlyRent: { label: 'Monthly Rent', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Tenant Records';
export const collectionName = 'tenant-records';
