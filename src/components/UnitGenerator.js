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
} from '@mui/material';
import { fetchProviders } from '../utils/providersFirebaseHelpers';
import { fetchAllUnits, saveUnitToFirestore, fetchEntities } from '../utils/firebaseHelpers';
import { auth } from '../utils/firebaseConfig';
import { useTranslation } from '../utils/TranslationProvider';
import { generateRandomUnits } from '../utils/units-generator';
import { translate } from '../utils/translate';
import { generateSepaXML } from '../utils/sepa-extractor';
import { format } from 'date-fns';

const categories = [
  'Category A', 'Category B', 'Category C', 'Category D', 'Category E',
  'Category F', 'Category G', 'Category H', 'Category I', 'Category J'
];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const UnitGenerator = () => {
  const { language } = useTranslation();
  const [allUnits, setAllUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [page, setPage] = useState(1);
  const [showWorkUnits, setShowWorkUnits] = useState(true);
  const [selectedYears, setSelectedYears] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [unitType, setUnitType] = useState('revenues');
  const [entities, setEntities] = useState([]);
  const [providers, setProviders] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const rowsPerPage = 10;
  const [selectedTypes, setSelectedTypes] = useState([]);


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
        selectedTypes,
        selectedMonths,
        selectedYears,
        selectedEntity,
        months,
      };
  
      const units = await fetchAllUnits(organizationId, filters);
      setAllUnits(units);
      setFilteredUnits(units);
    };
  
    fetchUnits();
  }, [selectedCategories, selectedTypes, selectedMonths, selectedYears, selectedEntity]);


  const handleDialogClose = async (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      const { newWorkUnits, newProductUnits } = generateRandomUnits(100, unitType);
      const combinedUnits = [...newWorkUnits, ...newProductUnits];

      setAllUnits([...allUnits, ...combinedUnits]);
      setFilteredUnits([...filteredUnits, ...combinedUnits]);

      for (const unit of combinedUnits) {
        await saveUnitToFirestore(organizationId, selectedEntity, unit);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedUnits = filteredUnits.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalPages = Math.ceil(filteredUnits.length / rowsPerPage);

  const handleChangeUnitType = (event) => {
    setUnitType(event.target.value);
  };

  const handleSelectProviderChange = (event) => {
    const value = event.target.value;
    setSelectedProviders(typeof value === 'string' ? value.split(',') : value);
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

  const handleGenerateSepaFile = () => {
    generateSepaXML(filteredUnits);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
          <Button variant="contained" color="primary" onClick={handleGenerateUnits}>
            {language === 'en' ? 'Generate Units' : 'Générer des unités'}
          </Button>

          <FormControlLabel
            control={<Switch checked={showWorkUnits} onChange={() => setShowWorkUnits(!showWorkUnits)} />}
            label={showWorkUnits ? (language === 'en' ? 'Show Work Units' : 'Afficher les unités de travail') : (language === 'en' ? 'Show Product Units' : 'Afficher les unités de produit')}
            sx={{ marginTop: 2 }}
          />
        </Box>

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

        <TableContainer component={Paper} sx={{ marginTop: 3, borderRadius: '12px', boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ backgroundColor: '#1976d2' }}>
              <TableRow>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('ID', language)}</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Description', language)}</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Type', language)}</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Quantity', language)}</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Unit Price', language)}</TableCell>
                {showWorkUnits && <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Hours Worked', language)}</TableCell>}
                {showWorkUnits && <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Rate', language)}</TableCell>}
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Total Amount', language)}</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Date', language)}</TableCell>
                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>{translate('Category', language)}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUnits.map((unit) => {
                const unitDate = unit.date ? new Date(unit.date) : null;

                return (
                  <TableRow key={unit.id}>
                    <TableCell>{unit.id}</TableCell>
                    <TableCell>{unit.description}</TableCell>
                    <TableCell>{unit.type}</TableCell>
                    <TableCell>{unit.quantity}</TableCell>
                    <TableCell>{unit.unitPrice}€</TableCell>
                    {showWorkUnits && <TableCell>{unit.hoursWorked}</TableCell>}
                    {showWorkUnits && <TableCell>{unit.rate}€</TableCell>}
                    <TableCell>{unit.totalAmount}€</TableCell>
                    <TableCell>
                      {unitDate ? format(unitDate, 'dd/MM/yyyy') : translate('Invalid Date', language)}
                    </TableCell>
                    <TableCell>{unit.category}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          sx={{ marginTop: 2 }}
        />

        <Button variant="contained" color="secondary" onClick={handleGenerateSepaFile} sx={{ marginTop: 3 }}>
          {translate('Generate SEPA XML for Expenses', language)}
        </Button>
      </Box>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>{language === 'en' ? 'Generate Units' : 'Générer des unités'}</DialogTitle>
        <DialogContent>
          {/* Include the same fields as above, with spacing */}
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="category-dialog-select-label">{language === 'en' ? 'Select Categories' : 'Sélectionner les catégories'}</InputLabel>
            <Select
              labelId="category-dialog-select-label"
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="month-dialog-select-label">{language === 'en' ? 'Select Months' : 'Sélectionner les mois'}</InputLabel>
            <Select
              labelId="month-dialog-select-label"
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

          <FormControl fullWidth margin="normal">
            <InputLabel id="year-dialog-select-label">{language === 'en' ? 'Select Year' : 'Sélectionner l\'année'}</InputLabel>
            <Select
              labelId="year-dialog-select-label"
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
};

export default UnitGenerator;
