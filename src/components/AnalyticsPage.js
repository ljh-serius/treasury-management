import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import Header from './Header';
import {
    calculateBudgetSummary,
    calculateTotals
  } from './transactionHelpers';
  
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
    const initialBalances = {};
    const totalEncaissements = {};
    const totalDecaissements = {};
    const finalTreasuries = {};

    booksToAnalyze.forEach(bookName => {
      const summary = calculateBudgetSummary(calculateTotals(books[bookName]));
      initialBalances[bookName] = summary.initialBalance;
      totalEncaissements[bookName] = summary.totalEncaissements;
      totalDecaissements[bookName] = summary.totalDecaissements;
      finalTreasuries[bookName] = summary.finalTreasury;
    });

    return {
      title: {
        text: 'Comparative Analysis of Budget Summaries'
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
          name: 'Initial Balance',
          data: booksToAnalyze.map(bookName => initialBalances[bookName]),
          type: 'column',
          color: '#007bff', // Blue
          dataLabels: { enabled: true }
        },
        {
          name: 'Total Encaissements',
          data: booksToAnalyze.map(bookName => totalEncaissements[bookName]),
          type: 'column',
          color: '#28a745', // Green
          dataLabels: { enabled: true }
        },
        {
          name: 'Total Decaissements',
          data: booksToAnalyze.map(bookName => totalDecaissements[bookName]),
          type: 'column',
          color: '#dc3545', // Red
          dataLabels: { enabled: true }
        },
        {
          name: 'Final Treasury',
          data: booksToAnalyze.map(bookName => finalTreasuries[bookName]),
          type: 'column',
          color: '#ffc107', // Yellow
          dataLabels: { enabled: true }
        }
      ],
      credits: {
        enabled: false
      }
    };
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 12 }}>
        <Header showTransactionControls={false} />
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
                  <TableCell>Initial Balance</TableCell>
                  <TableCell>Total Encaissements</TableCell>
                  <TableCell>Total Decaissements</TableCell>
                  <TableCell>Final Treasury</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBooks.map(bookName => {
                  const summary = calculateBudgetSummary(calculateTotals(books[bookName]));
                  return (
                    <TableRow key={bookName}>
                      <TableCell>{bookName}</TableCell>
                      <TableCell>{summary.initialBalance.toFixed(2)}</TableCell>
                      <TableCell>{summary.totalEncaissements.toFixed(2)}</TableCell>
                      <TableCell>{summary.totalDecaissements.toFixed(2)}</TableCell>
                      <TableCell>{summary.finalTreasury.toFixed(2)}</TableCell>
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
