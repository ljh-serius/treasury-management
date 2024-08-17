import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container, FormControlLabel, Switch,
  FormControl, InputLabel, Select, MenuItem, ListItemText, Checkbox, Grid
} from '@mui/material';

import { visuallyHidden } from '@mui/utils';
import { alpha } from '@mui/material/styles';

import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import { fetchProducts } from '../utils/productsFirebaseHelpers';
import { fetchEmployees } from '../utils/employeesFirebaseHelpers';
import { fetchProjects } from '../utils/projectsFirebaseHelpers';
import { fetchPartners } from '../utils/partnersFirebaseHelpers';
import { fetchProviders } from '../utils/providersFirebaseHelpers';
import { addCostAllocation, fetchCostAllocations, updateCostAllocation, deleteCostAllocation } from '../utils/costAllocationFirebaseHelpers';
import { useParams } from 'react-router-dom';

import { generateRandomCostsAllocations } from '../fakers/costsAllocationsFaker';

export const costAllocationFieldConfig = {
  cost: { label: 'Cost', type: 'number' },
  description: { label: 'Description', type: 'text' },
  productIds: { 
    label: 'Products', 
    type: 'select', 
    options: [], 
    multiple: true 
  },
  employeeIds: { 
    label: 'Employees', 
    type: 'select', 
    options: [], 
    multiple: true 
  },
  projectIds: { 
    label: 'Projects', 
    type: 'select', 
    options: [], 
    multiple: true 
  },
  partnerIds: { 
    label: 'Partners', 
    type: 'select', 
    options: [], 
    multiple: true 
  },
  providerIds: { 
    label: 'Providers', 
    type: 'select', 
    options: [], 
    multiple: true 
  },
  allocationDate: { label: 'Allocation Date', type: 'date' },
  allocationType: { 
    label: 'Allocation Type', 
    type: 'select', 
    options: [
      { id: '1', label: 'Type 1' },
      { id: '2', label: 'Type 2' },
      { id: '3', label: 'Type 3' }
    ] 
  },
  notes: { label: 'Notes', type: 'text' },
  department: { 
    label: 'Department', 
    type: 'select', 
    options: [
      { id: 'finance', label: 'Finance' },
      { id: 'hr', label: 'Human Resources' },
      { id: 'it', label: 'IT' }
    ] 
  },
  priority: { 
    label: 'Priority', 
    type: 'select', 
    options: [
      { id: 'high', label: 'High' },
      { id: 'medium', label: 'Medium' },
      { id: 'low', label: 'Low' }
    ] 
  },
  status: { 
    label: 'Status', 
    type: 'select', 
    options: [
      { id: 'active', label: 'Active' },
      { id: 'inactive', label: 'Inactive' }
    ] 
  },
  duration: { label: 'Duration', type: 'number' },
  currency: { label: 'Currency', type: 'text' },
  approvedBy: { label: 'Approved By', type: 'text' },
  allocationCode: { label: 'Allocation Code', type: 'text' },
  fundingSource: { label: 'Funding Source', type: 'text' },
  costCenter: { label: 'Cost Center', type: 'text' },
  budgetCode: { label: 'Budget Code', type: 'text' },
  financialYear: { label: 'Financial Year', type: 'number' },
  quarter: { 
    label: 'Quarter', 
    type: 'select', 
    options: [
      { id: 'q1', label: 'Q1' },
      { id: 'q2', label: 'Q2' },
      { id: 'q3', label: 'Q3' },
      { id: 'q4', label: 'Q4' }
    ] 
  },
  allocationMethod: { label: 'Allocation Method', type: 'text' },
  roiEstimate: { label: 'ROI Estimate', type: 'number' },
  taxImplications: { label: 'Tax Implications', type: 'text' },
  capexOrOpex: { 
    label: 'Capex/Opex', 
    type: 'select', 
    options: [
      { id: 'capex', label: 'Capex' },
      { id: 'opex', label: 'Opex' }
    ] 
  },
  riskAssessment: { label: 'Risk Assessment', type: 'text' },
  complianceStatus: { 
    label: 'Compliance Status', 
    type: 'select', 
    options: [
      { id: 'compliant', label: 'Compliant' },
      { id: 'non_compliant', label: 'Non-compliant' }
    ] 
  },
  paymentTerms: { label: 'Payment Terms', type: 'text' },
  invoiceNumber: { label: 'Invoice Number', type: 'text' },
  vatAmount: { label: 'VAT Amount', type: 'number' },
  vatPercentage: { label: 'VAT Percentage', type: 'number' },
  discountApplied: { label: 'Discount Applied', type: 'number' },
  totalCostAfterDiscount: { label: 'Total Cost After Discount', type: 'number' },
  exchangeRate: { label: 'Exchange Rate', type: 'number' },
  costAllocationFactor: { label: 'Cost Allocation Factor', type: 'number' },
  approvalStatus: { 
    label: 'Approval Status', 
    type: 'select', 
    options: [
      { id: 'pending', label: 'Pending' },
      { id: 'approved', label: 'Approved' },
      { id: 'rejected', label: 'Rejected' }
    ] 
  },
  auditTrail: { label: 'Audit Trail', type: 'text' },
};


