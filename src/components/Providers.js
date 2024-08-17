import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Toolbar, Typography, Paper, Checkbox as MUICheckbox, IconButton, Tooltip, FormControlLabel, Switch, Modal, TextField, Button, Container, Link
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { visuallyHidden } from '@mui/utils';
import { fetchProviders, addProvider, updateProvider, deleteProvider } from '../utils/providersFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Provider Name' },
  { id: 'taxId', numeric: false, disablePadding: false, label: 'Tax ID' },
  { id: 'address', numeric: false, disablePadding: false, label: 'Address' },
  { id: 'contactEmail', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'contactPhone', numeric: false, disablePadding: false, label: 'Phone' },
  { id: 'companyType', numeric: false, disablePadding: false, label: 'Company Type' },
  { id: 'country', numeric: false, disablePadding: false, label: 'Country' },
  { id: 'state', numeric: false, disablePadding: false, label: 'State/Province' },
  { id: 'zipCode', numeric: false, disablePadding: false, label: 'Zip/Postal Code' },
  { id: 'website', numeric: false, disablePadding: false, label: 'Website' },
  { id: 'industry', numeric: false, disablePadding: false, label: 'Industry' },
  { id: 'establishedDate', numeric: false, disablePadding: false, label: 'Established Date' },
  { id: 'contractValue', numeric: true, disablePadding: false, label: 'Contract Value' },
  { id: 'paymentTerms', numeric: false, disablePadding: false, label: 'Payment Terms' },
  { id: 'bankAccount', numeric: false, disablePadding: false, label: 'Bank Account' },
  { id: 'swiftCode', numeric: false, disablePadding: false, label: 'SWIFT Code' },
  { id: 'accountManager', numeric: false, disablePadding: false, label: 'Account Manager' },
  { id: 'servicesProvided', numeric: false, disablePadding: false, label: 'Services Provided' },
  { id: 'preferredContactMethod', numeric: false, disablePadding: false, label: 'Preferred Contact Method' },
  { id: 'rating', numeric: true, disablePadding: false, label: 'Rating' },
  { id: 'costAllocation', numeric: false, disablePadding: false, label: 'Cost Allocation' },
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
  // Extend the providerData with 20 fields
  const [providerData, setProviderData] = useState({
    name: '',
    taxId: '',
    address: '',
    contactEmail: '',
    contactPhone: '',
    companyType: '',
    country: '',
    state: '',
    zipCode: '',
    website: '',
    industry: '',
    establishedDate: '',
    contractValue: '',
    paymentTerms: '',
    bankAccount: '',
    swiftCode: '',
    accountManager: '',
    servicesProvided: '',
    preferredContactMethod: '',
    rating: '',
    regulatoryCompliance: '',       // New fields
    businessRegistrationNumber: '',
    additionalContactName: '',
    additionalContactEmail: '',
    additionalContactPhone: '',
    businessHours: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    customerSupportEmail: '',
    customerSupportPhone: '',
    supportHours: '',
    tradeLicenseNumber: '',
    vatNumber: '',
    businessInsurance: '',
    legalEntity: '',
    keyPersonnel: '',
    socialMediaLinks: '',
    annualRevenue: '',
    numberOfEmployees: '',
    headquartersLocation: '',
    branchOffices: '',
    certifications: '',
    environmentalPolicy: '',
    organizationId: organizationId,
  });

  useEffect(() => {
    setProviderData(initialData || {
      name: '',
      taxId: '',
      address: '',
      contactEmail: '',
      contactPhone: '',
      companyType: '',
      country: '',
      state: '',
      zipCode: '',
      website: '',
      industry: '',
      establishedDate: '',
      contractValue: '',
      paymentTerms: '',
      bankAccount: '',
      swiftCode: '',
      accountManager: '',
      servicesProvided: '',
      preferredContactMethod: '',
      rating: '',
      regulatoryCompliance: '',
      businessRegistrationNumber: '',
      additionalContactName: '',
      additionalContactEmail: '',
      additionalContactPhone: '',
      businessHours: '',
      emergencyContactName: '',
      emergencyContactPhone: '',
      customerSupportEmail: '',
      customerSupportPhone: '',
      supportHours: '',
      tradeLicenseNumber: '',
      vatNumber: '',
      businessInsurance: '',
      legalEntity: '',
      keyPersonnel: '',
      socialMediaLinks: '',
      annualRevenue: '',
      numberOfEmployees: '',
      headquartersLocation: '',
      branchOffices: '',
      certifications: '',
      environmentalPolicy: '',
      organizationId: organizationId,
    });
  }, [initialData, organizationId]);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProviderData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(providerData);
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
          {initialData ? 'Edit Provider' : 'Add Provider'}
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Existing fields */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Provider Name" name="name" fullWidth value={providerData.name} onChange={handleChange} />
            <TextField label="Tax ID" name="taxId" fullWidth value={providerData.taxId} onChange={handleChange} />
            <TextField label="Company Type" name="companyType" fullWidth value={providerData.companyType} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Address" name="address" fullWidth value={providerData.address} onChange={handleChange} />
            <TextField label="Country" name="country" fullWidth value={providerData.country} onChange={handleChange} />
            <TextField label="State/Province" name="state" fullWidth value={providerData.state} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Zip/Postal Code" name="zipCode" fullWidth value={providerData.zipCode} onChange={handleChange} />
            <TextField label="Email" name="contactEmail" fullWidth value={providerData.contactEmail} onChange={handleChange} />
            <TextField label="Phone" name="contactPhone" fullWidth value={providerData.contactPhone} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Website" name="website" fullWidth value={providerData.website} onChange={handleChange} />
            <TextField label="Industry" name="industry" fullWidth value={providerData.industry} onChange={handleChange} />
            <TextField label="Established Date" name="establishedDate" type="date" fullWidth value={providerData.establishedDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Contract Value" name="contractValue" fullWidth value={providerData.contractValue} onChange={handleChange} />
            <TextField label="Payment Terms" name="paymentTerms" fullWidth value={providerData.paymentTerms} onChange={handleChange} />
            <TextField label="Bank Account" name="bankAccount" fullWidth value={providerData.bankAccount} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="SWIFT Code" name="swiftCode" fullWidth value={providerData.swiftCode} onChange={handleChange} />
            <TextField label="Account Manager" name="accountManager" fullWidth value={providerData.accountManager} onChange={handleChange} />
            <TextField label="Services Provided" name="servicesProvided" fullWidth value={providerData.servicesProvided} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Preferred Contact Method" name="preferredContactMethod" fullWidth value={providerData.preferredContactMethod} onChange={handleChange} />
            <TextField label="Rating" name="rating" type="number" fullWidth value={providerData.rating} onChange={handleChange} />
          </Box>

          {/* New fields */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Regulatory Compliance" name="regulatoryCompliance" fullWidth value={providerData.regulatoryCompliance} onChange={handleChange} />
            <TextField label="Business Registration Number" name="businessRegistrationNumber" fullWidth value={providerData.businessRegistrationNumber} onChange={handleChange} />
            <TextField label="Additional Contact Name" name="additionalContactName" fullWidth value={providerData.additionalContactName} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Additional Contact Email" name="additionalContactEmail" fullWidth value={providerData.additionalContactEmail} onChange={handleChange} />
            <TextField label="Additional Contact Phone" name="additionalContactPhone" fullWidth value={providerData.additionalContactPhone} onChange={handleChange} />
            <TextField label="Business Hours" name="businessHours" fullWidth value={providerData.businessHours} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Emergency Contact Name" name="emergencyContactName" fullWidth value={providerData.emergencyContactName} onChange={handleChange} />
            <TextField label="Emergency Contact Phone" name="emergencyContactPhone" fullWidth value={providerData.emergencyContactPhone} onChange={handleChange} />
            <TextField label="Customer Support Email" name="customerSupportEmail" fullWidth value={providerData.customerSupportEmail} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Customer Support Phone" name="customerSupportPhone" fullWidth value={providerData.customerSupportPhone} onChange={handleChange} />
            <TextField label="Support Hours" name="supportHours" fullWidth value={providerData.supportHours} onChange={handleChange} />
            <TextField label="Trade License Number" name="tradeLicenseNumber" fullWidth value={providerData.tradeLicenseNumber} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="VAT Number" name="vatNumber" fullWidth value={providerData.vatNumber} onChange={handleChange} />
            <TextField label="Business Insurance" name="businessInsurance" fullWidth value={providerData.businessInsurance} onChange={handleChange} />
            <TextField label="Legal Entity" name="legalEntity" fullWidth value={providerData.legalEntity} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Key Personnel" name="keyPersonnel" fullWidth value={providerData.keyPersonnel} onChange={handleChange} />
            <TextField label="Social Media Links" name="socialMediaLinks" fullWidth value={providerData.socialMediaLinks} onChange={handleChange} />
            <TextField label="Annual Revenue" name="annualRevenue" fullWidth value={providerData.annualRevenue} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Number of Employees" name="numberOfEmployees" fullWidth value={providerData.numberOfEmployees} onChange={handleChange} />
            <TextField label="Headquarters Location" name="headquartersLocation" fullWidth value={providerData.headquartersLocation} onChange={handleChange} />
            <TextField label="Branch Offices" name="branchOffices" fullWidth value={providerData.branchOffices} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Certifications" name="certifications" fullWidth value={providerData.certifications} onChange={handleChange} />
            <TextField label="Environmental Policy" name="environmentalPolicy" fullWidth value={providerData.environmentalPolicy} onChange={handleChange} />
          </Box>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            {initialData ? 'Update Provider' : 'Add Provider'}
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
  const [costAllocations, setCostAllocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentProvider, setCurrentProvider] = useState(null);

  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;

  useEffect(() => {
    const fetchData = async () => {
      const providersData = await fetchProviders(organizationId);
      const costAllocationsData = await fetchCostAllocations(organizationId);
      setProviders(providersData);
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

  const getCostAllocationLink = (providerId) => {
    const allocation = costAllocations.find(allocation => allocation.providerIds.includes(providerId));
    return allocation ? `#/cost-allocation/${providerId}` : null;
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
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7}}>
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
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.taxId}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">{row.contactEmail}</TableCell>
                      <TableCell align="right">{row.contactPhone}</TableCell>
                      <TableCell align="right">{row.companyType}</TableCell>
                      <TableCell align="right">{row.country}</TableCell>
                      <TableCell align="right">{row.state}</TableCell>
                      <TableCell align="right">{row.zipCode}</TableCell>
                      <TableCell align="right">{row.website}</TableCell>
                      <TableCell align="right">{row.industry}</TableCell>
                      <TableCell align="right">{row.establishedDate}</TableCell>
                      <TableCell align="right">{row.contractValue}</TableCell>
                      <TableCell align="right">{row.paymentTerms}</TableCell>
                      <TableCell align="right">{row.bankAccount}</TableCell>
                      <TableCell align="right">{row.swiftCode}</TableCell>
                      <TableCell align="right">{row.accountManager}</TableCell>
                      <TableCell align="right">{row.servicesProvided}</TableCell>
                      <TableCell align="right">{row.preferredContactMethod}</TableCell>
                      <TableCell align="right">{row.rating}</TableCell>
                      <TableCell align="right">
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
                    <TableCell colSpan={21} />
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
