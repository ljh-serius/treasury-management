export const fieldsConfig = {
    relationId: { label: 'Relation ID', type: 'text', faker: 'datatype.uuid' },
    mediaOutlet: { label: 'Media Outlet', type: 'text', faker: 'company.name' },
    contactPerson: { label: 'Contact Person', type: 'text', faker: 'name.fullName' },
    communicationDate: { label: 'Communication Date', type: 'date', faker: 'date.past' },
    communicationMethod: {
        label: 'Communication Method',
        type: 'select',
        options: [
            { id: 'email', label: 'Email' },
            { id: 'phone-call', label: 'Phone Call' },
            { id: 'meeting', label: 'Meeting' },
            { id: 'press-conference', label: 'Press Conference' },
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
    message: { label: 'Message', type: 'text', faker: 'lorem.paragraph' },
    outcome: { label: 'Outcome', type: 'text', faker: 'lorem.sentence' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Media Relations';
export const collectionName = 'media-relations';
