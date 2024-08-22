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
  };
  
export const entityName = 'Performance Dashboards';
export const collectionName = 'performance-dashboards'