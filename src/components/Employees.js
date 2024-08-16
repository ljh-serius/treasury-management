import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container, FormControlLabel, Switch
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../utils/employeesFirebaseHelpers';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'position', numeric: false, disablePadding: false, label: 'Position' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'phone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'department', numeric: false, disablePadding: false, label: 'Department' },
  { id: 'hireDate', numeric: false, disablePadding: false, label: 'Hire Date' },
  { id: 'salary', numeric: true, disablePadding: false, label: 'Salary' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'manager', numeric: false, disablePadding: false, label: 'Manager' },
  { id: 'location', numeric: false, disablePadding: false, label: 'Location' },
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

function EmployeeModal({ open, onClose, onSubmit, initialData, organizationId }) {
    const [employeeData, setEmployeeData] = useState(
      initialData || {
        name: '',
        position: '',
        email: '',
        phone: '',
        department: '',
        hireDate: '',
        salary: '',
        status: 'Active',
        manager: '',
        location: '',
        organizationId: organizationId,
      }
    );
  
    useEffect(() => {
      setEmployeeData(initialData || {
        name: '',
        position: '',
        email: '',
        phone: '',
        department: '',
        hireDate: '',
        salary: '',
        status: 'Active',
        manager: '',
        location: '',
        organizationId: organizationId,
      });
    }, [initialData, organizationId]);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setEmployeeData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = () => {
      onSubmit(employeeData);
    };
  
    return (
      <Modal open={open} onClose={onClose}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
          <Typography variant="h6" component="h2">
            {initialData ? 'Edit Employee' : 'Add Employee'}
          </Typography>
          <TextField label="Name" name="name" fullWidth margin="normal" value={employeeData.name} onChange={handleChange} />
          <TextField label="Position" name="position" fullWidth margin="normal" value={employeeData.position} onChange={handleChange} />
          <TextField label="Email" name="email" fullWidth margin="normal" value={employeeData.email} onChange={handleChange} />
          <TextField label="Phone" name="phone" fullWidth margin="normal" value={employeeData.phone} onChange={handleChange} />
          <TextField label="Department" name="department" fullWidth margin="normal" value={employeeData.department} onChange={handleChange} />
          <TextField label="Hire Date" name="hireDate" type="date" fullWidth margin="normal" value={employeeData.hireDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField label="Salary" name="salary" type="number" fullWidth margin="normal" value={employeeData.salary} onChange={handleChange} />
          <TextField label="Status" name="status" fullWidth margin="normal" value={employeeData.status} onChange={handleChange} />
          <TextField label="Manager" name="manager" fullWidth margin="normal" value={employeeData.manager} onChange={handleChange} />
          <TextField label="Location" name="location" fullWidth margin="normal" value={employeeData.location} onChange={handleChange} />
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

function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, showWorkUnits } = props;
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
            inputProps={{ 'aria-label': 'select all units' }}
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
          Employees
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

export default function EmployeesList() {
  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employees, setEmployees] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
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
      const newSelected = employees.map((n) => n.id);
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

  const handleAddEmployee = () => {
    setCurrentEmployee(null);
    setModalOpen(true);
  };

  const handleEditEmployee = () => {
    const employeeToEdit = employees.find((employee) => employee.id === selected[0]);
    setCurrentEmployee(employeeToEdit);
    setModalOpen(true);
  };

  const handleDeleteEmployees = async () => {
    try {
      await Promise.all(selected.map((id) => deleteEmployee(id)));
      setSelected([]);
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
    } catch (error) {
      console.error('Error deleting employees:', error);
    }
  };

  const handleModalSubmit = async (employeeData) => {
    try {
      if (currentEmployee) {
        await updateEmployee(currentEmployee.id, employeeData);
      } else {
        await addEmployee({ ...employeeData, organizationId });
      }
      const employeesData = await fetchEmployees();
      setEmployees(employeesData);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving employee:', error);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - employees.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(employees, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, employees]
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7, width: '60vw' }}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={handleAddEmployee}
            onDelete={handleDeleteEmployees}
            onEdit={handleEditEmployee}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={employees.length}
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
                      <TableCell align="left">{row.position}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left">{row.phone}</TableCell>
                      <TableCell align="left">{row.department}</TableCell>
                      <TableCell align="left">{row.hireDate}</TableCell>
                      <TableCell align="right">{row.salary}</TableCell>
                      <TableCell align="left">{row.status}</TableCell>
                      <TableCell align="left">{row.manager}</TableCell>
                      <TableCell align="left">{row.location}</TableCell>
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
            count={employees.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <EmployeeModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={currentEmployee}
          organizationId={organizationId}
        />
      </Box>
    </Container>
  );
}
