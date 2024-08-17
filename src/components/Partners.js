import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Checkbox as MUICheckbox, FormControlLabel,
  Toolbar, Typography, Paper, IconButton, Tooltip, Modal, TextField, Button, Container, Switch, 
  Link,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { fetchPartners, addPartner, updatePartner, deletePartner } from '../utils/partnersFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Partner Name' },
  { id: 'service', numeric: false, disablePadding: false, label: 'Service' },
  { id: 'partnerType', numeric: false, disablePadding: false, label: 'Partner Type' },
  { id: 'contactName', numeric: false, disablePadding: false, label: 'Contact Name' },
  { id: 'contactEmail', numeric: false, disablePadding: false, label: 'Contact Email' },
  { id: 'contactPhone', numeric: false, disablePadding: false, label: 'Contact Phone' },
  { id: 'region', numeric: false, disablePadding: false, label: 'Region' },
  { id: 'startDate', numeric: false, disablePadding: false, label: 'Start Date' },
  { id: 'endDate', numeric: false, disablePadding: false, label: 'End Date' },
  { id: 'contractValue', numeric: true, disablePadding: false, label: 'Contract Value' },
  { id: 'riskLevel', numeric: false, disablePadding: false, label: 'Risk Level' },
  { id: 'complianceStatus', numeric: false, disablePadding: false, label: 'Compliance Status' },
  { id: 'vendorCode', numeric: false, disablePadding: false, label: 'Vendor Code' },
  { id: 'billingCycle', numeric: false, disablePadding: false, label: 'Billing Cycle' },
  { id: 'sla', numeric: false, disablePadding: false, label: 'Service Level Agreement (SLA)' },
  { id: 'paymentMethod', numeric: false, disablePadding: false, label: 'Payment Method' },
  { id: 'discountRate', numeric: false, disablePadding: false, label: 'Discount Rate' },
  { id: 'preferredCurrency', numeric: false, disablePadding: false, label: 'Preferred Currency' },
  { id: 'lastAuditDate', numeric: false, disablePadding: false, label: 'Last Audit Date' },
  { id: 'contractExpiryWarning', numeric: false, disablePadding: false, label: 'Contract Expiry Warning' },
  { id: 'supportContact', numeric: false, disablePadding: false, label: 'Support Contact' },
  { id: 'supportEmail', numeric: false, disablePadding: false, label: 'Support Email' },
  { id: 'supportPhone', numeric: false, disablePadding: false, label: 'Support Phone' },
  { id: 'accountManager', numeric: false, disablePadding: false, label: 'Account Manager' },
  { id: 'partnerRating', numeric: false, disablePadding: false, label: 'Partner Rating' },
  { id: 'partnershipStartDate', numeric: false, disablePadding: false, label: 'Partnership Start Date' },
  { id: 'partnershipEndDate', numeric: false, disablePadding: false, label: 'Partnership End Date' },
  { id: 'numberOfEmployees', numeric: true, disablePadding: false, label: 'Number of Employees' },
  { id: 'annualRevenue', numeric: true, disablePadding: false, label: 'Annual Revenue' },
  { id: 'partnershipLevel', numeric: false, disablePadding: false, label: 'Partnership Level' },
  { id: 'preferredLanguage', numeric: false, disablePadding: false, label: 'Preferred Language' },
  { id: 'taxExemptionStatus', numeric: false, disablePadding: false, label: 'Tax Exemption Status' },
  { id: 'costAllocationLink', numeric: false, disablePadding: false, label: 'Cost Allocation' },
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
            inputProps={{ 'aria-label': 'select all partners' }}
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
          Partners
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

