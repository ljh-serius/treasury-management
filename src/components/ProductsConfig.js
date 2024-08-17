import {
  fetchDocuments, addDocument, updateDocument, deleteDocument
} from '../utils/firebaseCrudHelpers';

export const fieldsConfig = {
  name: { label: 'Name', type: 'text' },
  description: { label: 'Description', type: 'text', multiline: true, rows: 4 },
  price: { label: 'Price', type: 'number' },
  sku: { label: 'SKU', type: 'text' },
  category: { label: 'Category', type: 'text' },
  supplier: { label: 'Supplier', type: 'text' },
  stock: { label: 'Stock Quantity', type: 'number' },
  minOrderQuantity: { label: 'Min Order Quantity', type: 'number' },
  maxOrderQuantity: { label: 'Max Order Quantity', type: 'number' },
  weight: { label: 'Weight', type: 'text' },
  dimensions: { label: 'Dimensions', type: 'text' },
  color: { label: 'Color', type: 'text' },
  material: { label: 'Material', type: 'text' },
  warranty: { label: 'Warranty', type: 'text' },
  returnPolicy: { label: 'Return Policy', type: 'text' },
  manufactureDate: { label: 'Manufacture Date', type: 'date' },
  expirationDate: { label: 'Expiration Date', type: 'date' },
  location: { label: 'Location', type: 'text' },
  brand: { label: 'Brand', type: 'text' },
  modelNumber: { label: 'Model Number', type: 'text' },
  barcode: { label: 'Barcode', type: 'text' },
  countryOfOrigin: { label: 'Country of Origin', type: 'text' },
  batchNumber: { label: 'Batch Number', type: 'text' },
  productionDate: { label: 'Production Date', type: 'date' },
  expirationPeriod: { label: 'Expiration Period', type: 'text' },
  leadTime: { label: 'Lead Time', type: 'text' },
  shippingWeight: { label: 'Shipping Weight', type: 'text' },
  packagingType: { label: 'Packaging Type', type: 'text' },
  shelfLife: { label: 'Shelf Life', type: 'text' },
  certification: { label: 'Certification', type: 'text' },
  recyclable: { label: 'Recyclable', type: 'checkbox' },
  hazardousMaterial: { label: 'Hazardous Material', type: 'checkbox' },
  temperatureRequirements: { label: 'Temperature Requirements', type: 'text' },
  storageInstructions: { label: 'Storage Instructions', type: 'text' },
  safetyInstructions: { label: 'Safety Instructions', type: 'text' },
  assemblyRequired: { label: 'Assembly Required', type: 'checkbox' },
  instructionsIncluded: { label: 'Instructions Included', type: 'checkbox' },
  energyConsumption: { label: 'Energy Consumption', type: 'text' },
  waterResistance: { label: 'Water Resistance', type: 'text' },
  fireResistance: { label: 'Fire Resistance', type: 'text' },
  chemicalResistance: { label: 'Chemical Resistance', type: 'text' },
  uvResistance: { label: 'UV Resistance', type: 'text' },
  warrantyPeriod: { label: 'Warranty Period', type: 'text' },
  serviceSupport: { label: 'Service & Support', type: 'text' },
  returnable: { label: 'Returnable', type: 'checkbox' },
  discount: { label: 'Discount', type: 'text' },
  promotionalOffer: { label: 'Promotional Offer', type: 'text' },
  rating: { label: 'Rating', type: 'number' },
  reviewCount: { label: 'Review Count', type: 'number' },
  bestBeforeDate: { label: 'Best Before Date', type: 'date' },
  salesStartDate: { label: 'Sales Start Date', type: 'date' },
  salesEndDate: { label: 'Sales End Date', type: 'date' },
  legalDisclaimer: { label: 'Legal Disclaimer', type: 'text' },
  productManual: { label: 'Product Manual', type: 'text' },
  videoTutorialLink: { label: 'Video Tutorial Link', type: 'text' },
  warrantyDetails: { label: 'Warranty Details', type: 'text' },
  customizable: { label: 'Customizable', type: 'checkbox' },
  availableColors: { label: 'Available Colors', type: 'text' },
  availableSizes: { label: 'Available Sizes', type: 'text' },
};

// Generate head cells dynamically from the config object
export const headCells = Object.keys(fieldsConfig).map(key => ({
  id: key,
  label: fieldsConfig[key].label,
}));

export const entityName = 'Product';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

export const fetchItems = () => fetchDocuments('products', organizationId);
export const addItem = (item) => addDocument('products', item, organizationId);
export const updateItem = (id, item) => updateDocument('products', id, item);
export const deleteItem = (id) => deleteDocument('products', id);