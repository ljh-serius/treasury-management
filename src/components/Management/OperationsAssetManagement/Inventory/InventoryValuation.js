export const fieldsConfig = {
    valuationId: { label: 'Valuation ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    unitCost: { label: 'Unit Cost', type: 'number', faker: 'finance.amount' },
    totalStock: { label: 'Total Stock', type: 'number', faker: 'datatype.number' },
    totalValuation: { label: 'Total Valuation', type: 'number', faker: 'finance.amount' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'raw_material', label: 'Raw Material' },
        { id: 'finished_goods', label: 'Finished Goods' },
        { id: 'work_in_progress', label: 'Work in Progress' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Inventory Valuation';
export const collectionName = 'inventory-valuation';
