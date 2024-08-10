import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap'; // Import heatmap module
import Header from './Header';
import {
  calculateBudgetSummary,
  calculateTotals,
} from './transactionHelpers';

// Initialize the heatmap module
heatmap(Highcharts);

const AnalyticsPage = () => {
  const [books, setBooks] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [bookOptions, setBookOptions] = useState([]);
  const [pieChartOptions, setPieChartOptions] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});
  const [barChartOptions, setBarChartOptions] = useState({});
  const [heatmapOptions, setHeatmapOptions] = useState({});

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || {};
    setBooks(savedBooks);
    setBookOptions(Object.keys(savedBooks));
  }, []);

  useEffect(() => {
    if (selectedBooks.length) {
      console.log(selectedBooks)
      const options = generateChartOptions(selectedBooks);
      setChartOptions(options);

      const pieOptions = generatePieChartOptions(selectedBooks);
      setPieChartOptions(pieOptions);

      const lineOptions = generateLineChartOptions(selectedBooks);
      setLineChartOptions(lineOptions);

      const barOptions = generateBarChartOptions(selectedBooks);
      setBarChartOptions(barOptions);

      const heatmapOptions = generateHeatmapOptions(selectedBooks);
      setHeatmapOptions(heatmapOptions);
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

    booksToAnalyze.forEach((bookName) => {
      console.log(books[bookName]);
      const summary = calculateBudgetSummary(calculateTotals(books[bookName]));
      initialBalances[bookName] = summary.initialBalance;
      totalEncaissements[bookName] = summary.totalEncaissements;
      totalDecaissements[bookName] = summary.totalDecaissements;
      finalTreasuries[bookName] = summary.finalTreasury;
    });

    return {
      title: {
        text: 'Comparative Analysis of Budget Summaries',
      },
      xAxis: {
        categories: booksToAnalyze,
        title: {
          text: 'Books',
        },
      },
      yAxis: {
        title: {
          text: 'Amount',
        },
        min: 0,
      },
      series: [
        {
          name: 'Initial Balance',
          data: booksToAnalyze.map((bookName) => initialBalances[bookName]),
          type: 'column',
          color: '#007bff', // Blue
          dataLabels: { enabled: true },
        },
        {
          name: 'Total Encaissements',
          data: booksToAnalyze.map((bookName) => totalEncaissements[bookName]),
          type: 'column',
          color: '#28a745', // Green
          dataLabels: { enabled: true },
        },
        {
          name: 'Total Decaissements',
          data: booksToAnalyze.map((bookName) => totalDecaissements[bookName]),
          type: 'column',
          color: '#dc3545', // Red
          dataLabels: { enabled: true },
        },
        {
          name: 'Final Treasury',
          data: booksToAnalyze.map((bookName) => finalTreasuries[bookName]),
          type: 'column',
          color: '#ffc107', // Yellow
          dataLabels: { enabled: true },
        },
      ],
      credits: {
        enabled: false,
      },
    };
  };

  const generatePieChartOptions = (booksToAnalyze) => {
    const encaissementsData = {};
    const decaissementsData = {};
  
    booksToAnalyze.forEach((bookName) => {
      const book = books[bookName];
  
      // Process encaissements
      book.encaissements.forEach((enc) => {
        encaissementsData[enc.nature] = encaissementsData[enc.nature] || 0;
        const sumMontants = enc.montants.reduce((a, b) => a + b, 0);
        encaissementsData[enc.nature] += sumMontants;
      });
  
      // Process decaissements
      book.decaissements.forEach((dec) => {
        decaissementsData[dec.nature] = decaissementsData[dec.nature] || 0;
        const sumMontants = dec.montants.reduce((a, b) => a + b, 0);
        decaissementsData[dec.nature] += sumMontants;
      });
    });
  
    return {
      encaissements: {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Encaissements Breakdown',
        },
        series: [
          {
            name: 'Encaissements',
            data: Object.entries(encaissementsData).map(([name, value]) => ({
              name,
              y: value,
            })),
            dataLabels: { enabled: true },
          },
        ],
        credits: { enabled: false },
      },
      decaissements: {
        chart: {
          type: 'pie',
        },
        title: {
          text: 'Decaissements Breakdown',
        },
        series: [
          {
            name: 'Decaissements',
            data: Object.entries(decaissementsData).map(([name, value]) => ({
              name,
              y: value,
            })),
            dataLabels: { enabled: true },
          },
        ],
        credits: { enabled: false },
      },
    };
  };
  
  const generateLineChartOptions = (booksToAnalyze) => {
    const timeSeriesData = {};
  
    booksToAnalyze.forEach((bookName) => {
      const book = books[bookName];
  
      book.encaissements.forEach((enc) => {
        enc.montants.forEach((amount, month) => {
          timeSeriesData[month] = timeSeriesData[month] || { encaissements: 0, decaissements: 0 };
          timeSeriesData[month].encaissements += amount;
        });
      });
  
      book.decaissements.forEach((dec) => {
        dec.montants.forEach((amount, month) => {
          timeSeriesData[month].decaissements += amount;
        });
      });
    });
  
    const months = Object.keys(timeSeriesData).sort();
    const encaissementsSeries = months.map(month => timeSeriesData[month].encaissements);
    const decaissementsSeries = months.map(month => timeSeriesData[month].decaissements);
  
    return {
      chart: { type: 'line' },
      title: { text: 'Treasury Evolution Over Time' },
      xAxis: {
        categories: months.map(m => `Month ${+m + 1}`),
        title: { text: 'Time' },
      },
      yAxis: { title: { text: 'Amount' }, min: 0 },
      series: [
        {
          name: 'Total Encaissements',
          data: encaissementsSeries,
          type: 'line',
          color: '#28a745',
        },
        {
          name: 'Total Decaissements',
          data: decaissementsSeries,
          type: 'line',
          color: '#dc3545',
        },
      ],
      credits: { enabled: false },
    };
  };
  const generateBarChartOptions = (booksToAnalyze) => {
    const monthlyTotals = {};
  
    booksToAnalyze.forEach((bookName) => {
      const book = books[bookName];
  
      // Process encaissements
      book.encaissements.forEach((enc) => {
        enc.montants.forEach((amount, month) => {
          monthlyTotals[month] = monthlyTotals[month] || {
            encaissements: 0,
            decaissements: 0,
          };
          monthlyTotals[month].encaissements += amount;
        });
      });
  
      // Process decaissements
      book.decaissements.forEach((dec) => {
        dec.montants.forEach((amount, month) => {
          monthlyTotals[month] = monthlyTotals[month] || {
            encaissements: 0,
            decaissements: 0,
          };
          monthlyTotals[month].decaissements += amount;
        });
      });
    });
  
    const months = Object.keys(monthlyTotals).sort();
  
    return {
      chart: { type: 'column' },
      title: { text: 'Monthly Totals' },
      xAxis: {
        categories: months.map((month) => `Month ${+month + 1}`),
        title: { text: 'Month' },
      },
      yAxis: { title: { text: 'Amount' }, min: 0 },
      series: [
        {
          name: 'Total Encaissements',
          data: months.map((month) => monthlyTotals[month].encaissements),
          color: '#28a745', // Green
        },
        {
          name: 'Total Decaissements',
          data: months.map((month) => monthlyTotals[month].decaissements),
          color: '#dc3545', // Red
        },
      ],
      credits: { enabled: false },
    };
  };
  

  const generateHeatmapOptions = (booksToAnalyze) => {
    const heatmapData = [];
  
    booksToAnalyze.forEach((bookName, bookIndex) => {
      const book = books[bookName];
  
      book.encaissements.forEach((enc) => {
        enc.montants.forEach((amount, month) => {
          heatmapData.push([bookIndex, month, amount]);
        });
      });
  
      book.decaissements.forEach((dec) => {
        dec.montants.forEach((amount, month) => {
          heatmapData.push([bookIndex, month, -amount]); // Negative for decaissements
        });
      });
    });
  
    return {
      chart: { type: 'heatmap' },
      title: { text: 'Monthly Transaction Heatmap' },
      xAxis: {
        categories: booksToAnalyze,
        title: { text: 'Books' },
      },
      yAxis: {
        categories: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
        title: { text: 'Month' },
      },
      colorAxis: {
        min: -Math.max(...heatmapData.map(data => Math.abs(data[2]))),
        minColor: '#dc3545',
        maxColor: '#28a745',
      },
      series: [
        {
          name: 'Transactions',
          borderWidth: 1,
          data: heatmapData,
        },
      ],
      credits: { enabled: false },
    };
  };
  

  return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 12 }}>
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
          {bookOptions.map((book) => (
            <MenuItem key={book} value={book}>
              <Checkbox checked={selectedBooks.indexOf(book) > -1} />
              <ListItemText primary={book} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box mt={4}>
        {Object.keys(chartOptions).length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </Box>

      <Box mt={4}>
        {Object.keys(pieChartOptions).length > 0 && (
          <>
            <HighchartsReact
              highcharts={Highcharts}
              options={pieChartOptions.encaissements}
            />
            <HighchartsReact
              highcharts={Highcharts}
              options={pieChartOptions.decaissements}
            />
          </>
        )}
      </Box>

      <Box mt={4}>
        {Object.keys(lineChartOptions).length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        )}
      </Box>

      <Box mt={4}>
        {Object.keys(barChartOptions).length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
        )}
      </Box>

      <Box mt={4}>
        {Object.keys(heatmapOptions).length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={heatmapOptions} />
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
                {selectedBooks.map((bookName) => {
                  const summary = calculateBudgetSummary(
                    calculateTotals(books[bookName])
                  );
                  return (
                    <TableRow key={bookName}>
                      <TableCell>{bookName}</TableCell>
                      <TableCell>{summary.initialBalance.toFixed(2)}</TableCell>
                      <TableCell>
                        {summary.totalEncaissements.toFixed(2)}
                      </TableCell>
                      <TableCell>
                        {summary.totalDecaissements.toFixed(2)}
                      </TableCell>
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
