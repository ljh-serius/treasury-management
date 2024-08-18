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
  console.log("launched NOW")
  return (await fetchItems()).filter((entity) => {
    return types.includes(entity.type);
  }).map((entity) => {
    return {
      id: entity.id,
      label: entity.name
    }
  });
}

console.log("fetched items", await getEntitiesOptions(['store']))

export const fieldsConfig = {
  name: { label: 'name', type: 'text', faker: 'company.name' },
  type: {
    label: 'Type',
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
        id: 'organization',
        label: 'Organization'
      },
    ],
    multiple: false,
    faker: 'random.arrayElement'
  },
  entityId: { label: 'Entity ID', type: 'text', faker: 'datatype.uuid' },
  parentId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['store', 'agency', 'department', 'service', 'organization']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement',
    refreshOptions: async () => {
        return await getEntitiesOptions(['store', 'agency', 'department', 'service', 'organization']);
    }
  },
  storeId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['store']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement',
    refreshOptions: async () => {
      return await getEntitiesOptions(['store']);
    }
  },
  agencyId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['agency']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement',
    refreshOptions: async () => {
      return await getEntitiesOptions(['agency']);
    }
  },
  departmentId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['department']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement',
    refreshOptions: async () => {
      return await getEntitiesOptions(['department']);
    }
  },
  serviceId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['service']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement',
    refreshOptions: async () => {
      return await getEntitiesOptions(['service']);
    }
  },
  orgnizationId: {
    label: 'Parent Entity ID',
    type: 'select',
    options: await getEntitiesOptions(['organization']), // Populated with relevant parent entities
    multiple: true,
    faker: 'random.arrayElement',
    refreshOptions: async () => {
      return await getEntitiesOptions(['organization']);
    }
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

export async function fetchItems() {
    return await fetchDocuments(organizationId, 'entities');
}

export const addItem = (item) => addDocument(organizationId, 'entities', item);
export const updateItem = (id, item) => updateDocument(organizationId, 'entities', id, item);
export const deleteItem = (id) => deleteDocument(organizationId, 'entities', id);
