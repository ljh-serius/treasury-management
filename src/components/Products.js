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

// Configuration object for the product fields
const productFieldConfig = {
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

const headCells = Object.keys(productFieldConfig).map(key => ({
  id: key,
  label: productFieldConfig[key].label,
}));

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
  const [productData, setProductData] = useState(() => {
    const defaultData = {};
    Object.keys(productFieldConfig).forEach((key) => {
      defaultData[key] = productFieldConfig[key].type === 'checkbox' ? false : '';
    });
    defaultData.organizationId = organizationId;
    return defaultData;
  });

  useEffect(() => {
    if (initialData) {
      setProductData(initialData);
    } else {
      setProductData(() => {
        const defaultData = {};
        Object.keys(productFieldConfig).forEach((key) => {
          defaultData[key] = productFieldConfig[key].type === 'checkbox' ? false : '';
        });
        defaultData.organizationId = organizationId;
        return defaultData;
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
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
          {Object.keys(productFieldConfig).map((field) => {
            const config = productFieldConfig[field];
            return config.type === 'checkbox' ? (
              <FormControlLabel
                key={field}
                control={
                  <Checkbox
                    name={field}
                    checked={productData[field]}
                    onChange={handleChange}
                  />
                }
                label={config.label}
              />
            ) : (
              <TextField
                key={field}
                label={config.label}
                name={field}
                type={config.type}
                fullWidth
                margin="normal"
                value={productData[field]}
                onChange={handleChange}
                multiline={config.multiline || false}
                rows={config.rows || 1}
                InputLabelProps={config.type === 'date' ? { shrink: true } : undefined}
              />
            );
          })}
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outlined" onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>Save</Button>
          </Box>
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
