export const fieldsConfig = {
    statementId: { label: 'Statement ID', type: 'text', faker: 'datatype.uuid' },
    title: { label: 'Title', type: 'text', faker: 'lorem.sentence' },
    content: { label: 'Content', type: 'text', faker: 'lorem.paragraphs' },
    statementDate: { label: 'Statement Date', type: 'date', faker: 'date.past' },
    audience: {
        label: 'Audience',
        type: 'select',
        options: [
            { id: 'public', label: 'General Public' },
            { id: 'investors', label: 'Investors' },
            { id: 'customers', label: 'Customers' },
        ],
        faker: 'random.arrayElement',
    },
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
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Public Statements';
export const collectionName = 'public-statements';
