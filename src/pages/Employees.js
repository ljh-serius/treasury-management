import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, Modal, TextField, Button, Container, FormControlLabel, Switch, Link
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';

import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../utils/employeesFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';

// Configuration object for employee fields
const employeesFieldConfig = {
  name: { label: 'Name', type: 'text' },
  position: { label: 'Position', type: 'text' },
  email: { label: 'Email', type: 'email' },
  phone: { label: 'Phone', type: 'text' },
  department: { label: 'Department', type: 'text' },
  hireDate: { label: 'Hire Date', type: 'date' },
  salary: { label: 'Salary', type: 'number' },
  status: { label: 'Status', type: 'text' },
  manager: { label: 'Manager', type: 'text' },
  location: { label: 'Location', type: 'text' },
  address: { label: 'Address', type: 'text' },
  dateOfBirth: { label: 'Date of Birth', type: 'date' },
  gender: { label: 'Gender', type: 'text' },
  maritalStatus: { label: 'Marital Status', type: 'text' },
  nationality: { label: 'Nationality', type: 'text' },
  emergencyContactName: { label: 'Emergency Contact Name', type: 'text' },
  emergencyContactPhone: { label: 'Emergency Contact Phone', type: 'text' },
  bankAccountNumber: { label: 'Bank Account Number', type: 'text' },
  socialSecurityNumber: { label: 'Social Security Number', type: 'text' },
  taxId: { label: 'Tax ID', type: 'text' },
  jobTitle: { label: 'Job Title', type: 'text' },
  employmentType: { label: 'Employment Type', type: 'text' },
  workSchedule: { label: 'Work Schedule', type: 'text' },
  yearsOfExperience: { label: 'Years of Experience', type: 'number' },
  highestEducation: { label: 'Highest Education', type: 'text' },
  certifications: { label: 'Certifications', type: 'text' },
  languagesSpoken: { label: 'Languages Spoken', type: 'text' },
  skills: { label: 'Skills', type: 'text' },
  performanceRating: { label: 'Performance Rating', type: 'number' },
  probationEndDate: { label: 'Probation End Date', type: 'date' },
  healthInsuranceProvider: { label: 'Health Insurance Provider', type: 'text' },
  healthInsuranceNumber: { label: 'Health Insurance Number', type: 'text' },
  additionalNotes: { label: 'Additional Notes', type: 'text' },
};

// Generate head cells dynamically from the config object
const headCells = Object.keys(employeesFieldConfig).map(key => ({
  id: key,
  label: employeesFieldConfig[key].label,
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
            inputProps={{ 'aria-label': 'select all employees' }}
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

function EmployeeModal({ open, onClose, onSubmit, initialData, organizationId }) {
  const [employeeData, setEmployeeData] = useState({ organizationId });

  useEffect(() => {
    if (initialData) {
      setEmployeeData(initialData);
    } else {
      setEmployeeData({ organizationId });
    }
  }, [initialData, organizationId]);

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setEmployeeData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? event.target.checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(employeeData);
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
          {initialData ? 'Edit Employee' : 'Add Employee'}
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 2,
          }}
        >
          {/* Render fields dynamically based on config */}
          {Object.keys(employeesFieldConfig).map((fieldKey) => {
            const field = employeesFieldConfig[fieldKey];
            return (
              <TextField
                key={fieldKey}
                label={field.label}
                name={fieldKey}
                type={field.type}
                fullWidth
                margin="normal"
                value={employeeData[fieldKey] || ''}
                onChange={handleChange}
                InputLabelProps={field.type === 'date' ? { shrink: true } : {}}
                multiline={field.type === 'text' && fieldKey === 'additionalNotes'}
                rows={fieldKey === 'additionalNotes' ? 4 : 1}
              />
            );
          })}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'end', gap: 2 }}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Save</Button>
        </Box>
      </Box>
    </Modal>
  );
}

export default function EmployeesManagement() {
  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employees, setEmployees] = useState([]);
  const [costAllocations, setCostAllocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const employeesData = await fetchEmployees();
      setEmployees(employeesData || []);

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
      setEmployees(employeesData || []);
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
      setEmployees(employeesData || []);
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

  const getCostAllocationLink = (employeeId) => {
    const allocation = costAllocations.find(allocation => allocation.employeeIds.includes(employeeId));
    return allocation ? `#/cost-allocation/${employeeId}` : null;
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
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
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
