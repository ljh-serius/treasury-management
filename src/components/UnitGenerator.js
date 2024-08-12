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
} from '@mui/material';
import { format } from 'date-fns';
import { saveUnitToFirestore } from '../utils/firebaseHelpers';
import { auth, db } from '../utils/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';
import { collection, getDocs } from 'firebase/firestore';

const categories = ['Category A', 'Category B', 'Category C'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const generateRandomDate = () => {
  const end = new Date();
  const start = new Date(end.getFullYear() - 2, end.getMonth(), end.getDate());
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
      type: unitType, // Set the unit type based on the user's choice
    };
    unit.totalAmount = parseFloat(unit.unitPrice) * parseInt(unit.quantity); // Calculate total amount
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

const UnitGenerator = () => {
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
  const rowsPerPage = 10;

  const userId = auth.currentUser?.uid;

  const fetchAllUnits = async () => {
    const unitsSnapshot = await getDocs(collection(db, "users", userId, "transaction-units"));
    const units = unitsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setAllUnits(units);
    setFilteredUnits(units);
  };

  useEffect(() => {
    fetchAllUnits();
  }, [userId]);

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

      // Save generated units to Firestore
      for (const unit of combinedUnits) {
        await saveUnitToFirestore(userId, unit);
      }
    }
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleFilterChange = () => {
    let units = allUnits;

    if (selectedCategory) {
      units = units.filter((unit) => unit.category === selectedCategory);
    }

    if (selectedType) {
      units = units.filter((unit) => unit.type === selectedType);
    }

    if (selectedMonth) {
      units = units.filter((unit) => {
        const unitDate = new Date(unit.date.seconds * 1000);
        return unitDate.getMonth() === months.indexOf(selectedMonth);
      });
    }

    if (selectedYear) {
      units = units.filter((unit) => {
        const unitDate = new Date(unit.date.seconds * 1000);
        return unitDate.getFullYear() === parseInt(selectedYear);
      });
    }

    setFilteredUnits(units);
    setPage(1); // Reset to first page when filtering
  };

  useEffect(() => {
    handleFilterChange();
  }, [selectedCategory, selectedType, selectedMonth, selectedYear]);

  const paginatedUnits = filteredUnits.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalPages = Math.ceil(filteredUnits.length / rowsPerPage);

  const calculateTotal = () => {
    return filteredUnits.reduce((sum, unit) => sum + (parseFloat(unit.unitPrice * unit.quantity)  || 0), 0).toFixed(2);
  };
  
  return (
    <Container maxWidth="lg" sx={{ paddingTop: 3, paddingBottom: 7 }}>
      <Box sx={{ padding: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Button variant="contained" color="primary" onClick={handleGenerateUnits}>
            Generate Units
          </Button>

          <FormControlLabel
            control={<Switch checked={showWorkUnits} onChange={() => setShowWorkUnits(!showWorkUnits)} />}
            label={showWorkUnits ? 'Show Work Units' : 'Show Product Units'}
            sx={{ marginTop: 2 }}
          />
        </Box>

        <TextField
          select
          label="Filter by Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="">All Categories</MenuItem>
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Filter by Type"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="">All Types</MenuItem>
          <MenuItem value="revenues">Revenues</MenuItem>
          <MenuItem value="expenses">Expenses</MenuItem>
        </TextField>

        <TextField
          select
          label="Filter by Month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginTop: 2 }}
        >
          <MenuItem value="">All Months</MenuItem>
          {months.map((month) => (
            <MenuItem key={month} value={month}>
              {month}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Filter by Year"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          fullWidth
          margin="normal"
          sx={{ marginTop: 2 }}
        />

        <Typography variant="h6" sx={{ marginTop: 2 }}>
          Total: {calculateTotal()}€
        </Typography>
        const paginatedUnits = filteredUnits.slice((page - 1) * rowsPerPage, page * rowsPerPage);

      <TableContainer component={Paper} sx={{ marginTop: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Unit Price</TableCell>
              {showWorkUnits && <TableCell>Hours Worked</TableCell>}
              {showWorkUnits && <TableCell>Rate</TableCell>}
              <TableCell>Total Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedUnits.map((unit) => {
              // Safeguard: Ensure `unit.date` exists and is valid
              const unitDate = unit.date && unit.date.seconds ? new Date(unit.date.seconds * 1000) : null;

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
                    {unitDate ? format(unitDate, 'dd/MM/yyyy') : 'Invalid Date'}
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
      </Box>

      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>Select Unit Type</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Type</FormLabel>
            <RadioGroup
              aria-label="unit-type"
              name="unit-type"
              value={unitType}
              onChange={(e) => setUnitType(e.target.value)}
            >
              <FormControlLabel value="revenues" control={<Radio />} label="Revenues" />
              <FormControlLabel value="expenses" control={<Radio />} label="Expenses" />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)}>Cancel</Button>
          <Button onClick={() => handleDialogClose(true)} color="primary">Generate</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default UnitGenerator;
