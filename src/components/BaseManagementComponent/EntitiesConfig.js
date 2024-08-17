import {
    fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../../utils/firebaseCrudHelpers';


export const fieldsConfig = {
    entityId: { label: 'Entity ID', type: 'text', faker: 'datatype.uuid' },
    parentId: {
        label: 'Parent Entity ID',
        type: 'select',
        options: [], // Populated with relevant parent entities
        multiple: false,
        faker: 'random.uuid'
    },
    organizationId: {
        label: 'Organization ID',
        type: 'text',
        faker: 'datatype.uuid'
    },
    storeId: { label: 'Store ID', type: 'text', faker: 'datatype.uuid' },
    agencyId: { label: 'Agency ID', type: 'text', faker: 'datatype.uuid' },
    subOrganizationId: {
        label: 'Sub-Organization ID',
        type: 'text',
        faker: 'datatype.uuid'
    },
    departmentId: { label: 'Department ID', type: 'text', faker: 'datatype.uuid' },
    serviceId: { label: 'Service ID', type: 'text', faker: 'datatype.uuid' },
    locationId: { label: 'Location ID', type: 'text', faker: 'datatype.uuid' },
    regionId: { label: 'Region ID', type: 'text', faker: 'datatype.uuid' },
    countryId: { label: 'Country ID', type: 'text', faker: 'address.countryCode' },
    managerId: {
        label: 'Manager ID',
        type: 'select',
        options: [], // Populated with relevant managers
        multiple: false,
        faker: 'random.uuid'
    },
    status: {
        label: 'Status',
        type: 'select',
        options: [
            { id: 'active', label: 'Active' },
            { id: 'inactive', label: 'Inactive' }
        ],
        faker: 'random.arrayElement'
    },
    creationDate: { label: 'Creation Date', type: 'date', faker: 'date.past' },
    modifiedDate: { label: 'Modified Date', type: 'date', faker: 'date.recent' },
    notes: { label: 'Notes', type: 'text', faker: 'lorem.paragraph' },
};

export const headCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
}));

export const entityName = 'Entities';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments(organizationId, 'entities');
export const addItem = (item) => addDocument(organizationId, 'entities', item);
export const updateItem = (id, item) => updateDocument(organizationId, 'entities', id, item);
export const deleteItem = (id) => deleteDocument(organizationId, 'entities', id);