export const fieldsConfig = {
    offerId: { label: 'Offer ID', type: 'text', faker: 'datatype.uuid' },
    jobTitle: { label: 'Job Title', type: 'text', faker: 'name.jobTitle' },
    applicantName: { label: 'Applicant Name', type: 'text', faker: 'name.fullName' },
    offerDate: { label: 'Offer Date', type: 'date', faker: 'date.past' },
    offeredSalary: { label: 'Offered Salary', type: 'number', faker: 'finance.amount' },
    offerStatus: {
        label: 'Offer Status',
        type: 'select',
        options: [
            { id: 'accepted', label: 'Accepted' },
            { id: 'rejected', label: 'Rejected' },
            { id: 'pending', label: 'Pending' },
        ],
        faker: 'random.arrayElement',
    },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'urgent', label: 'Urgent' },
            { id: 'important', label: 'Important' },
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

export const entityName = 'Offer Letters';
export const collectionName = 'offer-letters';
