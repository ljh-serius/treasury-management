import React, { useState, useEffect } from 'react';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel,
  Checkbox as MUICheckbox, FormControlLabel,
  Toolbar, Typography, Paper, IconButton, Tooltip, Modal, TextField, Button, Container, Switch, Grid, Link
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { fetchPartners, addPartner, updatePartner, deletePartner } from '../utils/partnersFirebaseHelpers';
import { fetchCostAllocations } from '../utils/costAllocationFirebaseHelpers';


const partnerFieldConfig = {
  name: { label: 'Partner Name', type: 'text' },
  service: { label: 'Service', type: 'text' },
  partnerType: { label: 'Partner Type', type: 'text' },
  contactName: { label: 'Contact Name', type: 'text' },
  contactEmail: { label: 'Contact Email', type: 'email' },
  contactPhone: { label: 'Contact Phone', type: 'tel' },
  address: { label: 'Address', type: 'text' },
  website: { label: 'Website', type: 'url' },
  industry: { label: 'Industry', type: 'text' },
  agreementDate: { label: 'Agreement Date', type: 'date' },
  contractValue: { label: 'Contract Value', type: 'number' },
  startDate: { label: 'Start Date', type: 'date' },
  endDate: { label: 'End Date', type: 'date' },
  renewalDate: { label: 'Renewal Date', type: 'date' },
  riskLevel: { label: 'Risk Level', type: 'text' },
  region: { label: 'Region', type: 'text' },
  paymentTerms: { label: 'Payment Terms', type: 'text' },
  complianceStatus: { label: 'Compliance Status', type: 'text' },
  notes: { label: 'Notes', type: 'text', multiline: true, rows: 4 },
  vendorCode: { label: 'Vendor Code', type: 'text' },
  billingCycle: { label: 'Billing Cycle', type: 'text' },
  sla: { label: 'Service Level Agreement (SLA)', type: 'text' },
  paymentMethod: { label: 'Payment Method', type: 'text' },
  discountRate: { label: 'Discount Rate', type: 'number' },
  preferredCurrency: { label: 'Preferred Currency', type: 'text' },
  lastAuditDate: { label: 'Last Audit Date', type: 'date' },
  supportContact: { label: 'Support Contact', type: 'text' },
  supportEmail: { label: 'Support Email', type: 'email' },
  supportPhone: { label: 'Support Phone', type: 'tel' },
  accountManager: { label: 'Account Manager', type: 'text' },
  partnerRating: { label: 'Partner Rating', type: 'text' },
  partnershipStartDate: { label: 'Partnership Start Date', type: 'date' },
  partnershipEndDate: { label: 'Partnership End Date', type: 'date' },
  numberOfEmployees: { label: 'Number of Employees', type: 'number' },
  annualRevenue: { label: 'Annual Revenue', type: 'number' },
  partnershipLevel: { label: 'Partnership Level', type: 'text' },
  preferredLanguage: { label: 'Preferred Language', type: 'text' },
  taxExemptionStatus: { label: 'Tax Exemption Status', type: 'text' },
};

const headCells = Object.keys(partnerFieldConfig).map(key => ({
  id: key,
  label: partnerFieldConfig[key].label,
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
    initialData || Object.keys(partnerFieldConfig).reduce((acc, field) => {
      acc[field] = '';
      return acc;
    }, { organizationId })
  );

  useEffect(() => {
    setPartnerData(
      initialData || Object.keys(partnerFieldConfig).reduce((acc, field) => {
        acc[field] = '';
        return acc;
      }, { organizationId })
    );
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
          {initialData ? 'Edit Partner' : 'Add Partner'}
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {Object.keys(partnerFieldConfig).map((field) => (
              <Grid item xs={12} sm={6} md={4} key={field}>
                <TextField
                  label={partnerFieldConfig[field].label}
                  name={field}
                  type={partnerFieldConfig[field].type}
                  value={partnerData[field]}
                  onChange={handleChange}
                  fullWidth
                  multiline={partnerFieldConfig[field].multiline || false}
                  rows={partnerFieldConfig[field].rows || 1}
                  InputLabelProps={partnerFieldConfig[field].type === 'date' ? { shrink: true } : undefined}
                />
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

  const getCostAllocationLink = (partnerId) => {
    const allocation = costAllocations.find(allocation => allocation.partnerIds.includes(partnerId));
    return allocation ? `#/cost-allocation/${partnerId}` : null;
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - partners.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(partners, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, partners]
  );

  return (
    <Container maxWidth="xl" sx={{ paddingTop: 3, paddingBottom: 7 }}>
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
                      {headCells.map((field) => (
                        <TableCell key={field.id} align={field.numeric ? 'right' : 'left'}>
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
