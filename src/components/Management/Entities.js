import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue
} from '../../utils/firebaseCrudHelpers';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

const getEntitiesOptions = async (types) => {
  return (await fetchEntities()).filter((entity) => {
    return types.includes(entity.type);
  }).map((entity) => {
    return {
      id: entity.id,
      label: entity.name
    }
  });
}

export const fieldsConfig = {
  name: { label: 'name', type: 'text', faker: 'company.name' },
  type: {
    label: 'Manager ID',
    type: 'select',
    options: [
      {
        id: 'store',
        label: 'Store'
      },
      {
        id: 'agency',
        label: 'Agency'
      },
      {
        id: 'department',
        label: 'Department'
      },
      {
        id: 'service',
        label: 'Service'
      },
      {
        id: 'orginzation',
        label: 'Orgnization'
      },
    ],
    multiple: false,
    faker: 'random.arrayElement'
  },
  entityId: { label: 'Entity ID', type: 'text', faker: 'datatype.uuid' },
  parentId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['store', 'agency', 'department', 'service', 'orginization']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  storeId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['store']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  agencyId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['agency']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  departmentId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['department']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  serviceId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['service']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  orgnizationId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['orgnization']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement'
  },
  locationId: { label: 'Location ID', type: 'text', faker: 'datatype.uuid' },
  regionId: { label: 'Region ID', type: 'text', faker: 'datatype.uuid' },
  countryId: { label: 'Country ID', type: 'text', faker: 'address.countryCode' },
  managerId: {
    label: 'Manager ID',
    type: 'select',
    options: [], // Populated with relevant managers
    multiple: false,
    faker: 'random.arrayElement'
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

export const fetchEntities = () => fetchDocuments(organizationId, 'entities');
export const addEntity = (item) => addDocument(organizationId, 'entities', item);
export const updateEntity = (id, item) => updateDocument(organizationId, 'entities', id, item);
export const deleteEntity = (id) => deleteDocument(organizationId, 'entities', id);