// Generate head cells for the table based on the config object
const headCells = Object.keys(costAllocationFieldConfig).map(key => ({
  id: key,
  label: costAllocationFieldConfig[key].label,
}));

export default function CostAllocation() {
  const { id } = useParams();
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('cost');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [costAllocations, setCostAllocations] = useState([]);
  const [filteredAllocations, setFilteredAllocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState(null);
  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

  const [employeeIds, setEmployeeIds] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [partnerIds, setPartnerIds] = useState([]);
  const [providerIds, setProviderIds] = useState([]);
  const [projectIds, setProjectIds] = useState([]);

  const [employees, setEmployees] = useState([]);
  const [products, setProducts] = useState([]);
  const [partners, setPartners] = useState([]);
  const [providers, setProviders] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedProducts = await fetchProducts();
      const fetchedEmployees = await fetchEmployees();
      const fetchedProjects = await fetchProjects();
      const fetchedPartners = await fetchPartners(organizationId);
      const fetchedProviders = await fetchProviders(organizationId);

      setEmployees(fetchedEmployees);
      setProjects(fetchedProjects);
      setPartners(fetchedPartners);
      setProviders(fetchedProviders);
      setProducts(fetchedProducts);


      setEmployeeIds(fetchedEmployees.map((employee) => employee.id));
      setProductIds(fetchedProducts.map((product) => product.id));
      setPartnerIds(fetchedPartners.map((partner) => partner.id));
      setProviderIds(fetchedProviders.map((provider) => provider.id));
      setProjectIds(fetchedProjects.map((project) => project.id));

      console.log(fetchedEmployees)
      console.log(fetchedProducts.map((product) => product.id))


      const allocations = await fetchCostAllocations(organizationId);
      setCostAllocations(allocations || []);

      if (id) {
        const filtered = allocations.filter(
          (allocation) =>
            allocation.productIds.includes(id) ||
            allocation.employeeIds.includes(id) ||
            allocation.projectIds.includes(id) ||
            allocation.partnerIds.includes(id) ||
            allocation.providerIds.includes(id)
        );
        setFilteredAllocations(filtered);
      } else {
        setFilteredAllocations(allocations);
      }
    };

    fetchData();
  }, [id, organizationId]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredAllocations.map((n) => n.id);
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

  const handleAddAllocation = () => {
    setCurrentAllocation(null);
    setModalOpen(true);
  };

  const handleEditAllocation = () => {
    const allocationToEdit = filteredAllocations.find((allocation) => allocation.id === selected[0]);
    setCurrentAllocation(allocationToEdit);
    setModalOpen(true);
  };

  const handleDeleteAllocations = async () => {
    try {
      await Promise.all(selected.map((id) => deleteCostAllocation(id)));
      setSelected([]);
      const allocations = await fetchCostAllocations(organizationId);
      setCostAllocations(allocations || []);

      if (id) {
        const filtered = allocations.filter(
          (allocation) =>
            allocation.productIds.includes(id) ||
            allocation.employeeIds.includes(id) ||
            allocation.projectIds.includes(id) ||
            allocation.partnerIds.includes(id) ||
            allocation.providerIds.includes(id)
        );
        setFilteredAllocations(filtered);
      } else {
        setFilteredAllocations(allocations);
      }
    } catch (error) {
      console.error('Error deleting allocations:', error);
    }
  };

  const handleModalSubmit = async (allocationData) => {
    try {
      if (currentAllocation) {
        await updateCostAllocation(currentAllocation.id, allocationData);
      } else {
        await addCostAllocation(allocationData, organizationId);
      }
      const allocations = await fetchCostAllocations(organizationId);
      setCostAllocations(allocations || []);

      if (id) {
        const filtered = allocations.filter(
          (allocation) =>
            allocation.productIds.includes(id) ||
            allocation.employeeIds.includes(id) ||
            allocation.projectIds.includes(id) ||
            allocation.partnerIds.includes(id) ||
            allocation.providerIds.includes(id)
        );
        setFilteredAllocations(filtered);
      } else {
        setFilteredAllocations(allocations);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving allocation:', error);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredAllocations.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredAllocations, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredAllocations]
  );

  const handleGenerateData = async () => {
    try {
      // Generate random data
      console.log("IDS IDS IDS IDS IDS ", [employeeIds, productIds, partnerIds, providerIds, projectIds])
      const randomData = generateRandomCostsAllocations(employeeIds, productIds, partnerIds, providerIds, projectIds);
  
      console.log("COMPLETELY RANDOM", randomData)

      // Validate that all required fields are filled and properly formatted
      if (!randomData.cost || !randomData.allocationDate || !randomData.productIds.length || !randomData.employeeIds.length) {
        throw new Error('Generated data is missing required fields.');
      }
  
      console.log("TTT", randomData)

      // Save the generated data to the database
      await addCostAllocation(randomData, organizationId);
  
      // Refetch the updated allocations
      const allocations = await fetchCostAllocations(organizationId);
      setCostAllocations(allocations || []);
  
      // Apply any filtering logic if necessary
      if (id) {
        const filtered = allocations.filter(
          (allocation) =>
            allocation.productIds.includes(id) ||
            allocation.employeeIds.includes(id) ||
            allocation.projectIds.includes(id) ||
            allocation.partnerIds.includes(id) ||
            allocation.providerIds.includes(id)
        );
        setFilteredAllocations(filtered);
      } else {
        setFilteredAllocations(allocations);
      }
  
      console.log("Random data generated and saved:", randomData);
    } catch (error) {
      console.error('Error generating or saving data:', error);
    }
  };
  
  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={handleAddAllocation}
            onDelete={handleDeleteAllocations}
            onEdit={handleEditAllocation}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filteredAllocations.length}
              />

              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

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
                      {headCells.map((headCell) => (
                        <TableCell key={headCell.id} align="left">
                          {row[headCell.id]}
                        </TableCell>
                      ))}
                      <TableCell align="center">
                        <IconButton
                          aria-label="generate random data"
                          onClick={() => handleGenerateData(row.id)}
                        >
                          <PlayArrowIcon />
                        </IconButton>
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
            count={filteredAllocations.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <CostAllocationModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={currentAllocation}
          organizationId={organizationId}
        />
      </Box>
    </Container>
  );
}

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
            inputProps={{ 'aria-label': 'select all cost allocations' }}
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
        <TableCell align="center">Action</TableCell>
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
          Cost Allocations
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

