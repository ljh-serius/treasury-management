import React, { useState } from 'react';
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
} from '@mui/material';
import { format } from 'date-fns';

const categories = ['Category A', 'Category B', 'Category C'];

const generateRandomDate = () => {
  const end = new Date();
  const start = new Date(end.getFullYear() - 2, end.getMonth(), end.getDate());
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomUnits = (count) => {
  const newWorkUnits = [];
  const newProductUnits = [];
  for (let i = 0; i < count; i++) {
    const randomDate = generateRandomDate();
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const unit = {
      id: i + 1,
      description: `Unit ${i + 1}`,
      quantity: Math.floor(Math.random() * 100) + 1,
      unitPrice: (Math.random() * 100).toFixed(2),
      totalBeforeDiscount: (Math.random() * 1000).toFixed(2),
      finalAmount: (Math.random() * 900).toFixed(2),
      date: randomDate,
      category: randomCategory,
    };
    if (i % 2 === 0) {
      newWorkUnits.push({
        ...unit,
        type: 'Work',
        hoursWorked: (Math.random() * 10).toFixed(2),
        rate: (Math.random() * 50).toFixed(2),
      });
    } else {
      newProductUnits.push({
        ...unit,
        type: 'Product',
      });
    }
  }
  console.log("Generated Work Units:", newWorkUnits.length); // Debugging
  console.log("Generated Product Units:", newProductUnits.length); // Debugging
  return { newWorkUnits, newProductUnits };
};

const UnitGenerator = () => {
  const [workUnits, setWorkUnits] = useState([]);
  const [productUnits, setProductUnits] = useState([]);
  const [page, setPage] = useState(1);
  const [showWorkUnits, setShowWorkUnits] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  const rowsPerPage = 10;

  const handleGenerateUnits = () => {
    const { newWorkUnits, newProductUnits } = generateRandomUnits(100); // Adjust this number to ensure enough units are generated
    console.log(newWorkUnits)
    setWorkUnits([...workUnits, ...newWorkUnits]);
    setProductUnits([...productUnits, ...newProductUnits]);
    console.log("State Work Units:", workUnits.length); // Debugging
    console.log("State Product Units:", productUnits.length); // Debugging
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setPage(1); // Reset to first page when filtering
  };

  const filteredUnits = (showWorkUnits ? workUnits : productUnits).filter(
    (unit) => !selectedCategory || unit.category === selectedCategory
  );

  const paginatedUnits = filteredUnits.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const totalPages = Math.ceil(filteredUnits.length / rowsPerPage);

  console.log("Total Units:", filteredUnits.length); // Debugging
  console.log("Total Pages:", totalPages); // Debugging

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
          onChange={handleCategoryChange}
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
                <TableCell>Total Before Discount</TableCell>
                <TableCell>Final Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Category</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUnits.map((unit) => (
                <TableRow key={unit.id}>
                  <TableCell>{unit.id}</TableCell>
                  <TableCell>{unit.description}</TableCell>
                  <TableCell>{unit.type}</TableCell>
                  <TableCell>{unit.quantity}</TableCell>
                  <TableCell>{unit.unitPrice}€</TableCell>
                  {showWorkUnits && <TableCell>{unit.hoursWorked}</TableCell>}
                  {showWorkUnits && <TableCell>{unit.rate}€</TableCell>}
                  <TableCell>{unit.totalBeforeDiscount}€</TableCell>
                  <TableCell>{unit.finalAmount}€</TableCell>
                  <TableCell>{format(unit.date, 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{unit.category}</TableCell>
                </TableRow>
              ))}
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
    </Container>
  );
};

export default UnitGenerator;
