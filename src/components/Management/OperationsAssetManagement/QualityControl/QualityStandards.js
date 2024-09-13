export const fieldsConfig = {
    standardId: { label: 'Standard ID', type: 'text', faker: 'datatype.uuid' },
    standardName: { label: 'Standard Name', type: 'text', faker: 'commerce.productAdjective' },
    applicableProducts: { label: 'Applicable Products', type: 'text', faker: 'commerce.productName' },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.sentence' },
    approvalDate: { label: 'Approval Date', type: 'date', faker: 'date.past' },
    status: {
      label: 'Status',
      type: 'select',
      options: [
        { id: 'approved', label: 'Approved' },
        { id: 'pending', label: 'Pending' },
        { id: 'rejected', label: 'Rejected' }
      ],
      faker: 'random.arrayElement',
    },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'international', label: 'International' },
        { id: 'local', label: 'Local' },
        { id: 'mandatory', label: 'Mandatory' },
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Quality Standards';
export const collectionName = 'quality-standards';
