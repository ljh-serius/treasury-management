export const fieldsConfig = {
    leadId: { label: 'Lead ID', type: 'text', faker: 'datatype.uuid' },
    nurtureStage: {
        label: 'Nurture Stage',
        type: 'select',
        options: [
            { id: 'awareness', label: 'Awareness' },
            { id: 'consideration', label: 'Consideration' },
            { id: 'decision', label: 'Decision' },
        ],
        faker: 'random.arrayElement',
    },
    lastContactDate: { label: 'Last Contact Date', type: 'date', faker: 'date.recent' },
    nextContactDate: { label: 'Next Contact Date', type: 'date', faker: 'date.future' },
    notes: { label: 'Notes', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraph' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [],
        multiple: true,
        faker: 'lorem.words',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Lead Nutrturing';
export const collectionName = 'lead-nurturing';
