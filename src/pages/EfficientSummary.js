import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, CircularProgress, Typography, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, OutlinedInput, Button } from '@mui/material';
import { faker } from '@faker-js/faker';

const fetchInvoices = async () => {
  const stores = ["Store A", "Store B", "Store C"];
  const categories = ["Utilities", "Rent", "Salaries", "Supplies", "Maintenance"];
  const invoiceTypes = ["issued", "received"];

  const invoices = [];

  for (let i = 0; i < 100; i++) {
    const date = faker.date.between('2022-01-01', '2023-12-31');
    const store = faker.helpers.arrayElement(stores);
    const category = faker.helpers.arrayElement(categories);
    const invoiceType = faker.helpers.arrayElement(invoiceTypes);
    const amount = faker.finance.amount(100, 10000, 2);

    invoices.push({
      id: i + 1,
      date: date.toISOString(),
      amount: parseFloat(amount),
      category,
      invoiceType,
      store
    });
  }

  return invoices;
};

// Function to group invoices by store, year, month, etc.
function groupInvoicesByStoreYearMonth(invoices) {
  const groupedData = {};

  invoices.forEach(invoice => {
    const date = new Date(invoice.date);
    const year = date.getFullYear();
    const month = date.getMonth(); // JavaScript months are 0-indexed (0 = January, 11 = December)
    const { store, invoiceType, category, amount } = invoice;

    if (!groupedData[store]) groupedData[store] = {};
    if (!groupedData[store][year]) groupedData[store][year] = {};
    if (!groupedData[store][year][invoiceType]) groupedData[store][year][invoiceType] = {};
    if (!groupedData[store][year][invoiceType][category]) {
      groupedData[store][year][invoiceType][category] = {
        initialBalance: 0,
        amounts: Array(12).fill(0), // Initialize the array for 12 months with 0
        total: 0
      };
    }

    groupedData[store][year][invoiceType][category].amounts[month] += amount;
    groupedData[store][year][invoiceType][category].total += amount;
  });

  return groupedData;
}

