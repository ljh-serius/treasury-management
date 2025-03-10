export const fieldsConfig = {
    warehouseId: { label: 'Warehouse ID', type: 'text', faker: 'datatype.uuid' },
    warehouseName: { label: 'Warehouse Name', type: 'text', faker: 'company.name' },
    location: { label: 'Location', type: 'text', faker: 'address.city' },
    capacity: { label: 'Capacity', type: 'number', faker: 'datatype.number' },
    currentInventory: { label: 'Current Inventory', type: 'number', faker: 'datatype.number' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'operational', label: 'Operational' },
            { id: 'under_maintenance', label: 'Under Maintenance' },
            { id: 'closed', label: 'Closed' },
        ],
        faker: 'random.arrayElement',
    },
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

    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Warehouses Layouts';
export const collectionName = 'warehouses-layouts';
