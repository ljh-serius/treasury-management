export const fieldsConfig = {
    inventoryId: { label: 'Inventory ID', type: 'text', faker: 'datatype.uuid' },
    productId: { label: 'Product ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    warehouseId: { label: 'Warehouse ID', type: 'text', faker: 'datatype.uuid' },
    warehouseLocation: { label: 'Warehouse Location', type: 'text', faker: 'address.city' },
    quantity: { label: 'Quantity', type: 'number', faker: 'datatype.number' },
    reorderLevel: { label: 'Reorder Level', type: 'number', faker: 'datatype.number' },
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
            { id: 'in_stock', label: 'In Stock' },
            { id: 'out_of_stock', label: 'Out of Stock' },
            { id: 'on_order', label: 'On Order' },
        ],
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Stock Levels';
export const collectionName = 'stock-level';
