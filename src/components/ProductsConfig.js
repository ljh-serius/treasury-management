import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Name', type: 'text', faker: 'commerce.productName' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
  price: { label: 'Price', type: 'number', faker: 'commerce.price' },
  sku: { label: 'SKU', type: 'text', faker: 'datatype.uuid' },
  category: { label: 'Category', type: 'text', faker: 'commerce.department' },
  supplier: { label: 'Supplier', type: 'text', faker: 'company.name' },
  stock: { label: 'Stock Quantity', type: 'number', faker: 'datatype.number' },
  minOrderQuantity: { label: 'Min Order Quantity', type: 'number', faker: 'datatype.number' },
  maxOrderQuantity: { label: 'Max Order Quantity', type: 'number', faker: 'datatype.number' },
  weight: { label: 'Weight', type: 'text', faker: 'commerce.productMaterial' },
  dimensions: { label: 'Dimensions', type: 'text', faker: 'lorem.words' },
  color: { label: 'Color', type: 'text', faker: 'color.cmyk' },
  material: { label: 'Material', type: 'text', faker: 'commerce.productMaterial' },
  warranty: { label: 'Warranty', type: 'text', faker: 'lorem.sentence' },
  returnPolicy: { label: 'Return Policy', type: 'text', faker: 'lorem.sentence' },
  manufactureDate: { label: 'Manufacture Date', type: 'date', faker: 'date.past' },
  expirationDate: { label: 'Expiration Date', type: 'date', faker: 'date.future' },
  location: { label: 'Location', type: 'text', faker: 'address.city' },
  brand: { label: 'Brand', type: 'text', faker: 'company.name' },
  modelNumber: { label: 'Model Number', type: 'text', faker: 'datatype.uuid' },
  barcode: { label: 'Barcode', type: 'text', faker: 'datatype.uuid' },
  countryOfOrigin: { label: 'Country of Origin', type: 'text', faker: 'address.country' },
  batchNumber: { label: 'Batch Number', type: 'text', faker: 'datatype.uuid' },
  productionDate: { label: 'Production Date', type: 'date', faker: 'date.past' },
  expirationPeriod: { label: 'Expiration Period', type: 'text', faker: 'lorem.words' },
  leadTime: { label: 'Lead Time', type: 'text', faker: 'lorem.sentence' },
  shippingWeight: { label: 'Shipping Weight', type: 'text', faker: 'commerce.productMaterial' },
  packagingType: { label: 'Packaging Type', type: 'text', faker: 'lorem.word' },
  shelfLife: { label: 'Shelf Life', type: 'text', faker: 'lorem.words' },
  certification: { label: 'Certification', type: 'text', faker: 'lorem.words' },
  recyclable: { label: 'Recyclable', type: 'checkbox', faker: 'datatype.boolean' },
  hazardousMaterial: { label: 'Hazardous Material', type: 'checkbox', faker: 'datatype.boolean' },
  temperatureRequirements: { label: 'Temperature Requirements', type: 'text', faker: 'lorem.sentence' },
  storageInstructions: { label: 'Storage Instructions', type: 'text', faker: 'lorem.sentence' },
  safetyInstructions: { label: 'Safety Instructions', type: 'text', faker: 'lorem.sentence' },
  assemblyRequired: { label: 'Assembly Required', type: 'checkbox', faker: 'datatype.boolean' },
  instructionsIncluded: { label: 'Instructions Included', type: 'checkbox', faker: 'datatype.boolean' },
  energyConsumption: { label: 'Energy Consumption', type: 'text', faker: 'lorem.word' },
  waterResistance: { label: 'Water Resistance', type: 'text', faker: 'lorem.word' },
  fireResistance: { label: 'Fire Resistance', type: 'text', faker: 'lorem.word' },
  chemicalResistance: { label: 'Chemical Resistance', type: 'text', faker: 'lorem.word' },
  uvResistance: { label: 'UV Resistance', type: 'text', faker: 'lorem.word' },
  warrantyPeriod: { label: 'Warranty Period', type: 'text', faker: 'lorem.words' },
  serviceSupport: { label: 'Service & Support', type: 'text', faker: 'lorem.sentence' },
  returnable: { label: 'Returnable', type: 'checkbox', faker: 'datatype.boolean' },
  discount: { label: 'Discount', type: 'text', faker: 'commerce.price' },
  promotionalOffer: { label: 'Promotional Offer', type: 'text', faker: 'lorem.words' },
  rating: { label: 'Rating', type: 'number', faker: 'datatype.float' },
  reviewCount: { label: 'Review Count', type: 'number', faker: 'datatype.number' },
  bestBeforeDate: { label: 'Best Before Date', type: 'date', faker: 'date.future' },
  salesStartDate: { label: 'Sales Start Date', type: 'date', faker: 'date.past' },
  salesEndDate: { label: 'Sales End Date', type: 'date', faker: 'date.future' },
  legalDisclaimer: { label: 'Legal Disclaimer', type: 'text', faker: 'lorem.sentence' },
  productManual: { label: 'Product Manual', type: 'text', faker: 'lorem.paragraph' },
  videoTutorialLink: { label: 'Video Tutorial Link', type: 'text', faker: 'internet.url' },
  warrantyDetails: { label: 'Warranty Details', type: 'text', faker: 'lorem.paragraph' },
  customizable: { label: 'Customizable', type: 'checkbox', faker: 'datatype.boolean' },
  availableColors: { label: 'Available Colors', type: 'text', faker: 'color.cmyk' },
  availableSizes: { label: 'Available Sizes', type: 'text', faker: 'lorem.words' },
};

// Generate head cells dynamically from the config object
export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Products';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('products', organizationId);
export const addItem = (item) => addDocument('products', item, organizationId);
export const updateItem = (id, item) => updateDocument('products', id, item);
export const deleteItem = (id) => deleteDocument('products', id);
