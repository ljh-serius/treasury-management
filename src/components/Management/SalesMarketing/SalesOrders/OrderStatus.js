export const fieldsConfig = {
    orderId: { label: 'Order ID', type: 'text', faker: 'datatype.uuid' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'pending', label: 'Pending' },
            { id: 'processing', label: 'Processing' },
            { id: 'shipped', label: 'Shipped' },
            { id: 'delivered', label: 'Delivered' },
            { id: 'canceled', label: 'Canceled' },
        ],
        faker: 'random.arrayElement',
    },
    lastUpdated: { label: 'Last Updated', type: 'date', faker: 'date.recent' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    updatedBy: { label: 'Updated By', type: 'text', faker: 'name.fullName' },
};

export const entityName = 'Order Status';
export const collectionName = 'order-status';
