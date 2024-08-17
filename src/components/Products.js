import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container, FormControlLabel, Switch, Link, Checkbox
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

import { fetchProducts, addProduct, updateProduct, deleteProduct } from '../utils/productsFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'description', label: 'Description' },
  { id: 'price', label: 'Price' },
  { id: 'sku', label: 'SKU' },
  { id: 'category', label: 'Category' },
  { id: 'supplier', label: 'Supplier' },
  { id: 'stock', label: 'Stock Quantity' },
  { id: 'minOrderQuantity', label: 'Min Order Quantity' },
  { id: 'maxOrderQuantity', label: 'Max Order Quantity' },
  { id: 'weight', label: 'Weight' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'color', label: 'Color' },
  { id: 'material', label: 'Material' },
  { id: 'warranty', label: 'Warranty' },
  { id: 'returnPolicy', label: 'Return Policy' },
  { id: 'manufactureDate', label: 'Manufacture Date' },
  { id: 'expirationDate', label: 'Expiration Date' },
  { id: 'location', label: 'Location' },
  { id: 'brand', label: 'Brand' },
  { id: 'modelNumber', label: 'Model Number' },
  { id: 'barcode', label: 'Barcode' },
  { id: 'countryOfOrigin', label: 'Country of Origin' },
  { id: 'batchNumber', label: 'Batch Number' },
  { id: 'productionDate', label: 'Production Date' },
  { id: 'expirationPeriod', label: 'Expiration Period' },
  { id: 'leadTime', label: 'Lead Time' },
  { id: 'shippingWeight', label: 'Shipping Weight' },
  { id: 'packagingType', label: 'Packaging Type' },
  { id: 'shelfLife', label: 'Shelf Life' },
  { id: 'certification', label: 'Certification' },
  { id: 'recyclable', label: 'Recyclable' },
  { id: 'hazardousMaterial', label: 'Hazardous Material' },
  { id: 'temperatureRequirements', label: 'Temperature Requirements' },
  { id: 'storageInstructions', label: 'Storage Instructions' },
  { id: 'safetyInstructions', label: 'Safety Instructions' },
  { id: 'assemblyRequired', label: 'Assembly Required' },
  { id: 'instructionsIncluded', label: 'Instructions Included' },
  { id: 'energyConsumption', label: 'Energy Consumption' },
  { id: 'waterResistance', label: 'Water Resistance' },
  { id: 'fireResistance', label: 'Fire Resistance' },
  { id: 'chemicalResistance', label: 'Chemical Resistance' },
  { id: 'uvResistance', label: 'UV Resistance' },
  { id: 'warrantyPeriod', label: 'Warranty Period' },
  { id: 'serviceSupport', label: 'Service & Support' },
  { id: 'returnable', label: 'Returnable' },
  { id: 'discount', label: 'Discount' },
  { id: 'promotionalOffer', label: 'Promotional Offer' },
  { id: 'rating', label: 'Rating' },
  { id: 'reviewCount', label: 'Review Count' },
  { id: 'bestBeforeDate', label: 'Best Before Date' },
  { id: 'salesStartDate', label: 'Sales Start Date' },
  { id: 'salesEndDate', label: 'Sales End Date' },
  { id: 'legalDisclaimer', label: 'Legal Disclaimer' },
  { id: 'productManual', label: 'Product Manual' },
  { id: 'videoTutorialLink', label: 'Video Tutorial Link' },
  { id: 'warrantyDetails', label: 'Warranty Details' },
  { id: 'customizable', label: 'Customizable' },
  { id: 'availableColors', label: 'Available Colors' },
  { id: 'availableSizes', label: 'Available Sizes' },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <MUICheckbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all products' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="left"
            padding="normal"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, onAdd, onDelete, onEdit } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          Products
        </Typography>
      )}
      {numSelected === 1 ? (
        <Tooltip title="Edit">
          <IconButton onClick={onEdit}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      ) : null}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={onDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Add">
          <IconButton onClick={onAdd}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}
