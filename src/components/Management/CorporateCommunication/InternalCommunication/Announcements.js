export const fieldsConfig = {
    announcementId: { label: 'Announcement ID', type: 'text', faker: 'datatype.uuid' },
    title: { label: 'Title', type: 'text', faker: 'lorem.sentence' },
    content: { label: 'Content', type: 'text', faker: 'lorem.paragraphs' },
    announcementDate: { label: 'Announcement Date', type: 'date', faker: 'date.past' },
    audience: {
        label: 'Audience',
        type: 'select',
        options: [
            { id: 'all-employees', label: 'All Employees' },
            { id: 'management', label: 'Management' },
            { id: 'department-specific', label: 'Department Specific' },
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

export const entityName = 'Announcements';
export const collectionName = 'announcements';
