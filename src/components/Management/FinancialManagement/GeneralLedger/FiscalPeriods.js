export const fieldsConfig = {
    periodId: { label: 'Period ID', type: 'text', faker: 'datatype.uuid' },
    periodName: { label: 'Period Name', type: 'text', faker: 'date.month' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    isClosed: {
        label: 'Is Closed',
        type: 'select',
        options: [
            { id: 'yes', label: 'Yes' },
            { id: 'no', label: 'No' },
        ],
        faker: 'random.arrayElement',
    },
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

    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    lastModifiedBy: { label: 'Last Modified By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
    lastModifiedDate: { label: 'Last Modified Date', type: 'date', faker: 'date.recent' },
};

export const entityName = 'Fiscal Periods';
export const collectionName = 'fiscal-periods';