function CostAllocationModal({ open, onClose, onSubmit, initialData, organizationId }) {
  const [allocationData, setAllocationData] = useState(
    initialData || createEmptyAllocationData(organizationId)
  );

  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    setAllocationData(initialData || createEmptyAllocationData(organizationId));
  }, [initialData, organizationId]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      const employees = await fetchEmployees();
      const projects = await fetchProjects();
      const partners = await fetchPartners(organizationId);
      const providers = await fetchProviders(organizationId);

      setProducts(products);
      setEmployees(employees);
      setProjects(projects);
      setPartners(partners);
      setProviders(providers);
    };

    fetchData();
  }, [organizationId]);

  useEffect(() => {
    costAllocationFieldConfig.productIds.options = products.map((product) => ({ id: product.id, label: product.name }));
    costAllocationFieldConfig.employeeIds.options = employees.map((employee) => ({ id: employee.id, label: employee.name }));
    costAllocationFieldConfig.projectIds.options = projects.map((project) => ({ id: project.id, label: project.name }));
    costAllocationFieldConfig.partnerIds.options = partners.map((partner) => ({ id: partner.id, label: partner.name }));
    costAllocationFieldConfig.providerIds.options = providers.map((provider) => ({ id: provider.id, label: provider.name }));
  }, [products, employees, projects, partners, providers]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAllocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const sanitizedData = {
      ...allocationData,
      organizationId,
      productIds: allocationData.productIds || [],
      employeeIds: allocationData.employeeIds || [],
      projectIds: allocationData.projectIds || [],
      partnerIds: allocationData.partnerIds || [],
      providerIds: allocationData.providerIds || [],
    };

    onSubmit(sanitizedData);
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
          {initialData ? 'Edit Cost Allocation' : 'Add Cost Allocation'}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {Object.keys(costAllocationFieldConfig).map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field}>
                {costAllocationFieldConfig[field].type === 'select' ? (
                  <FormControl fullWidth>
                    <InputLabel>{costAllocationFieldConfig[field].label}</InputLabel>
                    <Select
                      name={field}
                      value={allocationData[field] || ''}
                      onChange={handleChange}
                      multiple={costAllocationFieldConfig[field].multiple || false}
                      renderValue={(selected) => {
                        if (costAllocationFieldConfig[field].multiple) {
                          return selected
                            .map((id) => {
                              const option = costAllocationFieldConfig[field].options?.find((opt) => opt.id === id);
                              return option ? option.label : '';
                            })
                            .join(', ');
                        }
                        const option = costAllocationFieldConfig[field].options?.find((opt) => opt.id === selected);
                        return option ? option.label : '';
                      }}
                    >
                      {costAllocationFieldConfig[field].options && Array.isArray(costAllocationFieldConfig[field].options)
                        ? costAllocationFieldConfig[field].options.map((option, optionIndex) => (
                          <MenuItem key={option.id + '-' + optionIndex} value={option.id}>
                            {costAllocationFieldConfig[field].multiple && (
                              <Checkbox checked={allocationData[field].includes(option.id)} />
                            )}
                            <ListItemText primary={option.label} />
                          </MenuItem>
                        ))
                        : null}
                    </Select>
                  </FormControl>
                ) : (
                  <TextField
                    label={costAllocationFieldConfig[field].label}
                    name={field}
                    type={costAllocationFieldConfig[field].type}
                    value={allocationData[field] || ''}
                    onChange={handleChange}
                    fullWidth
                    multiline={costAllocationFieldConfig[field].multiline || false}
                    rows={costAllocationFieldConfig[field].rows || 1}
                    InputLabelProps={costAllocationFieldConfig[field].type === 'date' ? { shrink: true } : undefined}
                  />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

const createEmptyAllocationData = (organizationId) => {
  return Object.keys(costAllocationFieldConfig).reduce((acc, field) => {
    acc[field] = costAllocationFieldConfig[field].multiple ? [] : '';
    return acc;
  }, { organizationId });
};

