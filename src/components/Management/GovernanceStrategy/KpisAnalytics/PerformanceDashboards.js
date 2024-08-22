export const fieldsConfig = {
    dashboardId: { label: 'Dashboard ID', type: 'text', faker: 'datatype.uuid' },
    dashboardName: { label: 'Dashboard Name', type: 'text', faker: 'company.bs' },
    kpiMetrics: { label: 'KPI Metrics', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastUpdated: { label: 'Last Updated', type: 'date', faker: 'date.past' },
    tags: {
      label: 'Tags',
      type: 'select',
      options: [],
      multiple: true,
      faker: 'lorem.words',
    },
  };
  
export const entityName = 'Performance Dashboards';
export const collectionName = 'performance-dashboards'