function PartnerModal({ open, onClose, onSubmit, initialData, organizationId }) {
  const [partnerData, setPartnerData] = useState(
    initialData || {
      name: '',
      service: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      website: '',
      industry: '',
      agreementDate: '',
      partnerType: '',
      contractValue: '',
      startDate: '',
      endDate: '',
      renewalDate: '',
      riskLevel: '',
      region: '',
      paymentTerms: '',
      complianceStatus: '',
      notes: '',
      vendorCode: '',
      billingCycle: '',
      sla: '',
      paymentMethod: '',
      discountRate: '',
      preferredCurrency: '',
      lastAuditDate: '',
      contractExpiryWarning: false,
      supportContact: '',
      supportEmail: '',
      supportPhone: '',
      accountManager: '',
      partnerRating: '',
      partnershipStartDate: '',
      partnershipEndDate: '',
      numberOfEmployees: '',
      annualRevenue: '',
      partnershipLevel: '',
      preferredLanguage: '',
      taxExemptionStatus: '',
      status: 'Active',
      organizationId: organizationId,
    }
  );

  useEffect(() => {
    setPartnerData(initialData || {
      name: '',
      service: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      address: '',
      website: '',
      industry: '',
      agreementDate: '',
      partnerType: '',
      contractValue: '',
      startDate: '',
      endDate: '',
      renewalDate: '',
      riskLevel: '',
      region: '',
      paymentTerms: '',
      complianceStatus: '',
      notes: '',
      vendorCode: '',
      billingCycle: '',
      sla: '',
      paymentMethod: '',
      discountRate: '',
      preferredCurrency: '',
      lastAuditDate: '',
      contractExpiryWarning: false,
      supportContact: '',
      supportEmail: '',
      supportPhone: '',
      accountManager: '',
      partnerRating: '',
      partnershipStartDate: '',
      partnershipEndDate: '',
      numberOfEmployees: '',
      annualRevenue: '',
      partnershipLevel: '',
      preferredLanguage: '',
      taxExemptionStatus: '',
      status: 'Active',
      organizationId: organizationId,
    });
  }, [initialData, organizationId]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPartnerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(partnerData);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '90vw',  // Expanded to 90% of the viewport width
        height: '90vh', // Expanded to 90% of the viewport height
        bgcolor: 'background.paper', 
        border: '2px solid #000', 
        boxShadow: 24, 
        p: 4,
        overflowY: 'auto' // Make the modal scrollable
      }}>
        <Typography variant="h6" component="h2">
          {initialData ? 'Edit Partner' : 'Add Partner'}
        </Typography>
        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Partner Name" name="name" fullWidth value={partnerData.name} onChange={handleChange} />
            <TextField label="Service" name="service" fullWidth value={partnerData.service} onChange={handleChange} />
            <TextField label="Partner Type" name="partnerType" fullWidth value={partnerData.partnerType} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Contact Name" name="contactName" fullWidth value={partnerData.contactName} onChange={handleChange} />
            <TextField label="Contact Email" name="contactEmail" fullWidth value={partnerData.contactEmail} onChange={handleChange} />
            <TextField label="Contact Phone" name="contactPhone" fullWidth value={partnerData.contactPhone} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Address" name="address" fullWidth value={partnerData.address} onChange={handleChange} />
            <TextField label="Website" name="website" fullWidth value={partnerData.website} onChange={handleChange} />
            <TextField label="Industry" name="industry" fullWidth value={partnerData.industry} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Agreement Date" name="agreementDate" type="date" fullWidth value={partnerData.agreementDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Contract Value" name="contractValue" fullWidth value={partnerData.contractValue} onChange={handleChange} />
            <TextField label="Start Date" name="startDate" type="date" fullWidth value={partnerData.startDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="End Date" name="endDate" type="date" fullWidth value={partnerData.endDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Renewal Date" name="renewalDate" type="date" fullWidth value={partnerData.renewalDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Risk Level" name="riskLevel" fullWidth value={partnerData.riskLevel} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Region" name="region" fullWidth value={partnerData.region} onChange={handleChange} />
            <TextField label="Payment Terms" name="paymentTerms" fullWidth value={partnerData.paymentTerms} onChange={handleChange} />
            <TextField label="Compliance Status" name="complianceStatus" fullWidth value={partnerData.complianceStatus} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Vendor Code" name="vendorCode" fullWidth value={partnerData.vendorCode} onChange={handleChange} />
            <TextField label="Billing Cycle" name="billingCycle" fullWidth value={partnerData.billingCycle} onChange={handleChange} />
            <TextField label="Service Level Agreement (SLA)" name="sla" fullWidth value={partnerData.sla} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Payment Method" name="paymentMethod" fullWidth value={partnerData.paymentMethod} onChange={handleChange} />
            <TextField label="Discount Rate" name="discountRate" fullWidth value={partnerData.discountRate} onChange={handleChange} />
            <TextField label="Preferred Currency" name="preferredCurrency" fullWidth value={partnerData.preferredCurrency} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Last Audit Date" name="lastAuditDate" type="date" fullWidth value={partnerData.lastAuditDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Support Contact" name="supportContact" fullWidth value={partnerData.supportContact} onChange={handleChange} />
            <TextField label="Support Email" name="supportEmail" fullWidth value={partnerData.supportEmail} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Support Phone" name="supportPhone" fullWidth value={partnerData.supportPhone} onChange={handleChange} />
            <TextField label="Account Manager" name="accountManager" fullWidth value={partnerData.accountManager} onChange={handleChange} />
            <TextField label="Partner Rating" name="partnerRating" fullWidth value={partnerData.partnerRating} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Partnership Start Date" name="partnershipStartDate" type="date" fullWidth value={partnerData.partnershipStartDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Partnership End Date" name="partnershipEndDate" type="date" fullWidth value={partnerData.partnershipEndDate} onChange={handleChange} InputLabelProps={{ shrink: true }} />
            <TextField label="Number of Employees" name="numberOfEmployees" fullWidth value={partnerData.numberOfEmployees} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Annual Revenue" name="annualRevenue" fullWidth value={partnerData.annualRevenue} onChange={handleChange} />
            <TextField label="Partnership Level" name="partnershipLevel" fullWidth value={partnerData.partnershipLevel} onChange={handleChange} />
            <TextField label="Preferred Language" name="preferredLanguage" fullWidth value={partnerData.preferredLanguage} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField label="Tax Exemption Status" name="taxExemptionStatus" fullWidth value={partnerData.taxExemptionStatus} onChange={handleChange} />
            <TextField label="Notes" name="notes" fullWidth multiline rows={4} value={partnerData.notes} onChange={handleChange} />
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit}>
              {initialData ? 'Update' : 'Add'}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default function Partners() {
  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [partners, setPartners] = useState([]);
  const [costAllocations, setCostAllocations] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const partnersData = await fetchPartners(organizationId);
      setPartners(partnersData);

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
      const newSelected = partners.map((n) => n.id);
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

  const handleAddPartner = () => {
    setCurrentPartner(null);
    setModalOpen(true);
  };

  const handleEditPartner = () => {
    const partnerToEdit = partners.find((partner) => partner.id === selected[0]);
    setCurrentPartner(partnerToEdit);
    setModalOpen(true);
  };

  const handleDeletePartners = async () => {
    try {
      await Promise.all(selected.map((id) => deletePartner(id)));
      setSelected([]);
      const partnersData = await fetchPartners(organizationId);
      setPartners(partnersData);
    } catch (error) {
      console.error('Error deleting partners:', error);
    }
  };

  const handleModalSubmit = async (partnerData) => {
    try {
      if (currentPartner) {
        await updatePartner(currentPartner.id, partnerData);
      } else {
        await addPartner({ ...partnerData, organizationId });
      }
      const partnersData = await fetchPartners(organizationId);
      setPartners(partnersData);
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving partner:', error);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partners.length) : 0;

  const getCostAllocationLink = (partnerId) => {
    const allocation = costAllocations.find(allocation => allocation.partnerIds.includes(partnerId));
    return allocation ? `#/cost-allocation/${partnerId}` : null;
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(partners, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, partners]
  );

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7, width: "60vw"}}>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={handleAddPartner}
            onDelete={handleDeletePartners}
            onEdit={handleEditPartner}
          />
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? 'small' : 'medium'}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={partners.length}
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
                      <TableCell align="left">{row.service}</TableCell>
                      <TableCell align="left">{row.partnerType}</TableCell>
                      <TableCell align="left">{row.contactName}</TableCell>
                      <TableCell align="left">{row.contactEmail}</TableCell>
                      <TableCell align="left">{row.contactPhone}</TableCell>
                      <TableCell align="left">{row.region}</TableCell>
                      <TableCell align="left">{row.startDate}</TableCell>
                      <TableCell align="left">{row.endDate}</TableCell>
                      <TableCell align="right">{row.contractValue}</TableCell>
                      <TableCell align="left">{row.riskLevel}</TableCell>
                      <TableCell align="left">{row.complianceStatus}</TableCell>
                      <TableCell align="left">{row.vendorCode}</TableCell>
                      <TableCell align="left">{row.billingCycle}</TableCell>
                      <TableCell align="left">{row.sla}</TableCell>
                      <TableCell align="left">{row.paymentMethod}</TableCell>
                      <TableCell align="left">{row.discountRate}</TableCell>
                      <TableCell align="left">{row.preferredCurrency}</TableCell>
                      <TableCell align="left">{row.lastAuditDate}</TableCell>
                      <TableCell align="left">{row.contractExpiryWarning ? 'Yes' : 'No'}</TableCell>
                      <TableCell align="left">{row.supportContact}</TableCell>
                      <TableCell align="left">{row.supportEmail}</TableCell>
                      <TableCell align="left">{row.supportPhone}</TableCell>
                      <TableCell align="left">{row.accountManager}</TableCell>
                      <TableCell align="left">{row.partnerRating}</TableCell>
                      <TableCell align="left">{row.partnershipStartDate}</TableCell>
                      <TableCell align="left">{row.partnershipEndDate}</TableCell>
                      <TableCell align="right">{row.numberOfEmployees}</TableCell>
                      <TableCell align="right">{row.annualRevenue}</TableCell>
                      <TableCell align="left">{row.partnershipLevel}</TableCell>
                      <TableCell align="left">{row.preferredLanguage}</TableCell>
                      <TableCell align="left">{row.taxExemptionStatus}</TableCell>
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
                    <TableCell colSpan={headCells.length + 1} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={partners.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel control={<Switch checked={dense} onChange={handleChangeDense} />} label="Dense padding" />
        <PartnerModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
          initialData={currentPartner}
          organizationId={organizationId}
        />
      </Box>
    </Container>
  );
}
