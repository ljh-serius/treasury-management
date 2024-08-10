import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { AppBar, Toolbar, Button  } from '@mui/material';
import { Link } from 'react-router-dom';
import Header from './Header';

// Define month names
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const AnalyticsPage = () => {
  const [books, setBooks] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [bookOptions, setBookOptions] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setBooks(savedBooks);
    setBookOptions(Object.keys(savedBooks));
  }, []);

  useEffect(() => {
    if (selectedBooks.length) {
      const options = generateChartOptions(selectedBooks);
      setChartOptions(options);
    }
  }, [selectedBooks, books]);

  const handleBookChange = (event) => {
    setSelectedBooks(event.target.value);
  };

  const generateChartOptions = (booksToAnalyze) => {
    const initialEncaissements = {};
    const totalMonthlyEncaissements = {};
    const initialDecaissements = {};
    const totalMonthlyDecaissements = {};

    booksToAnalyze.forEach(bookName => {
      const book = books[bookName];
      let initialIncome = 0;
      let monthlyIncome = 0;
      let initialExpense = 0;
      let monthlyExpense = 0;

      // Handle encaissements
      const encaissementTotal = book.encaissements.find(e => e.nature === 'Total Encaissements') || { montantInitial: 0, montants: [] };
      initialIncome = encaissementTotal.montantInitial || 0;
      monthlyIncome = encaissementTotal.montants.reduce((a, b) => a + b, 0);

      // Handle décaissements
      const decaissementTotal = book.decaissements.find(d => d.nature === 'Total Decaissements') || { montantInitial: 0, montants: [] };
      initialExpense = decaissementTotal.montantInitial || 0;
      monthlyExpense = decaissementTotal.montants.reduce((a, b) => a + b, 0);

      // Store results
      initialEncaissements[bookName] = initialIncome;
      totalMonthlyEncaissements[bookName] = monthlyIncome;
      initialDecaissements[bookName] = initialExpense;
      totalMonthlyDecaissements[bookName] = monthlyExpense;
    });

    return {
      title: {
        text: 'Comparative Analysis of Transaction Books'
      },
      xAxis: {
        categories: booksToAnalyze,
        title: {
          text: 'Books'
        }
      },
      yAxis: {
        title: {
          text: 'Amount'
        },
        min: 0
      },
      series: [
        {
          name: 'Initial Encaissements',
          data: booksToAnalyze.map(bookName => initialEncaissements[bookName]),
          type: 'column',
          color: '#28a745', // Green
          dataLabels: { enabled: true }
        },
        {
          name: 'Monthly Encaissements',
          data: booksToAnalyze.map(bookName => totalMonthlyEncaissements[bookName]),
          type: 'column',
          color: '#6c757d', // Gray
          dataLabels: { enabled: true }
        },
        {
          name: 'Initial Décaissements',
          data: booksToAnalyze.map(bookName => initialDecaissements[bookName]),
          type: 'column',
          color: '#dc3545', // Red
          dataLabels: { enabled: true }
        },
        {
          name: 'Monthly Décaissements',
          data: booksToAnalyze.map(bookName => totalMonthlyDecaissements[bookName]),
          type: 'column',
          color: '#adb5bd', // Light Gray
          dataLabels: { enabled: true }
        }
      ],
      credits: {
        enabled: false
      }
    };
  };

  return (
    <Container mt={15}>
        <Header
        showTransactionControls={false}
        ></Header>
        <Typography variant="h4" gutterBottom>
            Comparative Analytics
        </Typography>

      <FormControl fullWidth margin="normal">
        <InputLabel>Select Books</InputLabel>
        <Select
          multiple
          value={selectedBooks}
          onChange={handleBookChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {bookOptions.map(book => (
            <MenuItem key={book} value={book}>
              <Checkbox checked={selectedBooks.indexOf(book) > -1} />
              <ListItemText primary={book} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={4}>
        {Object.keys(chartOptions).length > 0 && (
          <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
          />
        )}
      </Box>

      {selectedBooks.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Comparative Analysis Table
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Book</TableCell>
                  <TableCell>Initial Encaissements</TableCell>
                  <TableCell>Monthly Encaissements</TableCell>
                  <TableCell>Initial Décaissements</TableCell>
                  <TableCell>Monthly Décaissements</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBooks.map(bookName => {
                  const book = books[bookName];
                  const encaissementTotal = book.encaissements.find(e => e.nature === 'Total Encaissements') || { montantInitial: 0, montants: [] };
                  const decaissementTotal = book.decaissements.find(d => d.nature === 'Total Decaissements') || { montantInitial: 0, montants: [] };

                  const initialIncome = encaissementTotal.montantInitial || 0;
                  const monthlyIncome = encaissementTotal.montants.reduce((a, b) => a + b, 0);
                  const initialExpense = decaissementTotal.montantInitial || 0;
                  const monthlyExpense = decaissementTotal.montants.reduce((a, b) => a + b, 0);

                  return (
                    <TableRow key={bookName}>
                      <TableCell>{bookName}</TableCell>
                      <TableCell>{initialIncome.toFixed(2)}</TableCell>
                      <TableCell>{monthlyIncome.toFixed(2)}</TableCell>
                      <TableCell>{initialExpense.toFixed(2)}</TableCell>
                      <TableCell>{monthlyExpense.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Container>
  );
};

export default AnalyticsPage;