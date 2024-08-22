export const fieldsConfig = {
    assetId: { label: 'Asset ID', type: 'text', faker: 'datatype.uuid' },
    assetName: { label: 'Asset Name', type: 'text', faker: 'commerce.productName' },
    assetType: {
        label: 'Asset Type',
        type: 'select',
        options: [
            { id: 'fixed', label: 'Fixed Asset' },
            { id: 'current', label: 'Current Asset' },
            { id: 'intangible', label: 'Intangible Asset' },
        ],
        faker: 'random.arrayElement',
    },
    purchaseDate: { label: 'Purchase Date', type: 'date', faker: 'date.past' },
    purchasePrice: { label: 'Purchase Price', type: 'number', faker: 'finance.amount' },
    depreciationRate: { label: 'Depreciation Rate (%)', type: 'number', faker: 'datatype.number' },
    currentValue: { label: 'Current Value', type: 'number', faker: 'finance.amount' },
    location: { label: 'Location', type: 'text', faker: 'address.city' },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' },
            { id: 'disposed', label: 'Disposed' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],  // Populate with actual tags
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Assets Depreciation';
export const collectionName = 'assets-depreciation';