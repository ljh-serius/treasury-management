import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, FormControlLabel, Switch, Modal, TextField, Button, Container
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { fetchProviders, addProvider, updateProvider, deleteProvider } from '../utils/providersFirebaseHelpers';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Provider Name' },
  { id: 'taxId', numeric: false, disablePadding: false, label: 'Tax ID' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'contactEmail', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'contactPhone', numeric: false, disablePadding: false, label: 'Phone' },
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
            inputProps={{ 'aria-label': 'select all providers' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
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
          Providers
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

function ProviderModal({ open, onClose, onSubmit, initialData, organizationId }) {
  const [providerData, setProviderData] = useState(
    initialData || {
      name: '',
      taxId: '',
      address: '',
      contactEmail: '',
      contactPhone: '',
      organizationId: [organizationId],
    }
  );

  useEffect(() => {
    setProviderData(initialData || {
      name: '',
      taxId: '',
      address: '',
      contactEmail: '',
      contactPhone: '',
      organizationId: [organizationId],
    });
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProviderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(providerData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
        <Typography variant="h6" component="h2">
          {initialData ? 'Edit Provider' : 'Add Provider'}
        </Typography>
        <TextField label="Name" name="name" fullWidth margin="normal" value={providerData.name} onChange={handleChange} />
        <TextField label="Tax ID" name="taxId" fullWidth margin="normal" value={providerData.taxId} onChange={handleChange} />
        <TextField label="Address" name="address" fullWidth margin="normal" value={providerData.address} onChange={handleChange} />
        <TextField label="Email" name="contactEmail" fullWidth margin="normal" value={providerData.contactEmail} onChange={handleChange} />
        <TextField label="Phone" name="contactPhone" fullWidth margin="normal" value={providerData.contactPhone} onChange={handleChange} />
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

export default function Providers() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [providers, setProviders] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);

  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

  useEffect(() => {
    const fetchData = async () => {
      const providersData = await fetchProviders(organizationId);
      setProviders(providersData);
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
      const newSelected = providers.map((n) => n.id);
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

  const handleAddProvider = () => {
    setCurrentProvider(null); // Reset currentProvider for adding a new provider
    setModalOpen(true);
  };

  const handleEditProvider = () => {
    const providerToEdit = providers.find((provider) => provider.id === selected[0]);
    setCurrentProvider(providerToEdit);
    setModalOpen(true);
  };

  const handleDeleteProviders = async () => {
    try {
      await Promise.all(selected.map((id) => deleteProvider(id)));
      setSelected([]);
      const providersData = await fetchProviders(organizationId);
      setProviders(providersData);
    } catch (error) {
      console.error('Error deleting providers:', error);
    }
  };

  const handleModalSubmit = async (providerData) => {
    try {
      if (currentProvider) {
        // Update existing provider
        await updateProvider(currentProvider.id, providerData);
      } else {
        // Add new provider
        await addProvider(providerData);
      }
      const providersData = await fetchProviders(organizationId);
      setProviders(providersData);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving provider:', error);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - providers.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(providers, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, providers]
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
        <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={handleAddProvider}
            onDelete={handleDeleteProviders}
            onEdit={handleEditProvider}
            />
            <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
                <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={providers.length}
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
                        {row.name}
                        </TableCell>
                        <TableCell align="right">{row.taxId}</TableCell>
                        <TableCell align="right">{row.address}</TableCell>
                        <TableCell align="right">{row.contactEmail}</TableCell>
                        <TableCell align="right">{row.contactPhone}</TableCell>
                    </TableRow>
                    );
                })}
                {emptyRows > 0 && (
                    <TableRow
                    style={{
                        height: (dense ? 33 : 53) * emptyRows,
                    }}
                    >
                    <TableCell colSpan={6} />
                    </TableRow>
                )}
                </TableBody>
            </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={providers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <ProviderModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            onSubmit={handleModalSubmit}
            initialData={currentProvider}
            organizationId={organizationId}
        />
        </Box>
    </Container>
  );
}
