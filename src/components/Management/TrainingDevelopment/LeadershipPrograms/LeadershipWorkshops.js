export const fieldsConfig = {
    workshopId: { label: 'Workshop ID', type: 'text', faker: 'datatype.uuid' },
    workshopTitle: { label: 'Workshop Title', type: 'text', faker: 'lorem.sentence' },
    description: { label: 'Description', type: 'text', faker: 'lorem.paragraph' },
    facilitator: { label: 'Facilitator', type: 'text', faker: 'name.fullName' },
    duration: { label: 'Duration (hours)', type: 'number', faker: 'finance.amount' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.future' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    location: { label: 'Location', type: 'text', faker: 'address.city' },
    participants: { label: 'Participants', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Leadership Workshops';
export const collectionName = 'leadership-workshops';
