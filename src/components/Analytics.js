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
  Grid
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';
import {
  calculateBudgetSummary,
  calculateTotals,
} from './transactionHelpers';
import {
  getAllTransactionSummaries
} from '../utils/firebaseHelpers';
import { auth } from '../utils/firebaseConfig';

// Initialize the heatmap module
heatmap(Highcharts);

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Utility to get the current time
const getCurrentTime = () => new Date().getTime();

// Utility to check if data should be refetched
const shouldRefetchData = (lastFetchTime, intervalInMs = 3600000) => {
  const currentTime = getCurrentTime();
  return !lastFetchTime || (currentTime - lastFetchTime) > intervalInMs;
};

// Utility to store data in localStorage
const saveToLocalStorage = (key, data) => {
  const dataToStore = {
    timestamp: getCurrentTime(),
    data
  };
  localStorage.setItem(key, JSON.stringify(dataToStore));
};

// Utility to load data from localStorage
const loadFromLocalStorage = (key) => {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

const Analytics = () => {
  const [books, setBooks] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [bookOptions, setBookOptions] = useState([]);
  const [pieChartOptions, setPieChartOptions] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});
  const [barChartOptions, setBarChartOptions] = useState({});
  const [heatmapOptions, setHeatmapOptions] = useState({});
  const userId = auth.currentUser?.uid;

  useEffect(() => {
    const fetchBooks = async () => {
      const localStorageKey = 'transactionSummaries';
      const storedData = loadFromLocalStorage(localStorageKey);

      if (storedData && !shouldRefetchData(storedData.timestamp)) {
        setBooks(storedData.data);
        setBookOptions(Object.keys(storedData.data));
        return;
      }

      try {
        const fetchedBooks = await getAllTransactionSummaries(userId);
        setBooks(fetchedBooks);
        setBookOptions(Object.keys(fetchedBooks));

        // Store fetched data in localStorage
        saveToLocalStorage(localStorageKey, fetchedBooks);

        if (Object.keys(fetchedBooks).length > 0 && selectedBooks.length === 0) {
          setSelectedBooks([Object.keys(fetchedBooks)[0]]);
        }
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, [userId, selectedBooks]);

  const handleBookChange = (event) => {
    setSelectedBooks(event.target.value);
  };

  useEffect(() => {
    const booksToAnalyze = selectedBooks.length > 0 ? selectedBooks : Object.keys(books);
  
    if (booksToAnalyze.length > 0) {
      const options = generateChartOptions(booksToAnalyze);
      setChartOptions(options);
  
      const pieOptions = generatePieChartOptions(booksToAnalyze);
      setPieChartOptions(pieOptions);
  
      const lineOptions = generateLineChartOptions(booksToAnalyze);
      setLineChartOptions(lineOptions);
  
      const barOptions = generateBarChartOptions(booksToAnalyze);
      setBarChartOptions(barOptions);
  
      const heatmapOptions = generateHeatmapOptions(booksToAnalyze);
      setHeatmapOptions(heatmapOptions);
    }
  }, [selectedBooks, selectedMonths, books]);

  const generateChartOptions = (booksToAnalyze) => {
    const initialBalances = {};
    const totalEncaissements = {};
    const totalDecaissements = {};
    const finalTreasuries = {};
  
    booksToAnalyze.forEach((bookName) => {
      const summary = calculateBudgetSummary(calculateTotals(books[bookName]));
      
      initialBalances[bookName] = summary.initialBalance;
  
      const encaissementsArray = Array.isArray(summary.totalEncaissements) ? summary.totalEncaissements : [summary.totalEncaissements];
      const decaissementsArray = Array.isArray(summary.totalDecaissements) ? summary.totalDecaissements : [summary.totalDecaissements];
  
      const filteredEncaissements = selectedMonths.length > 0
        ? encaissementsArray.filter((_, index) => selectedMonths.includes(index))
        : encaissementsArray;
  
      const filteredDecaissements = selectedMonths.length > 0
        ? decaissementsArray.filter((_, index) => selectedMonths.includes(index))
        : decaissementsArray;
  
      totalEncaissements[bookName] = filteredEncaissements.reduce((a, b) => a + b, 0);
      totalDecaissements[bookName] = filteredDecaissements.reduce((a, b) => a + b, 0);
  
      finalTreasuries[bookName] = initialBalances[bookName] + totalEncaissements[bookName] - totalDecaissements[bookName];
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
          color: '#007bff',
          dataLabels: { enabled: true },
        },
        {
          name: 'Total Encaissements',
          data: booksToAnalyze.map((bookName) => totalEncaissements[bookName]),
          type: 'column',
          color: '#28a745',
          dataLabels: { enabled: true },
        },
        {
          name: 'Total Decaissements',
          data: booksToAnalyze.map((bookName) => totalDecaissements[bookName]),
          type: 'column',
          color: '#dc3545',
          dataLabels: { enabled: true },
        },
        {
          name: 'Final Treasury',
          data: booksToAnalyze.map((bookName) => finalTreasuries[bookName]),
          type: 'column',
          color: '#ffc107',
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

      book.encaissements.forEach((enc) => {
        enc.montants.forEach((amount, month) => {
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            encaissementsData[enc.nature] = (encaissementsData[enc.nature] || 0) + amount;
          }
        });
      });

      book.decaissements.forEach((dec) => {
        dec.montants.forEach((amount, month) => {
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            decaissementsData[dec.nature] = (decaissementsData[dec.nature] || 0) + amount;
          }
        });
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
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            timeSeriesData[month] = timeSeriesData[month] || { encaissements: 0, decaissements: 0 };
            timeSeriesData[month].encaissements += amount;
          }
        });
      });

      book.decaissements.forEach((dec) => {
        dec.montants.forEach((amount, month) => {
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            timeSeriesData[month].decaissements += amount;
          }
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
        categories: months.map(month => monthNames[month]),
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

      book.encaissements.forEach((enc) => {
        enc.montants.forEach((amount, month) => {
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            monthlyTotals[month] = monthlyTotals[month] || {
              encaissements: 0,
              decaissements: 0,
            };
            monthlyTotals[month].encaissements += amount;
          }
        });
      });

      book.decaissements.forEach((dec) => {
        dec.montants.forEach((amount, month) => {
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            monthlyTotals[month] = monthlyTotals[month] || {
              encaissements: 0,
              decaissements: 0,
            };
            monthlyTotals[month].decaissements += amount;
          }
        });
      });
    });

    const months = Object.keys(monthlyTotals).sort();

    return {
      chart: { type: 'column' },
      title: { text: 'Monthly Totals' },
      xAxis: {
        categories: months.map(month => monthNames[month]),
        title: { text: 'Month' },
      },
      yAxis: { title: { text: 'Amount' }, min: 0 },
      series: [
        {
          name: 'Total Encaissements',
          data: months.map((month) => monthlyTotals[month].encaissements),
          color: '#28a745',
        },
        {
          name: 'Total Decaissements',
          data: months.map((month) => monthlyTotals[month].decaissements),
          color: '#dc3545',
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
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            heatmapData.push([bookIndex, month, amount]);
          }
        });
      });

      book.decaissements.forEach((dec) => {
        dec.montants.forEach((amount, month) => {
          if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
            heatmapData.push([bookIndex, month, -amount]);
          }
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
        categories: monthNames,
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
      <Typography variant="h4" gutterBottom>
        Comparative Analytics
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
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
        </Grid>
        <Grid item xs={12} md={6}>
          <FormControl fullWidth margin="normal">
            <InputLabel>Select Months</InputLabel>
            <Select
              multiple
              value={selectedMonths}
              onChange={(event) => setSelectedMonths(event.target.value)}
              renderValue={(selected) => selected.map(month => monthNames[month]).join(', ')}
            >
              {monthNames.map((month, index) => (
                <MenuItem key={index} value={index}>
                  <Checkbox checked={selectedMonths.indexOf(index) > -1} />
                  <ListItemText primary={month} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selectedBooks.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Global Annual :
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#424242' }}>
                  <TableCell sx={{ color: '#ffffff' }}>Book</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Initial Balance</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Total Encaissements</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Total Decaissements</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>Final Treasury</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedBooks.map((bookName) => {
                  const summary = calculateBudgetSummary(
                    calculateTotals(books[bookName])
                  );
                  return (
                    <TableRow key={bookName} hover>
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
      <Box mt={4}>
        {Object.keys(chartOptions).length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          Queryable Charts :
        </Typography>
        {Object.keys(pieChartOptions).length > 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <HighchartsReact
                highcharts={Highcharts}
                options={pieChartOptions.encaissements}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <HighchartsReact
                highcharts={Highcharts}
                options={pieChartOptions.decaissements}
              />
            </Grid>
          </Grid>
        )}
      </Box>

      <Box mt={4}>
        {Object.keys(lineChartOptions).length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
        )}
      </Box>

      <Box mt={4}>
        <Grid container spacing={4}>
          {Object.keys(barChartOptions).length > 0 && (
            <Grid item xs={12} md={6}>
              <HighchartsReact highcharts={Highcharts} options={barChartOptions} />
            </Grid>
          )}
          {Object.keys(heatmapOptions).length > 0 && (
            <Grid item xs={12} md={6}>
              <HighchartsReact highcharts={Highcharts} options={heatmapOptions} />
            </Grid>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default Analytics;
