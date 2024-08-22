export const fieldsConfig = {
    freightId: { label: 'Freight ID', type: 'text', faker: 'datatype.uuid' },
    carrier: { label: 'Carrier', type: 'text', faker: 'company.name' },
    freightType: {
        label: 'Freight Type',
        type: 'select',
        options: [
            { id: 'land', label: 'Land' },
            { id: 'sea', label: 'Sea' },
            { id: 'air', label: 'Air' },
        ],
        faker: 'random.arrayElement',
    },
    departureDate: { label: 'Departure Date', type: 'date', faker: 'date.past' },
    arrivalDate: { label: 'Arrival Date', type: 'date', faker: 'date.future' },
    cost: { label: 'Cost', type: 'number', faker: 'finance.amount' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Freight Management';
export const collectionName = 'freight-management';
