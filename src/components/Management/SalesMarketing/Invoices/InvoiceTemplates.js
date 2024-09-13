export const fieldsConfig = {
    templateId: { label: 'Template ID', type: 'text', faker: 'datatype.uuid' },
    templateName: { label: 'Template Name', type: 'text', faker: 'commerce.productName' },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'financial', label: 'Financial' },
        { id: 'recurring', label: 'Recurring' },
        { id: 'one-time', label: 'One-time' },
        { id: 'digital', label: 'Digital' },
        { id: 'physical', label: 'Physical' },
      ],
      multiple: true,
      faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
  };
  
  export const entityName = 'Invoice Templates';
  export const collectionName = 'invoice-templates';
  