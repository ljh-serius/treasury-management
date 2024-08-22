export const fieldsConfig = {
    surveyId: { label: 'Survey ID', type: 'text', faker: 'datatype.uuid' },
    customerId: { label: 'Customer ID', type: 'text', faker: 'datatype.uuid' },
    surveyDate: { label: 'Survey Date', type: 'date', faker: 'date.past' },
    satisfactionScore: {
        label: 'Satisfaction Score',
        type: 'select',
        options: [
            { id: '1', label: '1' },
            { id: '2', label: '2' },
            { id: '3', label: '3' },
            { id: '4', label: '4' },
            { id: '5', label: '5' },
        ],
        faker: 'random.arrayElement',
    },
    comments: { label: 'Comments', type: 'text', faker: 'lorem.sentences' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Customer Surveys';
export const collectionName = 'customer-surveys';
