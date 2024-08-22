export const fieldsConfig = {
    newsletterId: { label: 'Newsletter ID', type: 'text', faker: 'datatype.uuid' },
    title: { label: 'Title', type: 'text', faker: 'lorem.sentence' },
    content: { label: 'Content', type: 'text', faker: 'lorem.paragraphs' },
    publicationDate: { label: 'Publication Date', type: 'date', faker: 'date.past' },
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
    author: { label: 'Author', type: 'text', faker: 'name.fullName' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Newsletters';
export const collectionName = 'newsletters';
