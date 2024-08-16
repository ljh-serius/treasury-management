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
  Grid,
  TableFooter
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import heatmap from 'highcharts/modules/heatmap';
import {
  calculateBudgetSummary,
  calculateTotals,
} from './transactionHelpers';
import {
  getAllStoreTransactionSummaries,
  fetchEntities
} from '../utils/firebaseHelpers';
import { translate } from '../utils/translate';
import { useTranslation } from '../utils/TranslationProvider';

// Initialize the heatmap module
heatmap(Highcharts);

const monthNames = [
  translate("January"), translate("February"), translate("March"), translate("April"), translate("May"), translate("June"),
  translate("July"), translate("August"), translate("September"), translate("October"), translate("November"), translate("December")
];

const Analytics = () => {
  const { language } = useTranslation();
  const [entities, setEntities] = useState([]);
  const [books, setBooks] = useState({});
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [chartOptions, setChartOptions] = useState({});
  const [pieChartOptions, setPieChartOptions] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});
  const [barChartOptions, setBarChartOptions] = useState({});
  const [heatmapOptions, setHeatmapOptions] = useState({});
  const [selectedBooks, setSelectedBooks] = useState([]); // Selected entities (book IDs)
  const [selectedEntityYears, setSelectedEntityYears] = useState([]); // Selected entity-year pairs
  const [netTreasuryOptions, setNetTreasuryOptions] = useState({});

  useEffect(() => {
    console.log("Entities:", entities);
    console.log("Books:", books);
  }, [entities, books]);

  const handleBooksSelectChange = (event) => {
    setSelectedBooks(event.target.value);
  };

  const availableEntityYearPairs = selectedBooks.flatMap(bookId => {
    const entityName = entities.find(item => item.id === bookId)?.name;
    return Object.keys(books.summaries[bookId] || {}).map(year => {
      return {
        displayText: `${entityName} - ${year}`, // What the user sees
        value: `${bookId}-${year}`, // The actual value we'll use to set the state
        bookId: bookId,
        year: year,
      };
    });
  });
  
  
  useEffect(() => {
    const organizationId = JSON.parse(localStorage.getItem("userData")).organizationId;

    const fetchEntitiesData = async () => {
      try {
        const fetchedEntities = await fetchEntities(organizationId);
        setEntities(fetchedEntities || []);
      } catch (error) {
        console.error('Error fetching entities:', error);
      }
    };

    const fetchBooksData = async () => {
      try {
        const fetchedBooks = await getAllStoreTransactionSummaries(organizationId);
        setBooks(fetchedBooks);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };

    fetchEntitiesData();
    fetchBooksData();
  }, []);

  useEffect(() => {
    if (selectedBooks.length > 0 || selectedEntityYears.length > 0 || selectedMonths.length > 0) {
      const booksToAnalyze = selectedBooks.length > 0 ? selectedBooks : Object.keys(books.summaries);
  
      const options = generateChartOptions(booksToAnalyze);
      setChartOptions(options);
  
      const pieOptions = generatePieChartOptions(booksToAnalyze);
      setPieChartOptions(pieOptions);
  
      const lineOptions = generateLineChartOptions(booksToAnalyze);
      setLineChartOptions(lineOptions);
  
      const netTreasuryOptions = generateNetTreasuryEvolutionOptions(booksToAnalyze);
      setNetTreasuryOptions(netTreasuryOptions);
  
      const barOptions = generateBarChartOptions(booksToAnalyze);
      setBarChartOptions(barOptions);
  
      const heatmapOptions = generateHeatmapOptions(booksToAnalyze);
      setHeatmapOptions(heatmapOptions);
    }
  }, [selectedBooks, selectedEntityYears, selectedMonths, books]);
  
  const generateChartOptions = (booksToAnalyze) => {
    const initialBalances = {};
    const totalEncaissements = {};
    const totalDecaissements = {};
    const finalTreasuries = {};

    booksToAnalyze.forEach((entityId) => {
      const booksUnderEntity = books.summaries[entityId];
      if (!booksUnderEntity) return;

      Object.keys(booksUnderEntity).forEach((bookName) => {
        // If specific years are selected, filter by those; otherwise, consider all
        if (selectedEntityYears.length > 0 && !selectedEntityYears.map(({ year }) => year).includes(bookName)) return;

        const book = booksUnderEntity[bookName];
        if (!book) return;

        console.log("BOOK ", book)
        // Calculate the budget summary with validated data
        const summary = calculateBudgetSummary(book);

        initialBalances[bookName] = (initialBalances[bookName] || 0) + (summary.initialBalance || 0);

        const encaissementsArray = Array.isArray(summary.totalEncaissements) ? summary.totalEncaissements : [summary.totalEncaissements];
        const decaissementsArray = Array.isArray(summary.totalDecaissements) ? summary.totalDecaissements : [summary.totalDecaissements];

        const filteredEncaissements = selectedMonths.length > 0
          ? encaissementsArray.filter((_, index) => selectedMonths.includes(index))
          : encaissementsArray;

        const filteredDecaissements = selectedMonths.length > 0
          ? decaissementsArray.filter((_, index) => selectedMonths.includes(index))
          : decaissementsArray;

        totalEncaissements[bookName] = (totalEncaissements[bookName] || 0) + filteredEncaissements.reduce((a, b) => a + b, 0);
        totalDecaissements[bookName] = (totalDecaissements[bookName] || 0) + filteredDecaissements.reduce((a, b) => a + b, 0);

        finalTreasuries[bookName] = initialBalances[bookName] + totalEncaissements[bookName] - totalDecaissements[bookName];
      });
    });

    return {
      title: {
        text: translate('Comparative Analysis of Budget Summaries', language),
      },
      xAxis: {
        categories: Object.keys(initialBalances),
        title: {
          text: translate('Books', language),
        },
      },
      yAxis: {
        title: {
          text: translate('Amount', language),
        },
        min: 0,
      },
      series: [
        {
          name: translate('Initial Balance', language),
          data: Object.values(initialBalances),
          type: 'column',
          color: '#007bff',
          dataLabels: { enabled: true },
        },
        {
          name: translate('Total Encaissements', language),
          data: Object.values(totalEncaissements),
          type: 'column',
          color: '#28a745',
          dataLabels: { enabled: true },
        },
        {
          name: translate('Total Decaissements', language),
          data: Object.values(totalDecaissements),
          type: 'column',
          color: '#dc3545',
          dataLabels: { enabled: true },
        },
        {
          name: translate('Final Treasury', language),
          data: Object.values(finalTreasuries),
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

    booksToAnalyze.forEach((entityId) => {
      const booksUnderEntity = books.summaries[entityId];
      if (!booksUnderEntity) return;

      Object.keys(booksUnderEntity).forEach((bookName) => {
        // If specific years are selected, filter by those; otherwise, consider all years
        if (selectedEntityYears.length > 0 && !selectedEntityYears.map(({ year }) => year).includes(bookName)) return;

        const book = booksUnderEntity[bookName];
        if (!book) return;

        if (book.encaissements) {
          book.encaissements
            .filter(enc => enc.nature !== 'Total Revenues') // Exclude 'Total Category'
            .forEach((enc) => {
              enc.montants.forEach((amount, month) => {
                if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
                  encaissementsData[enc.nature] = (encaissementsData[enc.nature] || 0) + amount;
                }
              });
            });
        }

        if (book.decaissements) {
          book.decaissements
            .filter(dec => dec.nature !== 'Total Expenses') // Exclude 'Total Category'
            .forEach((dec) => {
              dec.montants.forEach((amount, month) => {
                if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
                  decaissementsData[dec.nature] = (decaissementsData[dec.nature] || 0) + amount;
                }
              });
            });
        }
      });
    });

    return {
      encaissements: {
        chart: {
          type: 'pie',
        },
        title: {
          text: translate('Encaissements Breakdown', language),
        },
        series: [
          {
            name: translate('Encaissements', language),
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
          text: translate('Expenses Breakdown', language),
        },
        series: [
          {
            name: translate('Expenses', language),
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
  
    booksToAnalyze.forEach((entityId) => {
      const booksUnderEntity = books.summaries[entityId];
      if (!booksUnderEntity) return;
  
      Object.keys(booksUnderEntity).forEach((bookName) => {
        if (selectedEntityYears.length > 0 && !selectedEntityYears.map(({ year }) => year).includes(bookName)) return;
  
        const book = booksUnderEntity[bookName];
        if (!book) return;
  
        if (book.encaissements) {
          book.encaissements
            .filter(enc => enc.nature !== 'Total Revenues')
            .forEach((enc) => {
              enc.montants.forEach((amount, month) => {
                const key = `${bookName}-${month}`;
                timeSeriesData[key] = timeSeriesData[key] || { encaissements: 0, decaissements: 0 };
                timeSeriesData[key].encaissements += amount;
              });
            });
        }
  
        if (book.decaissements) {
          book.decaissements
            .filter(dec => dec.nature !== 'Total Expenses')
            .forEach((dec) => {
              dec.montants.forEach((amount, month) => {
                const key = `${bookName}-${month}`;
                timeSeriesData[key].decaissements += amount;
              });
            });
        }
      });
    });
  
    const sortedKeys = Object.keys(timeSeriesData).sort((a, b) => {
      const [yearA, monthA] = a.split('-').map(Number);
      const [yearB, monthB] = b.split('-').map(Number);
      return yearA === yearB ? monthA - monthB : yearA - yearB;
    });
  
    const encaissementsSeries = sortedKeys.map(key => timeSeriesData[key].encaissements);
    const decaissementsSeries = sortedKeys.map(key => timeSeriesData[key].decaissements);
    const categories = sortedKeys.map(key => {
      const [year, month] = key.split('-');
      return `${monthNames[month]} ${year}`;
    });
  
    return {
      chart: { type: 'line' },
      title: { text: translate('Treasury Evolution Over Time', language) },
      xAxis: {
        categories: categories,
        title: { text: translate('Time', language) },
      },
      yAxis: { title: { text: translate('Amount', language) }, min: 0 },
      series: [
        {
          name: translate('Total Encaissements', language),
          data: encaissementsSeries,
          type: 'line',
          color: '#28a745',
        },
        {
          name: translate('Total Decaissements', language),
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

    booksToAnalyze.forEach((entityId) => {
      const booksUnderEntity = books.summaries[entityId];
      if (!booksUnderEntity) return;

      Object.keys(booksUnderEntity).forEach((bookName) => {
        // If specific years are selected, filter by those; otherwise, consider all years
        if (selectedEntityYears.length > 0 && !selectedEntityYears.map(({ year }) => year).includes(bookName)) return;

        const book = booksUnderEntity[bookName];
        if (!book) return;

        if (book.encaissements) {
          book.encaissements
            .filter(enc => enc.nature !== 'Total Revenues') // Exclude 'Total Category'
            .forEach((enc) => {
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
        }

        if (book.decaissements) {
          book.decaissements
            .filter(dec => dec.nature !== 'Total Expenses') // Exclude 'Total Category'
            .forEach((dec) => {
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
        }
      });
    });

    const months = Object.keys(monthlyTotals).sort();

    return {
      chart: { type: 'column' },
      title: { text: translate('Monthly Totals', language) },
      xAxis: {
        categories: months.map(month => monthNames[month]),
        title: { text: translate('Month', language) },
      },
      yAxis: { title: { text: translate('Amount', language) }, min: 0 },
      series: [
        {
          name: translate('Total Encaissements', language),
          data: months.map((month) => monthlyTotals[month].encaissements),
          color: '#28a745',
        },
        {
          name: translate('Total Decaissements', language),
          data: months.map((month) => monthlyTotals[month].decaissements),
          color: '#dc3545',
        },
      ],
      credits: { enabled: false },
    };
  };



  const generateHeatmapOptions = (booksToAnalyze) => {
    const heatmapData = [];

    booksToAnalyze.forEach((entityId, bookIndex) => {
      const booksUnderEntity = books.summaries[entityId];
      if (!booksUnderEntity) return;

      Object.keys(booksUnderEntity).forEach((bookName) => {
        const book = booksUnderEntity[bookName];
        if (!book) return;

        if (book.encaissements) {
          book.encaissements
            .filter(enc => enc.nature !== 'Total Revenues') // Exclude 'Total Category'
            .forEach((enc) => {
              enc.montants.forEach((amount, month) => {
                if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
                  heatmapData.push([bookIndex, month, amount]);
                }
              });
            });
        }

        if (book.decaissements) {
          book.decaissements
            .filter(dec => dec.nature !== 'Total Expenses') // Exclude 'Total Category'
            .forEach((dec) => {
              dec.montants.forEach((amount, month) => {
                if (selectedMonths.length === 0 || selectedMonths.includes(month)) {
                  heatmapData.push([bookIndex, month, -amount]);
                }
              });
            });
        }
      });
    });

    return {
      chart: { type: 'heatmap' },
      title: { text: translate('Monthly Transaction Heatmap', language) },
      xAxis: {
        categories: booksToAnalyze,
        title: { text: translate('Books', language) },
      },
      yAxis: {
        categories: monthNames,
        title: { text: translate('Month', language) },
      },
      colorAxis: {
        min: -Math.max(...heatmapData.map(data => Math.abs(data[2]))),
        minColor: '#dc3545',
        maxColor: '#28a745',
      },
      series: [
        {
          name: translate('Transactions', language),
          borderWidth: 1,
          data: heatmapData,
        },
      ],
      credits: { enabled: false },
    };
  };
  const generateNetTreasuryEvolutionOptions = (booksToAnalyze) => {
    const netTreasuryData = [];
    const categories = [];
  
    booksToAnalyze.forEach((entityId) => {
      const booksUnderEntity = books.summaries[entityId];
      if (!booksUnderEntity) return;
  
      Object.keys(booksUnderEntity).forEach((bookName) => {
        const year = parseInt(bookName, 10);
        if (isNaN(year)) return;
  
        const book = booksUnderEntity[bookName];
        if (!book) return;
  
        for (let month = 0; month < 12; month++) {
          const key = `${year}-${month}`;
          categories.push(key);
  
          const encaissementForMonth = book.encaissements
            ? book.encaissements.reduce((acc, enc) => acc + (enc.montants[month] || 0), 0)
            : 0;
          const decaissementForMonth = book.decaissements
            ? book.decaissements.reduce((acc, dec) => acc + (dec.montants[month] || 0), 0)
            : 0;
  
          netTreasuryData.push(encaissementForMonth - decaissementForMonth);
        }
      });
    });
  
    const sortedCategories = categories.sort((a, b) => {
      const [yearA, monthA] = a.split('-').map(Number);
      const [yearB, monthB] = b.split('-').map(Number);
      return yearA === yearB ? monthA - monthB : yearA - yearB;
    });
  
    return {
      chart: { type: 'line' },
      title: { text: translate('Net Treasury Evolution by Month Over the Years', language) },
      xAxis: {
        categories: sortedCategories.map(key => {
          const [year, month] = key.split('-');
          return `${monthNames[month]} ${year}`;
        }),
        title: { text: translate('Month and Year', language) },
      },
      yAxis: { title: { text: translate('Net Treasury', language) }, min: 0 },
      series: [
        {
          name: translate('Net Treasury', language),
          data: sortedCategories.map(key => netTreasuryData[categories.indexOf(key)]),
          type: 'line',
          color: '#007bff',
        },
      ],
      credits: { enabled: false },
    };
  };
  
  
const handleEntityYearChange = (event) => {
  const selectedValues = event.target.value;
  const entityYears = selectedValues.map(v => {
    const [bookId, year] = v.split('-');
    return { bookId, year };
  });
  setSelectedEntityYears(entityYears);
};

// RenderValue now uses the displayText
const renderSelectedValue = (selected) => {
  return selected.map(value => {
    const item = availableEntityYearPairs.find(pair => pair.value === value);
    return item?.displayText || '';
  }).join(', ');
};

  // Sum up the values for the footer
  const calculateFooterTotals = () => {
    let initialBalanceSum = 0;
    let totalEncaissementsSum = 0;
    let totalDecaissementsSum = 0;
    let finalTreasurySum = 0;

    selectedEntityYears.forEach(({ bookId, year }) => {
      const summary = calculateBudgetSummary(
        books.summaries[bookId][year]
      );
      initialBalanceSum += summary.initialBalance;
      totalEncaissementsSum += summary.totalEncaissements;
      totalDecaissementsSum += summary.totalDecaissements;
      finalTreasurySum += summary.finalTreasury;
    });

    return {
      initialBalanceSum,
      totalEncaissementsSum,
      totalDecaissementsSum,
      finalTreasurySum
    };
  };

  const footerTotals = calculateFooterTotals();

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12, width: '60vw' }}>
      <Typography variant="h4" gutterBottom>
        {translate('Comparative Analytics', language)}
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="books-select-label">Select Books</InputLabel>
            <Select
              labelId="books-select-label"
              multiple
              value={selectedBooks}
              onChange={handleBooksSelectChange}
              renderValue={(selected) => selected.map(id => entities.find(item => item.id === id)?.name).join(', ')}
            >
              {entities.map(item => (
                <MenuItem key={item.id} value={item.id}>
                  <Checkbox checked={selectedBooks.indexOf(item.id) > -1} />
                  <ListItemText primary={item.name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      
        <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal" disabled={selectedBooks.length === 0}>
            <InputLabel id="years-select-label">Select Years</InputLabel>
            <Select
              labelId="years-select-label"
              multiple
              value={selectedEntityYears.map(({ bookId, year }) => `${bookId}-${year}`)}
              onChange={handleEntityYearChange}
              renderValue={renderSelectedValue}
            >
              {availableEntityYearPairs.map(({ displayText, value }) => (
                <MenuItem key={value} value={value}>
                  <Checkbox checked={selectedEntityYears.some(pair => `${pair.bookId}-${pair.year}` === value)} />
                  <ListItemText primary={displayText} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl fullWidth margin="normal">
            <InputLabel>{translate('Select Months', language)}</InputLabel>
            <Select
              multiple
              value={selectedMonths}
              onChange={(event) => setSelectedMonths(event.target.value)}
              renderValue={(selected) => selected.map(month => monthNames[month]).join(', ')}
            >
              {monthNames.map((month, index) => (
                <MenuItem key={index} value={index}>
                  <Checkbox checked={selectedMonths.includes(index)} />
                  <ListItemText primary={month} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {selectedBooks.length > 0 && selectedEntityYears.length > 0 && (
        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            {translate('Global Annual', language)}:
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: '#424242' }}>
                  <TableCell sx={{ color: '#ffffff' }}>{translate('Entity', language)}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{translate('Year', language)}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{translate('Initial Balance', language)}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{translate('Total Encaissements', language)}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{translate('Total Decaissements', language)}</TableCell>
                  <TableCell sx={{ color: '#ffffff' }}>{translate('Final Treasury', language)}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {selectedEntityYears.map(({ bookId, year }) => {
                  const entityName = entities.find(item => item.id === bookId)?.name;
                  console.log("PARAMS ", [bookId, year])

                  const summary = calculateBudgetSummary(
                    books.summaries[bookId][year]
                  );
                  return (
                    <TableRow key={`${bookId}-${year}`} hover>
                      <TableCell>{entityName}</TableCell>
                      <TableCell>{year}</TableCell>
                      <TableCell>{summary.initialBalance.toFixed(2)}</TableCell>
                      <TableCell>{summary.totalEncaissements.toFixed(2)}</TableCell>
                      <TableCell>{summary.totalDecaissements.toFixed(2)}</TableCell>
                      <TableCell>{summary.finalTreasury.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={2}>{translate('Total', language)}</TableCell>
                  <TableCell>{footerTotals.initialBalanceSum.toFixed(2)}</TableCell>
                  <TableCell>{footerTotals.totalEncaissementsSum.toFixed(2)}</TableCell>
                  <TableCell>{footerTotals.totalDecaissementsSum.toFixed(2)}</TableCell>
                  <TableCell>{footerTotals.finalTreasurySum.toFixed(2)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}

    <Box mt={4}>
      <Typography variant="h6" gutterBottom>
        {translate('Net Treasury Evolution', language)}:
      </Typography>
      {Object.keys(netTreasuryOptions).length > 0 && (
        <HighchartsReact highcharts={Highcharts} options={netTreasuryOptions} />
      )}
    </Box>

      {/* Chart rendering areas */}
      <Box mt={4}>
        {Object.keys(chartOptions).length > 0 && (
          <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        )}
      </Box>

      <Box mt={4}>
        <Typography variant="h6" gutterBottom>
          {translate('Queryable Charts', language)}:
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
      {Object.keys(lineChartOptions).length > 0 && (
        <HighchartsReact highcharts={Highcharts} options={lineChartOptions} />
      )}

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
    </Container>
  );
};

export default Analytics;
