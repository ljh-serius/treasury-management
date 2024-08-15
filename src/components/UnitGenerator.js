import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Switch,
  FormControlLabel,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Typography,
  IconButton,
  Tooltip,
  Toolbar,
  Modal,
  Fade,
  TablePagination,
  TableSortLabel,
  Checkbox as MUICheckbox,
  Backdrop
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';

import { fetchProviders } from '../utils/providersFirebaseHelpers';
import { fetchAllUnits, saveUnitToFirestore, fetchEntities } from '../utils/firebaseHelpers';
import { auth } from '../utils/firebaseConfig';
import { useTranslation } from '../utils/TranslationProvider';
import { generateRandomUnits } from '../utils/units-generator';
import { translate } from '../utils/translate';
import { generateSepaXML } from '../utils/sepa-extractor';
import { format } from 'date-fns';

import { updateUnit, deleteUnit } from '../utils/unitsFirebaseHelpers';

const categories = [
  'Category A', 'Category B', 'Category C', 'Category D', 'Category E',
  'Category F', 'Category G', 'Category H', 'Category I', 'Category J'
];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const headCells = [
  { id: 'id', numeric: false, disablePadding: true, label: 'ID' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'type', numeric: false, disablePadding: false, label: 'Type' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
  { id: 'unitPrice', numeric: true, disablePadding: false, label: 'Unit Price (€)' },
  { id: 'hoursWorked', numeric: true, disablePadding: false, label: 'Hours Worked' },
  { id: 'rate', numeric: true, disablePadding: false, label: 'Rate (€)' },
  { id: 'totalAmount', numeric: true, disablePadding: false, label: 'Total Amount (€)' },
  { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
  { id: 'category', numeric: false, disablePadding: false, label: 'Category' },
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
          (!showWorkUnits && (headCell.id === 'hoursWorked' || headCell.id === 'rate')) ? null : (
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
          )
        ))}
        <TableCell align="right">Actions</TableCell>
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

