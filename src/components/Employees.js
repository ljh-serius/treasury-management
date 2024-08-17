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

import { fetchEmployees, addEmployee, updateEmployee, deleteEmployee } from '../utils/employeesFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';

const headCells = [
  { id: 'name', label: 'Name' },
  { id: 'position', label: 'Position' },
  { id: 'email', label: 'Email' },
  { id: 'phone', label: 'Phone' },
  { id: 'department', label: 'Department' },
  { id: 'hireDate', label: 'Hire Date' },
  { id: 'salary', label: 'Salary' },
  { id: 'status', label: 'Status' },
  { id: 'manager', label: 'Manager' },
  { id: 'location', label: 'Location' },
  { id: 'address', label: 'Address' },
  { id: 'dateOfBirth', label: 'Date of Birth' },
  { id: 'gender', label: 'Gender' },
  { id: 'maritalStatus', label: 'Marital Status' },
  { id: 'nationality', label: 'Nationality' },
  { id: 'emergencyContactName', label: 'Emergency Contact Name' },
  { id: 'emergencyContactPhone', label: 'Emergency Contact Phone' },
  { id: 'bankAccountNumber', label: 'Bank Account Number' },
  { id: 'socialSecurityNumber', label: 'Social Security Number' },
  { id: 'taxId', label: 'Tax ID' },
  { id: 'jobTitle', label: 'Job Title' },
  { id: 'employmentType', label: 'Employment Type' },
  { id: 'workSchedule', label: 'Work Schedule' },
  { id: 'yearsOfExperience', label: 'Years of Experience' },
  { id: 'highestEducation', label: 'Highest Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'languagesSpoken', label: 'Languages Spoken' },
  { id: 'skills', label: 'Skills' },
  { id: 'performanceRating', label: 'Performance Rating' },
  { id: 'probationEndDate', label: 'Probation End Date' },
  { id: 'healthInsuranceProvider', label: 'Health Insurance Provider' },
  { id: 'healthInsuranceNumber', label: 'Health Insurance Number' },
  { id: 'additionalNotes', label: 'Additional Notes' },
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
  const [employeeData, setEmployeeData] = useState({
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
    address: '',
    dateOfBirth: '',
    gender: '',
    maritalStatus: '',
    nationality: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    bankAccountNumber: '',
    socialSecurityNumber: '',
    taxId: '',
    jobTitle: '',
    employmentType: '',
    workSchedule: '',
    yearsOfExperience: '',
    highestEducation: '',
    certifications: '',
    languagesSpoken: '',
    skills: '',
    performanceRating: '',
    probationEndDate: '',
    healthInsuranceProvider: '',
    healthInsuranceNumber: '',
    additionalNotes: '',
    organizationId,
  });

  useEffect(() => {
    if (initialData) {
      setEmployeeData(initialData);
    } else {
      setEmployeeData({
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
        address: '',
        dateOfBirth: '',
        gender: '',
        maritalStatus: '',
        nationality: '',
        emergencyContactName: '',
        emergencyContactPhone: '',
        bankAccountNumber: '',
        socialSecurityNumber: '',
        taxId: '',
        jobTitle: '',
        employmentType: '',
        workSchedule: '',
        yearsOfExperience: '',
        highestEducation: '',
        certifications: '',
        languagesSpoken: '',
        skills: '',
        performanceRating: '',
        probationEndDate: '',
        healthInsuranceProvider: '',
        healthInsuranceNumber: '',
        additionalNotes: '',
        organizationId,
      });
    }
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
          {/* All employee fields */}
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
          <TextField label="Address" name="address" fullWidth margin="normal" value={employeeData.address} onChange={handleChange} />
          <TextField label="Date of Birth" name="dateOfBirth" type="date" fullWidth margin="normal" value={employeeData.dateOfBirth} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField label="Gender" name="gender" fullWidth margin="normal" value={employeeData.gender} onChange={handleChange} />
          <TextField label="Marital Status" name="maritalStatus" fullWidth margin="normal" value={employeeData.maritalStatus} onChange={handleChange} />
          <TextField label="Nationality" name="nationality" fullWidth margin="normal" value={employeeData.nationality} onChange={handleChange} />
          <TextField label="Emergency Contact Name" name="emergencyContactName" fullWidth margin="normal" value={employeeData.emergencyContactName} onChange={handleChange} />
          <TextField label="Emergency Contact Phone" name="emergencyContactPhone" fullWidth margin="normal" value={employeeData.emergencyContactPhone} onChange={handleChange} />
          <TextField label="Bank Account Number" name="bankAccountNumber" fullWidth margin="normal" value={employeeData.bankAccountNumber} onChange={handleChange} />
          <TextField label="Social Security Number" name="socialSecurityNumber" fullWidth margin="normal" value={employeeData.socialSecurityNumber} onChange={handleChange} />
          <TextField label="Tax ID" name="taxId" fullWidth margin="normal" value={employeeData.taxId} onChange={handleChange} />
          <TextField label="Job Title" name="jobTitle" fullWidth margin="normal" value={employeeData.jobTitle} onChange={handleChange} />
          <TextField label="Employment Type" name="employmentType" fullWidth margin="normal" value={employeeData.employmentType} onChange={handleChange} />
          <TextField label="Work Schedule" name="workSchedule" fullWidth margin="normal" value={employeeData.workSchedule} onChange={handleChange} />
          <TextField label="Years of Experience" name="yearsOfExperience" fullWidth margin="normal" value={employeeData.yearsOfExperience} onChange={handleChange} />
          <TextField label="Highest Education" name="highestEducation" fullWidth margin="normal" value={employeeData.highestEducation} onChange={handleChange} />
          <TextField label="Certifications" name="certifications" fullWidth margin="normal" value={employeeData.certifications} onChange={handleChange} />
          <TextField label="Languages Spoken" name="languagesSpoken" fullWidth margin="normal" value={employeeData.languagesSpoken} onChange={handleChange} />
          <TextField label="Skills" name="skills" fullWidth margin="normal" value={employeeData.skills} onChange={handleChange} />
          <TextField label="Performance Rating" name="performanceRating" fullWidth margin="normal" value={employeeData.performanceRating} onChange={handleChange} />
          <TextField label="Probation End Date" name="probationEndDate" type="date" fullWidth margin="normal" value={employeeData.probationEndDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          <TextField label="Health Insurance Provider" name="healthInsuranceProvider" fullWidth margin="normal" value={employeeData.healthInsuranceProvider} onChange={handleChange} />
          <TextField label="Health Insurance Number" name="healthInsuranceNumber" fullWidth margin="normal" value={employeeData.healthInsuranceNumber} onChange={handleChange} />
          <TextField label="Additional Notes" name="additionalNotes" fullWidth margin="normal" multiline rows={4} value={employeeData.additionalNotes} onChange={handleChange} />
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
