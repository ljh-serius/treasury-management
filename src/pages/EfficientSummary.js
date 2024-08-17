import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Container, Box, CircularProgress, Typography } from '@mui/material';
import { faker } from '@faker-js/faker';

// Updated function to generate more invoices using faker.js
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

    if (!groupedData[year]) groupedData[year] = {};
    if (!groupedData[year][invoiceType]) groupedData[year][invoiceType] = {};
    if (!groupedData[year][invoiceType][category]) {
      groupedData[year][invoiceType][category] = {
        initialBalance: 0,
        amounts: Array(12).fill(0), // Initialize the array for 12 months with 0
        total: 0
      };
    }

    groupedData[year][invoiceType][category].amounts[month] += amount;
    groupedData[year][invoiceType][category].total += amount;
  });

  return groupedData;
}

// Function to calculate total expenses and revenues, and transform grouped data into rows
function transformGroupedData(groupedData) {
  const rows = [];

  // Iterate through each year
  Object.keys(groupedData).forEach(year => {
    let totalExpenses = Array(12).fill(0);
    let totalRevenues = Array(12).fill(0);
    let totalExpenseAnnual = 0;
    let totalRevenueAnnual = 0;

    // Calculate totals for expenses and revenues
    Object.keys(groupedData[year]).forEach(invoiceType => {
      Object.keys(groupedData[year][invoiceType]).forEach(category => {
        const data = groupedData[year][invoiceType][category];

        // Add the regular rows
        rows.push({
          id: `${year}-${invoiceType}-${category}`, // Create a unique ID
          store: 'All Stores',
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

    // Add a single Total Expenses Row (for all stores and categories)
    rows.push({
      id: `TotalExpenses-${year}`,
      store: 'All Stores',
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

    // Add a single Total Revenues Row (for all stores and categories)
    rows.push({
      id: `TotalRevenues-${year}`,
      store: 'All Stores',
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

  return rows;
}

const InvoicesPage = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const data = await fetchInvoices();
        const groupedData = groupInvoicesByStoreYearMonth(data);
        const transformedData = transformGroupedData(groupedData);
        setInvoices(transformedData);
      } catch (error) {
        console.error("Failed to fetch invoices:", error);
      } finally {
        setLoading(false);
      }
    };

    loadInvoices();
  }, []);

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
      <Box sx={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={invoices}
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
