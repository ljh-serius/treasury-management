export const fieldsConfig = {
    promotionId: { label: 'Promotion ID', type: 'text', faker: 'datatype.uuid' },
    promotionName: { label: 'Promotion Name', type: 'text', faker: 'commerce.productName' },
    promotionType: {
      label: 'Promotion Type',
      type: 'select',
      options: [
        { id: 'buy_one_get_one', label: 'Buy One Get One' },
        { id: 'percentage_off', label: 'Percentage Off' },
        { id: 'free_shipping', label: 'Free Shipping' }
      ],
      faker: 'random.arrayElement',
    },
    validFrom: { label: 'Valid From', type: 'date', faker: 'date.past' },
    validTo: { label: 'Valid To', type: 'date', faker: 'date.future' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'online_only', label: 'Online Only' },
        { id: 'store_wide', label: 'Store-Wide' },
        { id: 'exclusive', label: 'Exclusive' },
        { id: 'limited_time', label: 'Limited Time' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Promotions';
export const collectionName = 'promotions';
