import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container, FormControlLabel, Switch,
  FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

import { fetchProducts } from '../utils/productsFirebaseHelpers';
import { fetchEmployees } from '../utils/employeesFirebaseHelpers';
import { fetchProjects } from '../utils/projectsFirebaseHelpers';
import { fetchPartners } from '../utils/partnersFirebaseHelpers';
import { fetchProviders } from '../utils/providersFirebaseHelpers';
import { addCostAllocation, fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';
import { updateCostAllocation } from '../utils/costAllocationFirebaseHelpers';
import { deleteCostAllocation } from '../utils/costAllocationFirebaseHelpers';


function CostAllocationModal({ open, onClose, onSubmit, initialData }) {
  const [allocationData, setAllocationData] = useState(
    initialData || { cost: '', description: '', productIds: [], employeeIds: [], projectIds: [], partnerIds: [], providerIds: [] }
  );

  const [products, setProducts] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [projects, setProjects] = useState([]);
  const [partners, setPartners] = useState([]);
  const [providers, setProviders] = useState([]);

  useEffect(() => {

    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

    async function fetchData() {
      setProducts(await fetchProducts());
      setEmployees(await fetchEmployees());
      setProjects(await fetchProjects());
      setPartners(await fetchPartners());
      setProviders(await fetchProviders(organizationId));
    }
    fetchData();
    setAllocationData(initialData || { cost: '', description: '', productIds: [], employeeIds: [], projectIds: [], partnerIds: [], providerIds: [] });
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAllocationData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(allocationData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="h2">
          {initialData ? 'Edit Cost Allocation' : 'Add Cost Allocation'}
        </Typography>
        <TextField label="Cost" name="cost" type="number" fullWidth margin="normal" value={allocationData.cost} onChange={handleChange} />
        <TextField label="Description" name="description" fullWidth margin="normal" value={allocationData.description} onChange={handleChange} />

        <FormControl fullWidth margin="normal">
          <InputLabel>Products</InputLabel>
          <Select
            name="productIds"
            multiple
            value={allocationData.productIds}
            onChange={handleChange}
            renderValue={(selected) => selected.map(id => products.find(p => p.id === id)?.name).join(', ')}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                <Checkbox checked={allocationData.productIds.includes(product.id)} />
                <ListItemText primary={product.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Employees</InputLabel>
          <Select
            name="employeeIds"
            multiple
            value={allocationData.employeeIds}
            onChange={handleChange}
            renderValue={(selected) => selected.map(id => employees.find(e => e.id === id)?.name).join(', ')}
          >
            {employees.map((employee) => (
              <MenuItem key={employee.id} value={employee.id}>
                <Checkbox checked={allocationData.employeeIds.includes(employee.id)} />
                <ListItemText primary={employee.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Projects</InputLabel>
          <Select
            name="projectIds"
            multiple
            value={allocationData.projectIds}
            onChange={handleChange}
            renderValue={(selected) => selected.map(id => projects.find(p => p.id === id)?.name).join(', ')}
          >
            {projects.map((project) => (
              <MenuItem key={project.id} value={project.id}>
                <Checkbox checked={allocationData.projectIds.includes(project.id)} />
                <ListItemText primary={project.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Partners</InputLabel>
          <Select
            name="partnerIds"
            multiple
            value={allocationData.partnerIds}
            onChange={handleChange}
            renderValue={(selected) => selected.map(id => partners.find(p => p.id === id)?.name).join(', ')}
          >
            {partners.map((partner) => (
              <MenuItem key={partner.id} value={partner.id}>
                <Checkbox checked={allocationData.partnerIds.includes(partner.id)} />
                <ListItemText primary={partner.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal">
          <InputLabel>Providers</InputLabel>
          <Select
            name="providerIds"
            multiple
            value={allocationData.providerIds}
            onChange={handleChange}
            renderValue={(selected) => selected.map(id => providers.find(p => p.id === id)?.name).join(', ')}
          >
            {providers.map((provider) => (
              <MenuItem key={provider.id} value={provider.id}>
                <Checkbox checked={allocationData.providerIds.includes(provider.id)} />
                <ListItemText primary={provider.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={onClose} sx={{ mr: 1 }}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            {initialData ? 'Update' : 'Add'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default function CashFlowAndCostAllocation() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('cost');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [costAllocations, setCostAllocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentAllocation, setCurrentAllocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allocations = await fetchCostAllocations();
      setCostAllocations(allocations || []);
    };

    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = costAllocations.map((n) => n.id);
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
    const allocationToEdit = costAllocations.find((allocation) => allocation.id === selected[0]);
    setCurrentAllocation(allocationToEdit);
    setModalOpen(true);
  };

  const handleDeleteAllocations = async () => {
    try {
      await Promise.all(selected.map((id) => deleteCostAllocation(id)));
      setSelected([]);
      const allocations = await fetchCostAllocations();
      setCostAllocations(allocations || []);
    } catch (error) {
      console.error('Error deleting allocations:', error);
    }
  };

  const handleModalSubmit = async (allocationData) => {
    try {
      if (currentAllocation) {
        await updateCostAllocation(currentAllocation.id, allocationData);
      } else {
        await addCostAllocation(allocationData);
      }
      const allocations = await fetchCostAllocations();
      setCostAllocations(allocations || []);      setModalOpen(false);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - costAllocations.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(costAllocations, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, costAllocations]
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7, width: '60vw'}}>
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
                rowCount={costAllocations.length}
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
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.cost}
                      </TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      {/* You can add additional cells here for linked entities if needed */}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={12} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={costAllocations.length}
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
        <TableCell
          key="cost"
          align="right"
          padding="normal"
          sortDirection={orderBy === 'cost' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'cost'}
            direction={orderBy === 'cost' ? order : 'asc'}
            onClick={createSortHandler('cost')}
          >
            Cost
            {orderBy === 'cost' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
        <TableCell
          key="description"
          align="left"
          padding="normal"
          sortDirection={orderBy === 'description' ? order : false}
        >
          <TableSortLabel
            active={orderBy === 'description'}
            direction={orderBy === 'description' ? order : 'asc'}
            onClick={createSortHandler('description')}
          >
            Description
            {orderBy === 'description' ? (
              <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
              </Box>
            ) : null}
          </TableSortLabel>
        </TableCell>
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
