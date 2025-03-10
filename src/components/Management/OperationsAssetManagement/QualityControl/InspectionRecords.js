export const fieldsConfig = {
    inspectionId: { label: 'Inspection ID', type: 'text', faker: 'datatype.uuid' },
    productId: { label: 'Product ID', type: 'text', faker: 'datatype.uuid' },
    productName: { label: 'Product Name', type: 'text', faker: 'commerce.productName' },
    inspectionDate: { label: 'Inspection Date', type: 'date', faker: 'date.past' },
    inspectionResult: {
      label: 'Inspection Result',
      type: 'select',
      options: [
        { id: 'pass', label: 'Pass' },
        { id: 'fail', label: 'Fail' },
        { id: 'rework_required', label: 'Rework Required' },
      ],
      faker: 'random.arrayElement',
    },
    inspectorName: { label: 'Inspector Name', type: 'text', faker: 'name.fullName' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],  // Populate with actual tags
      multiple: true,
      faker: 'lorem.words',
    },
    comments: { label: 'Comments', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
  };
  
export const entityName = 'Inspection Records';
export const collectionName = 'inspection-records';
