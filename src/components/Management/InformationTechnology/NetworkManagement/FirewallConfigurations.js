export const fieldsConfig = {
    firewallId: { label: 'Firewall ID', type: 'text', faker: 'datatype.uuid' },
    networkName: { label: 'Network Name', type: 'text', faker: 'company.name' },
    configurationDate: { label: 'Configuration Date', type: 'date', faker: 'date.past' },
    allowedProtocols: { label: 'Allowed Protocols', type: 'text', faker: 'lorem.words' },
    blockedIPs: { label: 'Blocked IPs', type: 'text', faker: 'internet.ip' },
    createdBy: { label: 'Created By', type: 'text', faker: 'name.fullName' },
    createdDate: { label: 'Created Date', type: 'date', faker: 'date.past' },
};

export const entityName = 'Firewall Configurations';
export const collectionName = 'firewall-configurations';
