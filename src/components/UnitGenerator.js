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
  RadioGroup,
  FormControl,
  FormLabel,
  Radio,
  Typography,
  InputLabel,
  Select,
  Checkbox,
  ListItemText,
} from '@mui/material';
import { format } from 'date-fns';
import { fetchAllUnits, saveUnitToFirestore, fetchEntities } from '../utils/firebaseHelpers';
import { auth } from '../utils/firebaseConfig';
import { translate } from '../utils/translate';
import { useTranslation } from '../utils/TranslationProvider';
import { generateRandomUnits } from '../utils/units-generator';
import { generateSepaXML } from '../utils/sepa-extractor';
import { RepartitionRounded } from '@mui/icons-material';

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
  const [selectedYear, setSelectedYear] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [unitType, setUnitType] = useState('revenues');
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const [entities, setEntities] = useState([]);
  const [selectedEntity, setSelectedEntity] = useState('');
  const rowsPerPage = 10;
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [currentSummaryName, setCurrentSummaryName] = useState([]);
  const [currentEntityId, setCurrentEntityId] = useState([]);

  const userId = auth.currentUser?.uid;

  const loadFromLocalStorage = (userId, key) => {
    if (!userId) return null;
    const fullKey = `${userId}_${key}`;
    const storedData = localStorage.getItem(fullKey);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  };

  useEffect(() => {
    const fillEntities = async () => {
      const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
      if (organizationId) {
        const entitiesList = await fetchEntities(organizationId);
        setEntities(entitiesList);
      }
    };

    fillEntities();
  }, []);

  const getDatabaseValue = (type) => {
    if (type === 'decaissements') {
      return 'Expenses';  // Return correct type for database query
    } else if (type === 'encaissements') {
      return 'Revenues';  // Return correct type for database query
    }
    return type;
  };
  
  useEffect(() => {
    const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
    const currentSummaryName = loadFromLocalStorage(organizationId, 'currentSummaryName').data;
    const currentEntityId = loadFromLocalStorage(organizationId, 'currentEntityId').data;

    if (organizationId) {
      const localFilters = loadFromLocalStorage(organizationId, 'selectedDetailsFilters');

      if (localFilters || currentSummaryName || currentEntityId) {
        const filters = localFilters.data;

        // Update selected categories
        setSelectedCategories([filters.selectedCategory] || []);

        // Update selected types
        if (filters.selectedType) {
          setSelectedTypes([getDatabaseValue(filters.selectedType)]);
        }

        setSelectedEntity(currentEntityId)
        
        // Update selected months
        setSelectedMonths([filters.selectedMonths] || []);

        // Update selected year
        setSelectedYear(filters.selectedYear || '');
      }

      setFiltersLoaded(true);
    }
  }, []);

  useEffect(() => {
    const fetchUnits = async () => {
      // Check if any valid filters are applied
      const hasValidFilters = 
        (selectedCategories.length > 0 || selectedTypes.length > 0) || 
        (selectedMonths.length > 0 && selectedYear);

      if (hasValidFilters) {
        const filters = {
          selectedCategories: selectedCategories,
          selectedTypes: selectedTypes.map((st) => { return st.toLowerCase()  }),
          selectedMonths: selectedMonths,
          selectedYear: selectedYear,
          months,
          selectedEntity
        };

        console.log("FILT FILT ", filters);
        const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
        const fetchedUnits = await fetchAllUnits(organizationId, filters);
        setAllUnits(fetchedUnits);
        setFilteredUnits(fetchedUnits);
      }
    };

    fetchUnits();
  }, [userId, filtersLoaded, selectedCategories, selectedTypes, selectedMonths, selectedYear]);

  const handleGenerateUnits = async () => {
    setOpenDialog(true);
  };

  const handleDialogClose = async (confirm) => {
    setOpenDialog(false);
    if (confirm) {
      const { newWorkUnits, newProductUnits } = generateRandomUnits(100, unitType);
      const combinedUnits = [...newWorkUnits, ...newProductUnits];

      setAllUnits([...allUnits, ...combinedUnits]);
      setFilteredUnits([...filteredUnits, ...combinedUnits]);

      for (const unit of combinedUnits) {
        const unitDate = unit.date;
        const year = unitDate.getFullYear();
        const month = months[unitDate.getMonth()];

        const organizationId = JSON.parse(localStorage.getItem('userData')).organizationId;
        
        await saveUnitToFirestore(organizationId, selectedEntity, unit, year.toString(), month); // Save with entity ID
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedUnits = filteredUnits.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalPages = Math.ceil(filteredUnits.length / rowsPerPage);

  const calculateTotal = () => {
    return filteredUnits.reduce((sum, unit) => sum + (parseFloat(unit.unitPrice) *  parseFloat(unit.quantity) || 0), 0).toFixed(2);
  };

  const handleGenerateSepaFile = () => {
    const expenseUnits = filteredUnits.filter(unit => unit.type === 'expenses');

    if (expenseUnits.length === 0) {
      alert(translate('No expenses found to generate SEPA XML.', language));
      return;
    }
    generateSepaXML(expenseUnits);
  };

  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleGenerateUnits}>
            {translate('Generate Units', language)}
          </Button>

          <FormControlLabel
            control={<Switch checked={showWorkUnits} onChange={() => setShowWorkUnits(!showWorkUnits)} />}
            label={showWorkUnits ? translate('Show Work Units', language) : translate('Show Product Units', language)}
            sx={{ marginTop: 2 }}
          />
        </Box>

        <FormControl fullWidth margin="normal" sx={{ marginTop: 2 }}>
          <InputLabel id="entity-select-label">{translate('Filter by Entity', language)}</InputLabel>
          <Select
            labelId="entity-select-label"
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
          >
            <MenuItem value="">{translate('All Entities', language)}</MenuItem>
            {entities.map((entity) => (
              <MenuItem key={entity.id} value={entity.id}>
                {entity.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Categories</InputLabel>
          <Select
            multiple
            value={selectedCategories}  // Ensure this is an array
            onChange={(e) => setSelectedCategories(e.target.value)}
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


        <FormControl fullWidth>
          <InputLabel>Types</InputLabel>
          <Select
            multiple
            value={selectedTypes}  // Ensure this is an array
            onChange={(e) => setSelectedTypes(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {['Revenues', 'Expenses'].map((type) => (
              <MenuItem key={type} value={type}>
                <Checkbox checked={selectedTypes.indexOf(type) > -1} />
                <ListItemText primary={type} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Months</InputLabel>
          <Select
            multiple
            value={selectedMonths}  // Ensure this is an array
            onChange={(e) => setSelectedMonths(e.target.value)}
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

        <TextField
          label={translate('Filter by Year', language)}
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginTop: 2 }}
        />

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

      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>{translate('Select Unit Type', language)}</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">{translate('Type', language)}</FormLabel>
            <RadioGroup
              aria-label="unit-type"
              name="unit-type"
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
            >
              <FormControlLabel value="revenues" control={<Radio />} label={translate('Revenues', language)} />
              <FormControlLabel value="expenses" control={<Radio />} label={translate('Expenses', language)} />
            </RadioGroup>
          </FormControl>

          <FormControl fullWidth margin="normal" sx={{ marginTop: 2 }}>
            <InputLabel id="entity-dialog-select-label">{translate('Select Entity', language)}</InputLabel>
            <Select
              labelId="entity-dialog-select-label"
              value={selectedEntity}
              onChange={(e) => setSelectedEntity(e.target.value)}
            >
              {entities.map((entity) => (
                <MenuItem key={entity.id} value={entity.id}>
                  {entity.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>{translate('Cancel', language)}</Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">{translate('Generate', language)}</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UnitGenerator;
