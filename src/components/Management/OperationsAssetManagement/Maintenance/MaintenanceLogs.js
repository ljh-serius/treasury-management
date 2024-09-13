export const fieldsConfig = {
    logId: { label: 'Log ID', type: 'text', faker: 'datatype.uuid' },
    assetName: { label: 'Asset Name', type: 'text', faker: 'commerce.productName' },
    maintenanceType: {
      label: 'Maintenance Type',
      type: 'select',
      options: [
        { id: 'repair', label: 'Repair' },
        { id: 'inspection', label: 'Inspection' },
        { id: 'replacement', label: 'Replacement' }
      ],
      faker: 'random.arrayElement',
    },
    dateOfMaintenance: { label: 'Date of Maintenance', type: 'date', faker: 'date.past' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [
        { id: 'emergency', label: 'Emergency' },
        { id: 'scheduled', label: 'Scheduled' },
        { id: 'unscheduled', label: 'Unscheduled' }
      ],
      multiple: true,
      faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Maintenance Logs';
export const collectionName = 'maintenance-logs';
    