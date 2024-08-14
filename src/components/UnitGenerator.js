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
} from '@mui/material';
import { format } from 'date-fns';
import { fetchAllUnits, saveUnitToFirestore } from '../utils/firebaseHelpers';
import { auth } from '../utils/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { translate } from '../utils/translate';
import { useTranslation } from '../utils/TranslationProvider';

const categories = [
  'Category A', 'Category B', 'Category C', 'Category D', 'Category E',
  'Category F', 'Category G', 'Category H', 'Category I', 'Category J'
];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateRandomDate = () => {
  const end = new Date();
  const start = new Date(end.getFullYear() - 15, end.getMonth(), end.getDate());
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomUnits = (count, unitType) => {
  const newWorkUnits = [];
  const newProductUnits = [];
  for (let i = 0; i < count; i++) {
    const randomDate = generateRandomDate();
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const unit = {
      id: uuidv4(),
      description: `Unit ${i + 1}`,
      quantity: Math.floor(Math.random() * 100) + 1,
      unitPrice: (Math.random() * 100).toFixed(2),
      date: randomDate,
      category: randomCategory,
      type: unitType,
    };
    unit.totalAmount = parseFloat(unit.unitPrice) * parseInt(unit.quantity);
    if (i % 2 === 0) {
      newWorkUnits.push({
        ...unit,
        hoursWorked: (Math.random() * 10).toFixed(2),
        rate: (Math.random() * 50).toFixed(2),
      });
    } else {
      newProductUnits.push(unit);
    }
  }
  return { newWorkUnits, newProductUnits };
};

const generateSepaXML = (units) => {
  const randomIBAN = () => 'FR' + Math.floor(1000000000000000 + Math.random() * 9000000000000000).toString();
  const randomBIC = () => 'ABCDEF' + Math.floor(100 + Math.random() * 900).toString();

  const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
  <Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.001.001.03">
    <CstmrCdtTrfInitn>
      <GrpHdr>
        <MsgId>${uuidv4()}</MsgId>
        <CreDtTm>${new Date().toISOString()}</CreDtTm>
        <NbOfTxs>${units.length}</NbOfTxs>
        <CtrlSum>${units.reduce((sum, unit) => sum + unit.totalAmount, 0).toFixed(2)}</CtrlSum>
        <InitgPty>
          <Nm>Your Company Name</Nm>
        </InitgPty>
      </GrpHdr>
      <PmtInf>
        <PmtInfId>${uuidv4()}</PmtInfId>
        <PmtMtd>TRF</PmtMtd>
        <BtchBookg>false</BtchBookg>
        <NbOfTxs>${units.length}</NbOfTxs>
        <CtrlSum>${units.reduce((sum, unit) => sum + unit.totalAmount, 0).toFixed(2)}</CtrlSum>
        <PmtTpInf>
          <SvcLvl>
            <Cd>SEPA</Cd>
          </SvcLvl>
        </PmtTpInf>
        <ReqdExctnDt>${new Date().toISOString().split('T')[0]}</ReqdExctnDt>
        <Dbtr>
          <Nm>Your Company Name</Nm>
          <PstlAdr>
            <Ctry>FR</Ctry>
            <AdrLine>Your Company Address</AdrLine>
          </PstlAdr>
        </Dbtr>
        <DbtrAcct>
          <Id>
            <IBAN>${randomIBAN()}</IBAN>
          </Id>
        </DbtrAcct>
        <DbtrAgt>
          <FinInstnId>
            <BIC>${randomBIC()}</BIC>
          </FinInstnId>
        </DbtrAgt>
        <ChrgBr>SLEV</ChrgBr>
        <CdtTrfTxInf>`;

  const xmlTransactions = units.map((unit) => {
    const beneficiaryIBAN = randomIBAN();
    const beneficiaryBIC = randomBIC();
    const endToEndId = uuidv4();

    return `
          <PmtId>
            <EndToEndId>${endToEndId}</EndToEndId>
          </PmtId>
          <Amt>
            <InstdAmt Ccy="EUR">${unit.totalAmount.toFixed(2)}</InstdAmt>
          </Amt>
          <CdtrAgt>
            <FinInstnId>
              <BIC>${beneficiaryBIC}</BIC>
            </FinInstnId>
          </CdtrAgt>
          <Cdtr>
            <Nm>${unit.description}</Nm>
          </Cdtr>
          <CdtrAcct>
            <Id>
              <IBAN>${beneficiaryIBAN}</IBAN>
            </Id>
          </CdtrAcct>
          <RmtInf>
            <Ustrd>${unit.category}</Ustrd>
          </RmtInf>`;
  }).join('');

  const xmlFooter = `        </CdtTrfTxInf>
      </PmtInf>
    </CstmrCdtTrfInitn>
  </Document>`;

  const sepaXML = `${xmlHeader}${xmlTransactions}${xmlFooter}`;

  const blob = new Blob([sepaXML], { type: 'application/xml' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.download = `SEPA_Expenses_${new Date().toISOString().split('T')[0]}.xml`;
  link.click();
};

const UnitGenerator = () => {
  const { language } = useTranslation();
  const [allUnits, setAllUnits] = useState([]);
  const [filteredUnits, setFilteredUnits] = useState([]);
  const [page, setPage] = useState(1);
  const [showWorkUnits, setShowWorkUnits] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [unitType, setUnitType] = useState('revenues');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [filtersLoaded, setFiltersLoaded] = useState(false);
  const rowsPerPage = 10;

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
    if (userId) {
      console.log("loading filters")
      const localFilters = loadFromLocalStorage(userId, 'selectedDetailsFilters');

      console.log(localFilters)
      if (localFilters) {
        const filters = localFilters.data;

        let type = '';
        if (filters.selectedType === 'encaissements') {
          type = 'revenues';
        } else if (filters.selectedType === 'decaissements') {
          type = 'expenses';
        }

        setSelectedCategory(filters.selectedCategory || '');
        setSelectedType(type);
        setSelectedMonths(filters.selectedMonths || []);
        setSelectedYear(filters.selectedYear || '');
      }
      setFiltersLoaded(true);
    }
  }, [userId]);

  useEffect(() => {
    const fetchUnits = async () => {
      if (filtersLoaded) {
        const hasValidFilters = selectedCategory || selectedType || (selectedMonths.length > 0 && selectedYear);

        if (hasValidFilters) {
          const filters = {
            selectedCategory,
            selectedType,
            selectedMonths,
            selectedYear,
            months
          };

          const organizationId = localStorage.getItem('organizationId')

          const fetchedUnits = await fetchAllUnits(organizationId, filters);
          setAllUnits(fetchedUnits);
          setFilteredUnits(fetchedUnits);
        }
      }
    };

    fetchUnits();
  }, [userId, filtersLoaded, selectedCategory, selectedType, selectedMonths, selectedYear]);

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

        const organizationId = localStorage.getItem('organizationId');
        
        await saveUnitToFirestore(organizationId, unit, year.toString(), month);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const paginatedUnits = filteredUnits.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalPages = Math.ceil(filteredUnits.length / rowsPerPage);

  const calculateTotal = () => {
    return filteredUnits.reduce((sum, unit) => sum + (parseFloat(unit.unitPrice * unit.quantity) || 0), 0).toFixed(2);
  };

  const handleGenerateSepaFile = () => {
    const expenseUnits = filteredUnits.filter(unit => unit.type === 'expenses');
    console.log('Filtered expense units:', expenseUnits);

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

        <TextField
          select
          label={translate('Filter by Category', language)}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="">{translate('All Categories', language)}</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label={translate('Filter by Type', language)}
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="">{translate('All Types', language)}</MenuItem>
          <MenuItem value="revenues">{translate('Revenues', language)}</MenuItem>
          <MenuItem value="expenses">{translate('Expenses', language)}</MenuItem>
        </TextField>

        <FormControl fullWidth margin="normal" sx={{ marginTop: 2 }}>
          <InputLabel id="month-select-label">{translate('Filter by Month', language)}</InputLabel>
          <Select
            labelId="month-select-label"
            multiple
            value={selectedMonths}
            onChange={(e) => setSelectedMonths(e.target.value)}
            renderValue={(selected) => selected.join(', ')}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {translate(month, language)}
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
