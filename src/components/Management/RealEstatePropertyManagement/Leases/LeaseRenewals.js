export const fieldsConfig = {
    renewalId: { label: 'Renewal ID', type: 'text', faker: 'datatype.uuid' },
    leaseId: { label: 'Lease ID', type: 'text', faker: 'datatype.uuid' },
    renewalDate: { label: 'Renewal Date', type: 'date', faker: 'date.past' },
    newEndDate: { label: 'New End Date', type: 'date', faker: 'date.future' },
    monthlyRent: { label: 'Monthly Rent', type: 'number', faker: 'finance.amount' },
    terms: { label: 'Terms', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Lease Renewals';
export const collectionName = 'lease-renewals';
