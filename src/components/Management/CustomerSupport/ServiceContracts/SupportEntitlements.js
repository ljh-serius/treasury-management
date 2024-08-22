export const fieldsConfig = {
    entitlementId: { label: 'Entitlement ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    serviceId: { label: 'Service ID', type: 'text', faker: 'datatype.uuid' },
    supportLevel: {
        label: 'Support Level',
        type: 'select',
        options: [
            { id: 'basic', label: 'Basic' },
            { id: 'premium', label: 'Premium' },
            { id: 'enterprise', label: 'Enterprise' },
        ],
        faker: 'random.arrayElement',
    },
    validityStartDate: { label: 'Validity Start Date', type: 'date', faker: 'date.past' },
    validityEndDate: { label: 'Validity End Date', type: 'date', faker: 'date.future' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Support Entitlements';
export const collectionName = 'support-entitlements';
