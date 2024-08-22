export const fieldsConfig = {
    initiativeId: { label: 'Initiative ID', type: 'text', faker: 'datatype.uuid' },
    initiativeName: { label: 'Initiative Name', type: 'text', faker: 'company.catchPhrase' },
    startDate: { label: 'Start Date', type: 'date', faker: 'date.past' },
    endDate: { label: 'End Date', type: 'date', faker: 'date.future' },
    participants: { label: 'Participants', type: 'number', faker: 'finance.amount' },
    hoursContributed: { label: 'Hours Contributed', type: 'number', faker: 'finance.amount' },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.paragraph' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Volunteer Initiatives';
export const collectionName = 'volunteer-initiatives';