export default function UnitGenerator() {
  const { language } = useTranslation();
  const [allUnits, setAllUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [dense, setDense] = useState(false);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [selected, setSelected] = useState([]);
  const [showWorkUnits, setShowWorkUnits] = useState(true);
  const [selectedYears, setSelectedYears] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [unitType, setUnitType] = useState('revenues');
  const [entities, setEntities] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [currentUnit, setCurrentUnit] = useState({});
  const [selectedGenerationEntity, setSelectedGenerationEntity] = useState({});

  const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
  const userId = auth.currentUser?.uid;

  const calculateTotal = () => {
    return filteredUnits.reduce((sum, unit) => sum + (parseFloat(unit.unitPrice) * parseFloat(unit.quantity) || 0), 0).toFixed(2);
  };

  useEffect(() => {
    const fillEntities = async () => {
      if (organizationId) {
        const entitiesList = await fetchEntities(organizationId);
        setEntities(entitiesList);
      }
    };

    fillEntities();
  }, []);

  useEffect(() => {
    const fillProviders = async () => {
      const fetchedProviders = await fetchProviders(organizationId);
      setProviders(fetchedProviders);
    };

    if (unitType === 'expenses') {
      fillProviders();
    }
  }, [unitType]);

  const handleGenerateUnits = async () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    const fetchUnits = async () => {
      const filters = {
        selectedCategories,
        selectedTypes: [unitType],
        selectedMonths,
        selectedYears,
        selectedEntity,
        months,
      };

      console.log("FITLERS AAAA ", filters)
      const units = await fetchAllUnits(organizationId, filters);
      setAllUnits(units);
      setFilteredUnits(units);
    };

    fetchUnits();
  }, [selectedCategories, unitType, selectedMonths, selectedYears, selectedEntity]);

  const handleDialogClose = async (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      const { newWorkUnits, newProductUnits } = generateRandomUnits(100, unitType);
      const combinedUnits = [...newWorkUnits, ...newProductUnits];

      setAllUnits([...allUnits, ...combinedUnits]);
      setFilteredUnits([...filteredUnits, ...combinedUnits]);

      for (const unit of combinedUnits) {
        await saveUnitToFirestore(organizationId, selectedGenerationEntity, unit, (new Date(unit.date)).getUTCFullYear(), months[(new Date(unit.date)).getMonth()]);
      }
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = filteredUnits.map((n) => n.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangeUnitType = (event) => {
    setUnitType(event.target.value);
  };

  const handleSelectCategoryChange = (event) => {
    const value = event.target.value;
    setSelectedCategories(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSelectMonthChange = (event) => {
    const value = event.target.value;
    setSelectedMonths(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSelectYearChange = (event) => {
    const value = event.target.value;
    setSelectedYears(typeof value === 'string' ? value.split(',') : value);
  };

  const handleSelectProviderChange = (event) => {
    const value = event.target.value;
    setSelectedProviders(typeof value === 'string' ? value.split(',') : value);
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

  const handleEditUnit = () => {
    const unitToEdit = filteredUnits.find(unit => unit.id === selected[0]);
    if (unitToEdit) {
      setCurrentUnit(unitToEdit);
      setEditMode(true);
      setOpenModal(true);
    }
  };

  const handleDeleteUnits = async () => {
    for (const unitId of selected) {
      const unitToDelete = filteredUnits.find(unit => unit.id === unitId);
      if (unitToDelete) {
        const selectedYear = new Date(unitToDelete.date).getFullYear();
        const selectedMonth = new Date(unitToDelete.date).toLocaleString('en-US', { month: 'long' });
        await deleteUnit(organizationId, unitToDelete.entityId, selectedYear, selectedMonth, unitId);
      }
    }
    setFilteredUnits(filteredUnits.filter(unit => !selected.includes(unit.id)));
    setSelected([]);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setCurrentUnit({});
    setEditMode(false);
  };

  const handleModalSave = async () => {
    if (editMode) {
      const selectedYear = new Date(currentUnit.date).getFullYear();
      const selectedMonth = new Date(currentUnit.date).toLocaleString('en-US', { month: 'long' });
      await updateUnit(organizationId, currentUnit.entityId, selectedYear, selectedMonth, currentUnit.id, currentUnit);
      setFilteredUnits(
        filteredUnits.map((unit) => (unit.id === currentUnit.id ? currentUnit : unit))
      );
    } else {
      const newUnit = {
        ...currentUnit,
        id: filteredUnits.length + 1,
      };
      alert("quoi ??")
      await saveUnitToFirestore(organizationId, selectedGenerationEntity, newUnit, (new Date()).getFullYear(), (new Date()).toLocaleString('en-US', { month: 'long' }));
      setFilteredUnits([...filteredUnits, newUnit]);
      setAllUnits([...allUnits, newUnit]);
    }
    handleModalClose();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentUnit({ ...currentUnit, [name]: value });
  };

  const handleDeleteUnit = (id) => {
    const updatedUnits = filteredUnits.filter((unit) => unit.id !== id);
    setFilteredUnits(updatedUnits);
    setAllUnits(updatedUnits);
  };
  
  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleGenerateSepaFile = () => {
    generateSepaXML(filteredUnits);
  }

  const visibleRows = React.useMemo(
    () => stableSort(filteredUnits, getComparator(order, orderBy)).slice(
      page * rowsPerPage,
      page * rowsPerPage + rowsPerPage,
    ),
    [order, orderBy, page, rowsPerPage, filteredUnits],
  );

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, filteredUnits.length - page * rowsPerPage);

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={handleGenerateUnits}>
            {language === 'en' ? 'Generate Units' : 'Générer des unités'}
          </Button>
          <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={() => setOpenModal(true)}>
            {language === 'en' ? 'Add Unit' : 'Ajouter une unité'}
          </Button>
          <FormControlLabel
            control={<Switch checked={showWorkUnits} onChange={() => setShowWorkUnits(!showWorkUnits)} />}
            label={showWorkUnits ? (language === 'en' ? 'Show Work Units' : 'Afficher les unités de travail') : (language === 'en' ? 'Show Product Units' : 'Afficher les unités de produit')}
            sx={{ marginTop: 2 }}
          />
        </Box>
      </Box>

      <Box>
        <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
          <InputLabel id="entity-select-label">{language === 'en' ? 'Filter by Entity' : 'Filtrer par entité'}</InputLabel>
          <Select
            labelId="entity-select-label"
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
          >
            <MenuItem value="">{language === 'en' ? 'All Entities' : 'Toutes les entités'}</MenuItem>
            {entities.map((entity) => (
              <MenuItem key={entity.id} value={entity.id}>
                {entity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
          <InputLabel id="unit-type-select-label">{language === 'en' ? 'Select Type' : 'Sélectionner le type'}</InputLabel>
          <Select
            labelId="unit-type-select-label"
            value={unitType}
            onChange={handleChangeUnitType}
          >
            <MenuItem value="revenues">{language === 'en' ? 'Revenues' : 'Recettes'}</MenuItem>
            <MenuItem value="expenses">{language === 'en' ? 'Expenses' : 'Décaissements'}</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
          <InputLabel id="category-select-label">{language === 'en' ? 'Select Categories' : 'Sélectionner les catégories'}</InputLabel>
          <Select
            labelId="category-select-label"
            multiple
            value={selectedCategories}
            onChange={handleSelectCategoryChange}
            input={<OutlinedInput label="Categories" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={selectedCategories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
          <InputLabel id="month-select-label">{language === 'en' ? 'Select Months' : 'Sélectionner les mois'}</InputLabel>
          <Select
            labelId="month-select-label"
            multiple
            value={selectedMonths}
            onChange={handleSelectMonthChange}
            input={<OutlinedInput label="Months" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                <Checkbox checked={selectedMonths.indexOf(month) > -1} />
                <ListItemText primary={month} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
          <InputLabel id="year-select-label">{language === 'en' ? 'Select Year' : 'Sélectionner l\'année'}</InputLabel>
          <Select
            labelId="year-select-label"
            multiple
            value={selectedYears}
            onChange={handleSelectYearChange}
            input={<OutlinedInput label="Year" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {Array.from(new Array(5), (_, index) => new Date().getFullYear() - index).map((year) => (
              <MenuItem key={year} value={year}>
                <Checkbox checked={selectedYears.indexOf(year) > -1} />
                <ListItemText primary={year} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {unitType === 'expenses' && (
          <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
            <InputLabel id="provider-select-label">{language === 'en' ? 'Select Providers' : 'Sélectionner des fournisseurs'}</InputLabel>
            <Select
              labelId="provider-select-label"
              multiple
              value={selectedProviders}
              onChange={handleSelectProviderChange}
              input={<OutlinedInput label="Providers" />}
              renderValue={(selected) => selected.join(', ')}
            >
              {providers.map((provider) => (
                <MenuItem key={provider.id} value={provider.name}>
                  <Checkbox checked={selectedProviders.indexOf(provider.name) > -1} />
                  <ListItemText primary={provider.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          {translate('Total', language)}: {calculateTotal()}€
        </Typography>
        <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
            numSelected={selected.length}
            onAdd={() => setOpenModal(true)}
            onDelete={handleDeleteUnits}
            onEdit={handleEditUnit}
            />
          <TableContainer component={Paper} sx={{ marginTop: 3, borderRadius: '12px', boxShadow: 3 }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={filteredUnits.length}
                showWorkUnits={showWorkUnits}
              />
              <TableBody>
                {visibleRows.map((unit, index) => {
                  const isItemSelected = isSelected(unit.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, unit.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={unit.id}
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
                        {unit.id}
                      </TableCell>
                      <TableCell>{unit.description}</TableCell>
                      <TableCell>{unit.type}</TableCell>
                      <TableCell align="right">{unit.quantity}</TableCell>
                      <TableCell align="right">{unit.unitPrice}€</TableCell>
                      {showWorkUnits && <TableCell align="right">{unit.hoursWorked}</TableCell>}
                      {showWorkUnits && <TableCell align="right">{unit.rate}€</TableCell>}
                      <TableCell align="right">{unit.totalAmount}€</TableCell>
                      <TableCell>{unit.date ? format(new Date(unit.date), 'dd/MM/yyyy') : translate('Invalid Date', language)}</TableCell>
                      <TableCell>{unit.category}</TableCell>
                      <TableCell align="right">
                        <IconButton onClick={() => handleEditUnit(unit)} aria-label="edit">
                          <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteUnit(unit.id)} aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUnits.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleRowsPerPageChange}
          />

        </Paper>

        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />

        <Button variant="contained" color="secondary" onClick={handleGenerateSepaFile} sx={{ marginTop: 3 }}>
          {translate('Generate SEPA XML for Expenses', language)}
        </Button>
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openModal}
        onClose={handleModalClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Fade in={openModal}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {editMode ? translate('Edit Unit', language) : translate('Add Unit', language)}
            </Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel id="unit-type-dialog-select-label">{language === 'en' ? 'Select Type' : 'Sélectionner le type'}</InputLabel>
              <Select
                labelId="unit-type-dialog-select-label"
                value={unitType}
                onChange={(event) => { handleChangeUnitType(event); currentUnit.type = event.target.value }}
              >
                <MenuItem value="revenues">{language === 'en' ? 'Revenues' : 'Recettes'}</MenuItem>
                <MenuItem value="expenses">{language === 'en' ? 'Expenses' : 'Décaissements'}</MenuItem>
              </Select>
            </FormControl>

            <TextField
              margin="normal"
              fullWidth
              label={translate('Description', language)}
              name="description"
              value={currentUnit.description || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label={translate('Quantity', language)}
              name="quantity"
              value={currentUnit.quantity || ''}
              onChange={handleInputChange}
            />
            <TextField
              margin="normal"
              fullWidth
              label={translate('Unit Price', language)}
              name="unitPrice"
              value={currentUnit.unitPrice || ''}
              onChange={handleInputChange}
            />
            <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
              <InputLabel id="entity-select-label">{language === 'en' ? 'Filter by Entity' : 'Filtrer par entité'}</InputLabel>
              <Select
                labelId="entity-select-label"
                value={selectedGenerationEntity}
                onChange={(e) => setSelectedGenerationEntity(e.target.value)}
              >
                <MenuItem value="">{language === 'en' ? 'All Entities' : 'Toutes les entités'}</MenuItem>
                {entities.map((entity) => (
                  <MenuItem key={entity.id} value={entity.id}>
                    {entity.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {unitType === 'expenses' && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="provider-dialog-select-label">{language === 'en' ? 'Select Providers' : 'Sélectionner des fournisseurs'}</InputLabel>
              <Select
                labelId="provider-dialog-select-label"
                multiple
                value={selectedProviders}
                onChange={handleSelectProviderChange}
                input={<OutlinedInput label="Providers" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {providers.map((provider) => (
                  <MenuItem key={provider.id} value={provider.name}>
                    <Checkbox checked={selectedProviders.indexOf(provider.name) > -1} />
                    <ListItemText primary={provider.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
            <Button onClick={handleModalSave} variant="contained" sx={{ mt: 2 }}>
              {translate('Save', language)}
            </Button>
          </Box>
        </Fade>
      </Modal>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{language === 'en' ? 'Generate Units' : 'Générer des unités'}</DialogTitle>
        <DialogContent>
          <FormControl fullWidth margin="normal">
            <InputLabel id="unit-type-dialog-select-label">{language === 'en' ? 'Select Type' : 'Sélectionner le type'}</InputLabel>
            <Select
              labelId="unit-type-dialog-select-label"
              value={unitType}
              onChange={handleChangeUnitType}
            >
              <MenuItem value="revenues">{language === 'en' ? 'Revenues' : 'Recettes'}</MenuItem>
              <MenuItem value="expenses">{language === 'en' ? 'Expenses' : 'Décaissements'}</MenuItem>
            </Select>
          </FormControl>

         <FormControl fullWidth margin="normal" sx={{ marginBottom: 2 }}>
          <InputLabel id="entity-select-label">{language === 'en' ? 'Filter by Entity' : 'Filtrer par entité'}</InputLabel>
          <Select
            labelId="entity-select-label"
            value={selectedGenerationEntity}
            onChange={(e) => setSelectedGenerationEntity(e.target.value)}
          >
            <MenuItem value="">{language === 'en' ? 'All Entities' : 'Toutes les entités'}</MenuItem>
            {entities.map((entity) => (
              <MenuItem key={entity.id} value={entity.id}>
                {entity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

          {unitType === 'expenses' && (
            <FormControl fullWidth margin="normal">
              <InputLabel id="provider-dialog-select-label">{language === 'en' ? 'Select Providers' : 'Sélectionner des fournisseurs'}</InputLabel>
              <Select
                labelId="provider-dialog-select-label"
                multiple
                value={selectedProviders}
                onChange={handleSelectProviderChange}
                input={<OutlinedInput label="Providers" />}
                renderValue={(selected) => selected.join(', ')}
              >
                {providers.map((provider) => (
                  <MenuItem key={provider.id} value={provider.name}>
                    <Checkbox checked={selectedProviders.indexOf(provider.name) > -1} />
                    <ListItemText primary={provider.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>{language === 'en' ? 'Cancel' : 'Annuler'}</Button>
          <Button onClick={() => handleDialogClose(true)} variant="contained">
            {language === 'en' ? 'Generate' : 'Générer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