function ProductModal({ open, onClose, onSubmit, initialData, organizationId }) {
  const [productData, setProductData] = useState({
    name: '',
    description: '',
    price: '',
    sku: '',
    category: '',
    supplier: '',
    stock: '',
    minOrderQuantity: '',
    maxOrderQuantity: '',
    weight: '',
    dimensions: '',
    color: '',
    material: '',
    warranty: '',
    returnPolicy: '',
    manufactureDate: '',
    expirationDate: '',
    location: '',
    brand: '',
    modelNumber: '',
    barcode: '',
    countryOfOrigin: '',
    batchNumber: '',
    productionDate: '',
    expirationPeriod: '',
    leadTime: '',
    shippingWeight: '',
    packagingType: '',
    shelfLife: '',
    certification: '',
    recyclable: false,
    hazardousMaterial: false,
    temperatureRequirements: '',
    storageInstructions: '',
    safetyInstructions: '',
    assemblyRequired: false,
    instructionsIncluded: false,
    energyConsumption: '',
    waterResistance: '',
    fireResistance: '',
    chemicalResistance: '',
    uvResistance: '',
    warrantyPeriod: '',
    serviceSupport: '',
    returnable: false,
    discount: '',
    promotionalOffer: '',
    rating: '',
    reviewCount: '',
    bestBeforeDate: '',
    salesStartDate: '',
    salesEndDate: '',
    legalDisclaimer: '',
    productManual: '',
    videoTutorialLink: '',
    warrantyDetails: '',
    customizable: false,
    availableColors: '',
    availableSizes: '',
    organizationId,
  });

  useEffect(() => {
    if (initialData) {
      setProductData(initialData);
    } else {
      setProductData({
        name: '',
        description: '',
        price: '',
        sku: '',
        category: '',
        supplier: '',
        stock: '',
        minOrderQuantity: '',
        maxOrderQuantity: '',
        weight: '',
        dimensions: '',
        color: '',
        material: '',
        warranty: '',
        returnPolicy: '',
        manufactureDate: '',
        expirationDate: '',
        location: '',
        brand: '',
        modelNumber: '',
        barcode: '',
        countryOfOrigin: '',
        batchNumber: '',
        productionDate: '',
        expirationPeriod: '',
        leadTime: '',
        shippingWeight: '',
        packagingType: '',
        shelfLife: '',
        certification: '',
        recyclable: false,
        hazardousMaterial: false,
        temperatureRequirements: '',
        storageInstructions: '',
        safetyInstructions: '',
        assemblyRequired: false,
        instructionsIncluded: false,
        energyConsumption: '',
        waterResistance: '',
        fireResistance: '',
        chemicalResistance: '',
        uvResistance: '',
        warrantyPeriod: '',
        serviceSupport: '',
        returnable: false,
        discount: '',
        promotionalOffer: '',
        rating: '',
        reviewCount: '',
        bestBeforeDate: '',
        salesStartDate: '',
        salesEndDate: '',
        legalDisclaimer: '',
        productManual: '',
        videoTutorialLink: '',
        warrantyDetails: '',
        customizable: false,
        availableColors: '',
        availableSizes: '',
        organizationId,
      });
    }
  }, [initialData, organizationId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(productData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: 1200,
          height: '80%',
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Typography variant="h6" component="h2">
          {initialData ? 'Edit Product' : 'Add Product'}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >        <TextField
            label="Name"
            name="name"
            fullWidth
            margin="normal"
            value={productData.name}
            onChange={handleChange}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            margin="normal"
            value={productData.description}
            onChange={handleChange}
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            fullWidth
            margin="normal"
            value={productData.price}
            onChange={handleChange}
          />
          <TextField
            label="SKU"
            name="sku"
            fullWidth
            margin="normal"
            value={productData.sku}
            onChange={handleChange}
          />
          <TextField
            label="Category"
            name="category"
            fullWidth
            margin="normal"
            value={productData.category}
            onChange={handleChange}
          />
          <TextField
            label="Supplier"
            name="supplier"
            fullWidth
            margin="normal"
            value={productData.supplier}
            onChange={handleChange}
          />
          <TextField
            label="Stock"
            name="stock"
            type="number"
            fullWidth
            margin="normal"
            value={productData.stock}
            onChange={handleChange}
          />
          <TextField
            label="Min Order Quantity"
            name="minOrderQuantity"
            type="number"
            fullWidth
            margin="normal"
            value={productData.minOrderQuantity}
            onChange={handleChange}
          />
          <TextField
            label="Max Order Quantity"
            name="maxOrderQuantity"
            type="number"
            fullWidth
            margin="normal"
            value={productData.maxOrderQuantity}
            onChange={handleChange}
          />
          <TextField
            label="Weight"
            name="weight"
            fullWidth
            margin="normal"
            value={productData.weight}
            onChange={handleChange}
          />
          <TextField
            label="Dimensions"
            name="dimensions"
            fullWidth
            margin="normal"
            value={productData.dimensions}
            onChange={handleChange}
          />
          <TextField
            label="Color"
            name="color"
            fullWidth
            margin="normal"
            value={productData.color}
            onChange={handleChange}
          />
          <TextField
            label="Material"
            name="material"
            fullWidth
            margin="normal"
            value={productData.material}
            onChange={handleChange}
          />
          <TextField
            label="Warranty"
            name="warranty"
            fullWidth
            margin="normal"
            value={productData.warranty}
            onChange={handleChange}
          />
          <TextField
            label="Return Policy"
            name="returnPolicy"
            fullWidth
            margin="normal"
            value={productData.returnPolicy}
            onChange={handleChange}
          />
          <TextField
            label="Manufacture Date"
            name="manufactureDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={productData.manufactureDate}
            onChange={handleChange}
          />
          <TextField
            label="Expiration Date"
            name="expirationDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={productData.expirationDate}
            onChange={handleChange}
          />
          <TextField
            label="Location"
            name="location"
            fullWidth
            margin="normal"
            value={productData.location}
            onChange={handleChange}
          />
          <TextField
            label="Brand"
            name="brand"
            fullWidth
            margin="normal"
            value={productData.brand}
            onChange={handleChange}
          />
          <TextField
            label="Model Number"
            name="modelNumber"
            fullWidth
            margin="normal"
            value={productData.modelNumber}
            onChange={handleChange}
          />
          <TextField
            label="Barcode"
            name="barcode"
            fullWidth
            margin="normal"
            value={productData.barcode}
            onChange={handleChange}
          />
          <TextField
            label="Country of Origin"
            name="countryOfOrigin"
            fullWidth
            margin="normal"
            value={productData.countryOfOrigin}
            onChange={handleChange}
          />
          <TextField
            label="Batch Number"
            name="batchNumber"
            fullWidth
            margin="normal"
            value={productData.batchNumber}
            onChange={handleChange}
          />
          <TextField
            label="Production Date"
            name="productionDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={productData.productionDate}
            onChange={handleChange}
          />
          <TextField
            label="Expiration Period"
            name="expirationPeriod"
            fullWidth
            margin="normal"
            value={productData.expirationPeriod}
            onChange={handleChange}
          />
          <TextField
            label="Lead Time"
            name="leadTime"
            fullWidth
            margin="normal"
            value={productData.leadTime}
            onChange={handleChange}
          />
          <TextField
            label="Shipping Weight"
            name="shippingWeight"
            fullWidth
            margin="normal"
            value={productData.shippingWeight}
            onChange={handleChange}
          />
          <TextField
            label="Packaging Type"
            name="packagingType"
            fullWidth
            margin="normal"
            value={productData.packagingType}
            onChange={handleChange}
          />
          <TextField
            label="Shelf Life"
            name="shelfLife"
            fullWidth
            margin="normal"
            value={productData.shelfLife}
            onChange={handleChange}
          />
          <TextField
            label="Certification"
            name="certification"
            fullWidth
            margin="normal"
            value={productData.certification}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="recyclable"
                checked={productData.recyclable}
                onChange={handleChange}
              />
            }
            label="Recyclable"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="hazardousMaterial"
                checked={productData.hazardousMaterial}
                onChange={handleChange}
              />
            }
            label="Hazardous Material"
          />
          <TextField
            label="Temperature Requirements"
            name="temperatureRequirements"
            fullWidth
            margin="normal"
            value={productData.temperatureRequirements}
            onChange={handleChange}
          />
          <TextField
            label="Storage Instructions"
            name="storageInstructions"
            fullWidth
            margin="normal"
            value={productData.storageInstructions}
            onChange={handleChange}
          />
          <TextField
            label="Safety Instructions"
            name="safetyInstructions"
            fullWidth
            margin="normal"
            value={productData.safetyInstructions}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="assemblyRequired"
                checked={productData.assemblyRequired}
                onChange={handleChange}
              />
            }
            label="Assembly Required"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="instructionsIncluded"
                checked={productData.instructionsIncluded}
                onChange={handleChange}
              />
            }
            label="Instructions Included"
          />
          <TextField
            label="Energy Consumption"
            name="energyConsumption"
            fullWidth
            margin="normal"
            value={productData.energyConsumption}
            onChange={handleChange}
          />
          <TextField
            label="Water Resistance"
            name="waterResistance"
            fullWidth
            margin="normal"
            value={productData.waterResistance}
            onChange={handleChange}
          />
          <TextField
            label="Fire Resistance"
            name="fireResistance"
            fullWidth
            margin="normal"
            value={productData.fireResistance}
            onChange={handleChange}
          />
          <TextField
            label="Chemical Resistance"
            name="chemicalResistance"
            fullWidth
            margin="normal"
            value={productData.chemicalResistance}
            onChange={handleChange}
          />
          <TextField
            label="UV Resistance"
            name="uvResistance"
            fullWidth
            margin="normal"
            value={productData.uvResistance}
            onChange={handleChange}
          />
          <TextField
            label="Warranty Period"
            name="warrantyPeriod"
            fullWidth
            margin="normal"
            value={productData.warrantyPeriod}
            onChange={handleChange}
          />
          <TextField
            label="Service Support"
            name="serviceSupport"
            fullWidth
            margin="normal"
            value={productData.serviceSupport}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="returnable"
                checked={productData.returnable}
                onChange={handleChange}
              />
            }
            label="Returnable"
          />
          <TextField
            label="Discount"
            name="discount"
            fullWidth
            margin="normal"
            value={productData.discount}
            onChange={handleChange}
          />
          <TextField
            label="Promotional Offer"
            name="promotionalOffer"
            fullWidth
            margin="normal"
            value={productData.promotionalOffer}
            onChange={handleChange}
          />
          <TextField
            label="Rating"
            name="rating"
            type="number"
            fullWidth
            margin="normal"
            value={productData.rating}
            onChange={handleChange}
          />
          <TextField
            label="Review Count"
            name="reviewCount"
            type="number"
            fullWidth
            margin="normal"
            value={productData.reviewCount}
            onChange={handleChange}
          />
          <TextField
            label="Best Before Date"
            name="bestBeforeDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={productData.bestBeforeDate}
            onChange={handleChange}
          />
          <TextField
            label="Sales Start Date"
            name="salesStartDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={productData.salesStartDate}
            onChange={handleChange}
          />
          <TextField
            label="Sales End Date"
            name="salesEndDate"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={productData.salesEndDate}
            onChange={handleChange}
          />
          <TextField
            label="Legal Disclaimer"
            name="legalDisclaimer"
            fullWidth
            margin="normal"
            value={productData.legalDisclaimer}
            onChange={handleChange}
          />
                    <TextField
            label="Legal Disclaimer"
            name="legalDisclaimer"
            fullWidth
            margin="normal"
            value={productData.legalDisclaimer}
            onChange={handleChange}
          />
          <TextField
            label="Product Manual"
            name="productManual"
            fullWidth
            margin="normal"
            value={productData.productManual}
            onChange={handleChange}
          />
          <TextField
            label="Video Tutorial Link"
            name="videoTutorialLink"
            fullWidth
            margin="normal"
            value={productData.videoTutorialLink}
            onChange={handleChange}
          />
          <TextField
            label="Warranty Details"
            name="warrantyDetails"
            fullWidth
            margin="normal"
            value={productData.warrantyDetails}
            onChange={handleChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="customizable"
                checked={productData.customizable}
                onChange={handleChange}
              />
            }
            label="Customizable"
          />
          <TextField
            label="Available Colors"
            name="availableColors"
            fullWidth
            margin="normal"
            value={productData.availableColors}
            onChange={handleChange}
          />
          <TextField
            label="Available Sizes"
            name="availableSizes"
            fullWidth
            margin="normal"
            value={productData.availableSizes}
            onChange={handleChange}
          />
         
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </Box>
      </Box>
      
    </Modal>
  );
}


