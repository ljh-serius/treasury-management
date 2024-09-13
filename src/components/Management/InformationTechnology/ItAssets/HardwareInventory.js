export const fieldsConfig = {
    inventoryId: { label: 'Inventory ID', type: 'text', faker: 'datatype.uuid' },
    assetName: { label: 'Asset Name', type: 'text', faker: 'commerce.productName' },
    assetType: {
        label: 'Asset Type',
        type: 'select',
        options: [
            { id: 'laptop', label: 'Laptop' },
            { id: 'desktop', label: 'Desktop' },
            { id: 'server', label: 'Server' },
            { id: 'network-device', label: 'Network Device' },
        ],
        faker: 'random.arrayElement',
    },
    serialNumber: { label: 'Serial Number', type: 'text', faker: 'datatype.uuid' },
    purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
    warrantyExpirationDate: { label: 'Warranty Expiration Date', type: 'date', faker: 'date.future' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'available', label: 'Available' },
            { id: 'in-use', label: 'In Use' },
            { id: 'under-maintenance', label: 'Under Maintenance' },
            { id: 'retired', label: 'Retired' },
        ],
        faker: 'random.arrayElement',
    },
    location: { label: 'Location', type: 'text', faker: 'address.streetAddress' },
    assignedTo: { label: 'Assigned To', type: 'text', faker: 'name.fullName' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'critical', label: 'Critical' },
            { id: 'review', label: 'Review' },
            { id: 'urgent', label: 'Urgent' },
            { id: 'maintenance', label: 'Maintenance' },
        ],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Hardware Inventory';
export const collectionName = 'hardware-inventory';
