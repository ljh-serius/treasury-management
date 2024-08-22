export const fieldsConfig = {
    releaseId: { label: 'Release ID', type: 'text', faker: 'datatype.uuid' },
    title: { label: 'Title', type: 'text', faker: 'lorem.sentence' },
    content: { label: 'Content', type: 'text', faker: 'lorem.paragraphs' },
    releaseDate: { label: 'Release Date', type: 'date', faker: 'date.past' },
    mediaContact: { label: 'Media Contact', type: 'text', faker: 'name.fullName' },
    distributionChannels: {
        label: 'Distribution Channels',
        type: 'select',
        options: [
            { id: 'website', label: 'Website' },
            { id: 'email', label: 'Email' },
            { id: 'social-media', label: 'Social Media' },
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
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Press Releases';
export const collectionName = 'press-releases';