export default function ProductsManagement() {
  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [products, setProducts] = useState([]);
  const [costAllocations, setCostAllocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const productsData = await fetchProducts();
      setProducts(productsData || []);

      const costAllocationsData = await fetchCostAllocations(organizationId);
      setCostAllocations(costAllocationsData);
    };

    fetchData();
  }, [organizationId]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = products.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleAddProduct = () => {
    setCurrentProduct(null);
    setModalOpen(true);
  };

  const handleEditProduct = () => {
    const productToEdit = products.find((product) => product.id === selected[0]);
    setCurrentProduct(productToEdit);
    setModalOpen(true);
  };

  const handleDeleteProducts = async () => {
    try {
      await Promise.all(selected.map((id) => deleteProduct(id)));
      setSelected([]);
      const productsData = await fetchProducts();
      setProducts(productsData || []);
    } catch (error) {
      console.error('Error deleting products:', error);
    }
  };

  const handleModalSubmit = async (productData) => {
    try {
      if (currentProduct) {
        await updateProduct(currentProduct.id, productData);
      } else {
        await addProduct({ ...productData, organizationId });
      }
      const productsData = await fetchProducts();
      setProducts(productsData || []);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const getCostAllocationLink = (productId) => {
    const allocation = costAllocations.find(allocation => allocation.productIds.includes(productId));
    return allocation ? `#/cost-allocation/${productId}` : null;
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(products, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, products]
  );

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={handleAddProduct}
            onDelete={handleDeleteProducts}
            onEdit={handleEditProduct}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const costAllocationLink = getCostAllocationLink(row.id);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <MUICheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      {headCells.map((field) => (
                        <TableCell key={field.id} align="left">
                          {row[field.id]}
                        </TableCell>
                      ))}
                      <TableCell align="left">
                        {costAllocationLink ? (
                          <Link href={costAllocationLink} underline="none">
                            View Cost Allocation
                          </Link>
                        ) : (
                          'No Allocation'
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={headCells.length + 2} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={products.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <ProductModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={currentProduct}
          organizationId={organizationId}
        />
      </Box>
    </Container>
  );
}