// Function to calculate total expenses and revenues, and transform grouped data into rows
function transformGroupedData(groupedData) {
  const rows = [];

  // Iterate through each store and year
  Object.keys(groupedData).forEach(store => {
    Object.keys(groupedData[store]).forEach(year => {
      let totalExpenses = Array(12).fill(0);
      let totalRevenues = Array(12).fill(0);
      let totalExpenseAnnual = 0;
      let totalRevenueAnnual = 0;

      // Calculate totals for expenses and revenues
      Object.keys(groupedData[store][year]).forEach(invoiceType => {
        Object.keys(groupedData[store][year][invoiceType]).forEach(category => {
          const data = groupedData[store][year][invoiceType][category];

          // Add the regular rows
          rows.push({
            id: `${store}-${year}-${invoiceType}-${category}`, // Create a unique ID
            store,
            year,
            invoiceType,
            category,
            initialBalance: data.initialBalance,
            total: data.total,
            January: data.amounts[0],
            February: data.amounts[1],
            March: data.amounts[2],
            April: data.amounts[3],
            May: data.amounts[4],
            June: data.amounts[5],
            July: data.amounts[6],
            August: data.amounts[7],
            September: data.amounts[8],
            October: data.amounts[9],
            November: data.amounts[10],
            December: data.amounts[11],
          });

          // Accumulate totals for expenses and revenues
          if (invoiceType === 'received') {
            data.amounts.forEach((amount, month) => {
              totalExpenses[month] += amount;
            });
            totalExpenseAnnual += data.total;
          }

          if (invoiceType === 'issued') {
            data.amounts.forEach((amount, month) => {
              totalRevenues[month] += amount;
            });
            totalRevenueAnnual += data.total;
          }
        });
      });

      // Add a single Total Expenses Row for this store and year
      rows.push({
        id: `TotalExpenses-${store}-${year}`,
        store,
        year,
        invoiceType: '',
        category: 'Total Expenses',
        initialBalance: 0,
        total: totalExpenseAnnual,
        January: totalExpenses[0],
        February: totalExpenses[1],
        March: totalExpenses[2],
        April: totalExpenses[3],
        May: totalExpenses[4],
        June: totalExpenses[5],
        July: totalExpenses[6],
        August: totalExpenses[7],
        September: totalExpenses[8],
        October: totalExpenses[9],
        November: totalExpenses[10],
        December: totalExpenses[11],
      });

      // Add a single Total Revenues Row for this store and year
      rows.push({
        id: `TotalRevenues-${store}-${year}`,
        store,
        year,
        invoiceType: '',
        category: 'Total Revenues',
        initialBalance: 0,
        total: totalRevenueAnnual,
        January: totalRevenues[0],
        February: totalRevenues[1],
        March: totalRevenues[2],
        April: totalRevenues[3],
        May: totalRevenues[4],
        June: totalRevenues[5],
        July: totalRevenues[6],
        August: totalRevenues[7],
        September: totalRevenues[8],
        October: totalRevenues[9],
        November: totalRevenues[10],
        December: totalRevenues[11],
      });
    });
  });

  return rows;
}

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredRows, setFilteredRows] = useState([]);
  const [filters, setFilters] = useState({
    stores: [],
    years: [],
    invoiceTypes: [],
    categories: [],
  });

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        const groupedData = groupInvoicesByStoreYearMonth(data);
        const transformedData = transformGroupedData(groupedData);
        setInvoices(transformedData);
        setFilteredRows(transformedData);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInvoices();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    const filteredData = invoices.filter(row => {
      const matchStore = filters.stores.length === 0 || filters.stores.includes(row.store);
      const matchYear = filters.years.length === 0 || filters.years.includes(row.year);
      const matchInvoiceType = filters.invoiceTypes.length === 0 || filters.invoiceTypes.includes(row.invoiceType) || row.invoiceType === ''; // Always show total rows
      const matchCategory = filters.categories.length === 0 || filters.categories.includes(row.category) || ['Total Revenues', 'Total Expenses'].includes(row.category); // Always show total rows
      return matchStore && matchYear && matchInvoiceType && matchCategory;
    });

    setFilteredRows(filteredData);
  };

  const columns = [
    { field: 'store', headerName: 'Store', width: 150 },
    { field: 'year', headerName: 'Year', width: 100 },
    { field: 'invoiceType', headerName: 'Invoice Type', width: 150 },
    { field: 'category', headerName: 'Category', width: 150 },
    { field: 'initialBalance', headerName: 'Initial Balance', width: 150, type: 'number' },
    { field: 'total', headerName: 'Total Amount', width: 150, type: 'number' },
    { field: 'January', headerName: 'January', width: 100, type: 'number' },
    { field: 'February', headerName: 'February', width: 100, type: 'number' },
    { field: 'March', headerName: 'March', width: 100, type: 'number' },
    { field: 'April', headerName: 'April', width: 100, type: 'number' },
    { field: 'May', headerName: 'May', width: 100, type: 'number' },
    { field: 'June', headerName: 'June', width: 100, type: 'number' },
    { field: 'July', headerName: 'July', width: 100, type: 'number' },
    { field: 'August', headerName: 'August', width: 100, type: 'number' },
    { field: 'September', headerName: 'September', width: 100, type: 'number' },
    { field: 'October', headerName: 'October', width: 100, type: 'number' },
    { field: 'November', headerName: 'November', width: 100, type: 'number' },
    { field: 'December', headerName: 'December', width: 100, type: 'number' },
  ];

  const uniqueStores = [...new Set(invoices.map(row => row.store))];
  const uniqueYears = [...new Set(invoices.map(row => row.year))];
  const uniqueInvoiceTypes = [...new Set(invoices.map(row => row.invoiceType).filter(type => type !== ''))];
  const uniqueCategories = [...new Set(invoices.map(row => row.category).filter(category => category !== 'Total Revenues' && category !== 'Total Expenses'))];

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!invoices.length) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Typography variant="h6" component="div" textAlign="center">
          No invoices found.
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Box sx={{ mb: 3 }}>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel>Store</InputLabel>
          <Select
            multiple
            name="stores"
            value={filters.stores}
            onChange={handleFilterChange}
            input={<OutlinedInput label="Store" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {uniqueStores.map((store) => (
              <MenuItem key={store} value={store}>
                <Checkbox checked={filters.stores.indexOf(store) > -1} />
                <ListItemText primary={store} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel>Year</InputLabel>
          <Select
            multiple
            name="years"
            value={filters.years}
            onChange={handleFilterChange}
            input={<OutlinedInput label="Year" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {uniqueYears.map((year) => (
              <MenuItem key={year} value={year}>
                <Checkbox checked={filters.years.indexOf(year) > -1} />
                <ListItemText primary={year} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel>Invoice Type</InputLabel>
          <Select
            multiple
            name="invoiceTypes"
            value={filters.invoiceTypes}
            onChange={handleFilterChange}
            input={<OutlinedInput label="Invoice Type" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {uniqueInvoiceTypes.map((invoiceType) => (
              <MenuItem key={invoiceType} value={invoiceType}>
                <Checkbox checked={filters.invoiceTypes.indexOf(invoiceType) > -1} />
                <ListItemText primary={invoiceType} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, width: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            multiple
            name="categories"
            value={filters.categories}
            onChange={handleFilterChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(', ')}
          >
            {uniqueCategories.map((category) => (
              <MenuItem key={category} value={category}>
                <Checkbox checked={filters.categories.indexOf(category) > -1} />
                <ListItemText primary={category} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={applyFilters} sx={{ m: 1 }}>
          Apply Filters
        </Button>
      </Box>

      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10, 20, 50]}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </Container>
  );
};

export default InvoicesPage;
