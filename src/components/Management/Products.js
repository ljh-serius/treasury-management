



import {
    fetchDocuments,
    addDocument,
    updateDocument,
    deleteDocument,
    fetchDocumentsBySelectValue,
    fetchDocumentsByFieldValue
} from '../../utils/firebaseCrudHelpers';

import { fetchItems as fetchProviders } from './Providers';

const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

const providersOptions = (await fetchProviders()).map((provider) => {
    return {
        id: provider.id,
        label: provider.name
    }
})

export const fieldsConfig = {
    name: { label: 'Name', type: 'text', faker: 'commerce.productName' },
    description: { label: 'Description', type: 'text', multiline: true, rows: 4, faker: 'lorem.paragraphs' },
    price: { label: 'Price', type: 'number', faker: 'commerce.price' },
    sku: { label: 'SKU', type: 'text', faker: 'datatype.uuid' },
    category: {
      label: 'Category',
      type: 'select',
      options: [
        { id: 'electronics', label: 'Electronics' },
        { id: 'furniture', label: 'Furniture' },
        { id: 'apparel', label: 'Apparel' },
        { id: 'toys', label: 'Toys' },
        { id: 'food', label: 'Food' },
      ],
      faker: 'random.arrayElement',
    },
    supplier: {
      label: 'Supplier',
      type: 'select',
      link: '/supplier',
      multiple: true,
      options: providersOptions,
      faker: 'random.arrayElement',
    },
    stock: { label: 'Stock Quantity', type: 'number', faker: 'datatype.number' },
    minOrderQuantity: { label: 'Min Order Quantity', type: 'number', faker: 'datatype.number' },
    maxOrderQuantity: { label: 'Max Order Quantity', type: 'number', faker: 'datatype.number' },
    weight: { label: 'Weight', type: 'text', faker: 'commerce.productMaterial' },
    dimensions: { label: 'Dimensions', type: 'text', faker: 'lorem.words' },
    color: {
      label: 'Color',
      type: 'select',
      options: [
        { id: 'red', label: 'Red' },
        { id: 'blue', label: 'Blue' },
        { id: 'green', label: 'Green' },
        { id: 'yellow', label: 'Yellow' },
        { id: 'black', label: 'Black' },
      ],
      faker: 'random.arrayElement',
    },
    material: {
      label: 'Material',
      type: 'select',
      options: [
        { id: 'cotton', label: 'Cotton' },
        { id: 'plastic', label: 'Plastic' },
        { id: 'metal', label: 'Metal' },
        { id: 'wood', label: 'Wood' },
        { id: 'leather', label: 'Leather' },
      ],
      faker: 'random.arrayElement',
    },
    warranty: {
      label: 'Warranty',
      type: 'select',
      options: [
        { id: '6_months', label: '6 Months' },
        { id: '1_year', label: '1 Year' },
        { id: '2_years', label: '2 Years' },
        { id: 'lifetime', label: 'Lifetime' },
      ],
      faker: 'random.arrayElement',
    },
    returnPolicy: {
      label: 'Return Policy',
      type: 'select',
      options: [
        { id: '30_days', label: '30 Days' },
        { id: '60_days', label: '60 Days' },
        { id: 'no_returns', label: 'No Returns' },
      ],
      faker: 'random.arrayElement',
    },
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
    packagingType: {
      label: 'Packaging Type',
      type: 'select',
      options: [
        { id: 'box', label: 'Box' },
        { id: 'bag', label: 'Bag' },
        { id: 'pallet', label: 'Pallet' },
        { id: 'wrap', label: 'Wrap' },
      ],
      faker: 'random.arrayElement',
    },
    shelfLife: { label: 'Shelf Life', type: 'text', faker: 'lorem.words' },
    certification: { label: 'Certification', type: 'text', faker: 'lorem.words' },
    recyclable: {
      label: 'Recyclable',
      type: 'select',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
      ],
      faker: 'random.arrayElement',
    },
    hazardousMaterial: {
      label: 'Returnable',
      type: 'select',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
      ],
      faker: 'random.arrayElement',
    },
    temperatureRequirements: {
      label: 'Temperature Requirements',
      type: 'select',
      options: [
        { id: 'ambient', label: 'Ambient' },
        { id: 'cold', label: 'Cold' },
        { id: 'frozen', label: 'Frozen' },
      ],
      faker: 'random.arrayElement',
    },
    storageInstructions: { label: 'Storage Instructions', type: 'text', faker: 'lorem.sentence' },
    safetyInstructions: { label: 'Safety Instructions', type: 'text', faker: 'lorem.sentence' },
    assemblyRequired: { label: 'Assembly Required', type: 'checkbox', faker: 'datatype.boolean' },
    instructionsIncluded: { label: 'Instructions Included', type: 'checkbox', faker: 'datatype.boolean' },
    energyConsumption: {
      label: 'Energy Consumption',
      type: 'select',
      multiple: false,
      options: [
        { id: 'low', label: 'Low' },
        { id: 'medium', label: 'Medium' },
        { id: 'high', label: 'High' },
      ],
      faker: 'random.arrayElement',
    },
    waterResistance: { label: 'Water Resistance', type: 'text', faker: 'lorem.word' },
    fireResistance: { label: 'Fire Resistance', type: 'text', faker: 'lorem.word' },
    chemicalResistance: { label: 'Chemical Resistance', type: 'text', faker: 'lorem.word' },
    uvResistance: { label: 'UV Resistance', type: 'text', faker: 'lorem.word' },
    warrantyPeriod: { label: 'Warranty Period', type: 'text', faker: 'lorem.words' },
    serviceSupport: { label: 'Service & Support', type: 'text', faker: 'lorem.sentence' },
    returnable: {
      label: 'Returnable',
      type: 'select',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
      ],
      faker: 'random.arrayElement',
    },
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
    customizable: {
      label: 'Customizable',
      type: 'select',
      options: [
        { id: 'yes', label: 'Yes' },
        { id: 'no', label: 'No' },
      ],
      faker: 'random.arrayElement',
    },
    availableColors: {
      label: 'Available Colors',
      type: 'select',
      options: [
        { id: 'red', label: 'Red' },
        { id: 'blue', label: 'Blue' },
        { id: 'green', label: 'Green' },
        { id: 'yellow', label: 'Yellow' },
        { id: 'black', label: 'Black' },
      ],
      faker: 'random.arrayElement',
    },
    availableSizes: {
      label: 'Available Sizes',
      type: 'select',
      multiple: false,
      options: [
        { id: 'small', label: 'Small' },
        { id: 'medium', label: 'Medium' },
        { id: 'large', label: 'Large' },
        { id: 'xl', label: 'XL' },
        { id: 'xxl', label: 'XXL' },
      ],
      faker: 'random.arrayElements',
    },
  };
  
  // Generate head cells dynamically from the config object
  export const productsHeadCells = Object.keys(fieldsConfig).map(key => ({
    id: key,
    label: fieldsConfig[key].label,
  }));
  
  
  export const entityName = 'Products';
  
  export async function fetchItems() {
    return await fetchDocuments(organizationId, 'products');
  }
  export const addItem = (item) => addDocument(organizationId, 'products', item);
  export const updateItem = (id, item) => updateDocument(organizationId, 'products', id, item);
  export const deleteItem = (id) => deleteDocument(organizationId, 'products', id);
  
  
  
  