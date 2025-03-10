export const fieldsConfig = {
    encryptionId: { label: 'Encryption ID', type: 'text', faker: 'datatype.uuid' },
    dataType: {
        label: 'Data Type',
        type: 'select',
        options: [
            { id: 'personal', label: 'Personal' },
            { id: 'financial', label: 'Financial' },
            { id: 'health', label: 'Health' },
            { id: 'confidential', label: 'Confidential' },
        ],
        faker: 'random.arrayElement',
    },
    encryptionMethod: {
        label: 'Encryption Method',
        type: 'select',
        options: [
            { id: 'aes-256', label: 'AES-256' },
            { id: 'rsa-2048', label: 'RSA-2048' },
            { id: 'sha-256', label: 'SHA-256' },
        ],
        faker: 'random.arrayElement',
    },
    encryptionDate: { label: 'Encryption Date', type: 'date', faker: 'date.past' },
    encryptedBy: { label: 'Encrypted By', type: 'text', faker: 'name.fullName' },
    decryptionKey: { label: 'Decryption Key', type: 'text', faker: 'datatype.uuid' },
    tags: {
        label: 'Tags',
        type: 'select',
        options: [
            { id: 'sensitive', label: 'Sensitive' },
            { id: 'high-priority', label: 'High Priority' },
            { id: 'secure', label: 'Secure' },
            { id: 'urgent', label: 'Urgent' },
        ],
        multiple: true,
        faker: 'random.arrayElement',
    },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Data Encryption';
export const collectionName = 'data-encryption';
