import React, { useState, useEffect, useCallback } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography,
  Fab, Menu, MenuItem, Button, IconButton, InputAdornment, Grid, Modal, Box, FormControlLabel, Checkbox
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TreasuryChart from './TreasuryChart';
import { useTheme, useMediaQuery } from '@mui/material';
import debounce from 'lodash.debounce';
import * as XLSX from 'xlsx';

const initialTransactions = {
  encaissements: [
    { nature: 'Vente', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Service', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Total Encaissements', montantInitial: 0, montants: Array(12).fill(0) }
  ],
  decaissements: [
    { nature: 'Achat', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Salaires', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Total Décaissements', montantInitial: 0, montants: Array(12).fill(0) }
  ]
};

const monthNames = ["Initial", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const TreasuryTable = () => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });
  const [inputValues, setInputValues] = useState(transactions);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [action, setAction] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({ type: '', index: -1, month: -1 });
  const [encaissementsData, setEncaissementsData] = useState([]);
  const [decaissementsData, setDecaissementsData] = useState([]);
  const [cumulativeTreasuryData, setCumulativeTreasuryData] = useState([]);
  const [monthlyTreasuryData, setMonthlyTreasuryData] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState({ encaissements: null, decaissements: null });
  const [highlightedMonth, setHighlightedMonth] = useState(null);
  const [highlightedCumulativeMonth, setHighlightedCumulativeMonth] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const updatedTransactions = calculateTotals(transactions);
    setEncaissementsData(prepareChartData('encaissements', updatedTransactions));
    setDecaissementsData(prepareChartData('decaissements', updatedTransactions));
    setCumulativeTreasuryData(prepareCumulativeTreasuryData(updatedTransactions));
    setMonthlyTreasuryData(prepareMonthlyTreasuryData(updatedTransactions));

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  }, [transactions]);

  const debouncedSetTransactions = useCallback(
    debounce((newTransactions) => {
      setTransactions(newTransactions);
    }, 500),
    []
  );

  const handleInputChange = (type, index, key, value) => {
    const updatedInputValues = { ...inputValues };
    if (key === 'montantInitial') {
      updatedInputValues[type][index][key] = parseFloat(value) || 0;
    } else if (key === 'nature') {
      updatedInputValues[type][index][key] = value;
    } else {
      updatedInputValues[type][index].montants[key] = parseFloat(value) || 0;
    }
    setInputValues(updatedInputValues);
    debouncedSetTransactions(updatedInputValues);
  };

  const handleMenuOpen = (event, type, index, month) => {
    setSelectedTransaction({ type, index, month });
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const handleActionClick = (actionType) => {
    setAction(actionType);
    setSelectedMonths([]);
    setModalOpen(true);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonths((prev) => {
      if (prev.includes(month)) {
        return prev.filter((m) => m !== month);
      } else {
        return [...prev, month];
      }
    });
  };

  const handleConfirm = (addSum = false) => {
    const { type, index, month } = selectedTransaction;
    const updatedTransactions = { ...transactions };

    if (action === 'repeat') {
      const amount = updatedTransactions[type][index].montants[month];
      selectedMonths.forEach((m) => {
        if (addSum) {
          updatedTransactions[type][index].montants[m] += amount;
        } else {
          updatedTransactions[type][index].montants[m] = amount;
        }
      });
    } else if (action === 'advance' && selectedMonths.length === 1) {
      const newMonth = selectedMonths[0];
      const amount = updatedTransactions[type][index].montants[month];
      updatedTransactions[type][index].montants[month] = 0;
      updatedTransactions[type][index].montants[newMonth] += amount;
    } else if (action === 'postpone' && selectedMonths.length === 1) {
      const newMonth = selectedMonths[0];
      const amount = updatedTransactions[type][index].montants[month];
      updatedTransactions[type][index].montants[month] = 0;
      updatedTransactions[type][index].montants[newMonth] += amount;
    } else if (action === 'repeatUntil' && selectedMonths.length === 1) {
      const endMonth = selectedMonths[0];
      const amount = updatedTransactions[type][index].montants[month];
      for (let m = month + 1; m <= endMonth; m++) {
        if (addSum) {
          updatedTransactions[type][index].montants[m] += amount;
        } else {
          updatedTransactions[type][index].montants[m] = amount;
        }
      }
    }

    setTransactions(updatedTransactions);
    handleMenuClose();
    setModalOpen(false);
    setAction('');
  };

  const handleCancel = () => {
    setAction('');
    setModalOpen(false);
  };

  const calculateTotals = (transactions) => {
    const updatedTransactions = { ...transactions };
    ['encaissements', 'decaissements'].forEach((type) => {
      const total = { nature: `Total ${type.charAt(0).toUpperCase() + type.slice(1)}`, montantInitial: 0, montants: Array(12).fill(0) };
      updatedTransactions[type].slice(0, -1).forEach((transaction) => {
        total.montantInitial += transaction.montantInitial;
        transaction.montants.forEach((montant, i) => {
          total.montants[i] += montant;
        });
      });
      updatedTransactions[type][updatedTransactions[type].length - 1] = total;
    });
    return updatedTransactions;
  };

  const calculateMonthlyTreasury = (transactions) => {
    return Array.from({ length: 12 }, (_, month) => {
      const totalEncaissements = transactions.encaissements[transactions.encaissements.length - 1].montants[month];
      const totalDecaissements = transactions.decaissements[transactions.decaissements.length - 1].montants[month];
      return totalEncaissements - totalDecaissements;
    });
  };

  const calculateAccumulatedTreasury = (initialSolde, transactions) => {
    const monthlyTreasury = calculateMonthlyTreasury(transactions);
    return monthlyTreasury.reduce((acc, value, index) => {
      if (index === 0) acc.push(value + initialSolde);
      else acc.push(acc[index - 1] + value);
      return acc;
    }, []);
  };

  const calculateTotal = (type, index, transactions) => {
    const transaction = transactions[type][index];
    return transaction.montants.reduce((acc, curr) => acc + curr, 0) + transaction.montantInitial;
  };

  const prepareChartData = (type, transactions) => {
    const data = transactions[type].map(transaction => ({
      name: transaction.nature,
      data: [transaction.montantInitial, ...transaction.montants]
    })).slice(0, -1); // Remove total from chart data
    return data;
  };

  const prepareCumulativeTreasuryData = (transactions) => {
    const initialSolde = transactions.encaissements[transactions.encaissements.length - 1].montantInitial -
      transactions.decaissements[transactions.decaissements.length - 1].montantInitial;
    const data = calculateAccumulatedTreasury(initialSolde, transactions);
    return [{
      name: 'Trésorerie Cummulée',
      data: [initialSolde, ...data]
    }];
  };

  const prepareMonthlyTreasuryData = (transactions) => {
    const data = calculateMonthlyTreasury(transactions);
    return [{
      name: 'Solde de Trésorie',
      data: [0, ...data]
    }];
  };

  const handleFabClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuActionClose = () => {
    setAnchorEl(null);
  };

  const handleAddTransaction = (type) => {
    const updatedTransactions = { ...transactions };
    updatedTransactions[type].splice(updatedTransactions[type].length - 1, 0, { nature: '', montantInitial: 0, montants: Array(12).fill(0) });
    setTransactions(updatedTransactions);
    handleMenuActionClose();
  };

  const handleChartHover = (type, seriesName) => {
    setHighlightedRow((prev) => ({
      ...prev,
      [type]: seriesName
    }));
  };

  const handleMonthHighlight = (index) => {
    setHighlightedMonth(index);
  };

  const handleCumulativeMonthHighlight = (index) => {
    setHighlightedCumulativeMonth(index);
  };

  const exportToSpreadsheet = () => {
    const wb = XLSX.utils.book_new();
    const wsData = [
      ["Type", "Nature de la transaction", "Solde Initial", ...monthNames.slice(1), "Total"]
    ];

    Object.keys(transactions).forEach((type) => {
      transactions[type].forEach((transaction, index) => {
        const rowData = [
          type.charAt(0).toUpperCase() + type.slice(1),
          transaction.nature,
          transaction.montantInitial,
          ...transaction.montants,
          calculateTotal(type, index, transactions)
        ];
        wsData.push(rowData);
      });
    });

    const monthlyTreasury = calculateMonthlyTreasury(transactions);
    const accumulatedTreasury = calculateAccumulatedTreasury(
      transactions.encaissements[transactions.encaissements.length - 1].montantInitial -
      transactions.decaissements[transactions.decaissements.length - 1].montantInitial,
      transactions
    );

    wsData.push(["", "Solde de la Trésorerie", "", ...monthlyTreasury, monthlyTreasury.reduce((acc, curr) => acc + curr, 0)]);
    wsData.push(["", "Trésorerie Accumulée", "", ...accumulatedTreasury, accumulatedTreasury[accumulatedTreasury.length - 1]]);

    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, "Transactions");

    // Exporting chart data
    const exportChartData = (chartData, title) => {
      const chartWsData = [["Month", ...chartData.map(d => d.name)]];
      for (let i = 0; i < 13; i++) {
        chartWsData.push([
          monthNames[i],
          ...chartData.map(d => d.data[i])
        ]);
      }
      const chartWs = XLSX.utils.aoa_to_sheet(chartWsData);
      XLSX.utils.book_append_sheet(wb, chartWs, title);
    };

    exportChartData(encaissementsData, "Encaissements");
    exportChartData(decaissementsData, "Décaissements");
    exportChartData(monthlyTreasuryData, "Solde de Trésorie");
    exportChartData(cumulativeTreasuryData, "Trésorerie Cummulée");

    XLSX.writeFile(wb, "treasury_data.xlsx");
  };

  const calculateDifference = (cumulativeTreasury) => {
    return cumulativeTreasury.map((treasury, index) => {
      if (index === 0) return 0;
      return treasury - cumulativeTreasury[index - 1];
    });
  };

  const calculatePercentageBalanceVsEncaissements = (monthlyTreasury, encaissements) => {
    return monthlyTreasury.map((treasury, index) => {
      if (encaissements[index] === 0) return 0;
      return (treasury / encaissements[index]) * 100;
    });
  };

  const updatedTransactions = calculateTotals(inputValues);
  const monthlyTreasury = calculateMonthlyTreasury(updatedTransactions);
  const initialSolde = transactions.encaissements[transactions.encaissements.length - 1].montantInitial -
    transactions.decaissements[transactions.decaissements.length - 1].montantInitial;
  const accumulatedTreasury = calculateAccumulatedTreasury(initialSolde, updatedTransactions);
  const finalTreasury = accumulatedTreasury[accumulatedTreasury.length - 1];
  const difference = calculateDifference(accumulatedTreasury);
  const percentageBalanceVsEncaissements = calculatePercentageBalanceVsEncaissements(monthlyTreasury, updatedTransactions.encaissements[updatedTransactions.encaissements.length - 1].montants);

  return (
    <>
      <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100vw' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Gestion de Trésorerie
        </Typography>
        <Table sx={{ minWidth: 650, width: '100vw' }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Type</TableCell>
              <TableCell padding="normal">Nature de la transaction</TableCell>
              <TableCell padding="normal">Solde Initial</TableCell>
              {monthNames.slice(1).map((month, i) => (
                <TableCell key={i} align="left" padding="normal">
                  <Typography align="center" gutterBottom>
                    {month}
                  </Typography>
                </TableCell>
              ))}
              <TableCell align="right" padding="normal">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(inputValues).map((type) => (
              <React.Fragment key={type}>
                {inputValues[type].map((transaction, index) => {
                  const isHighlighted = (type === 'encaissements' && highlightedRow.encaissements === transaction.nature) ||
                    (type === 'decaissements' && highlightedRow.decaissements === transaction.nature);

                  return (
                    <TableRow
                      key={index}
                    >
                      {index === 0 && (
                        <TableCell
                          rowSpan={inputValues[type].length}
                          padding="normal"
                          sx={{
                            backgroundColor: inputValues[type].some(t =>
                              (type === 'encaissements' && highlightedRow.encaissements === t.nature) ||
                              (type === 'decaissements' && highlightedRow.decaissements === t.nature)
                            ) ? 'rgba(0, 0, 255, 0.1)' : 'inherit'
                          }}
                        >
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </TableCell>
                      )}
                      <TableCell padding="normal" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}>
                        <TextField
                          value={transaction.nature}
                          onChange={(e) => handleInputChange(type, index, 'nature', e.target.value)}
                          variant="standard"
                          size="small"
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            style: { height: '100%', padding: 8, width: '120px' }, // Fixed width
                          }}
                        />
                      </TableCell>
                      <TableCell padding="normal" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}>
                        <TextField
                          value={transaction.montantInitial}
                          onChange={(e) => handleInputChange(type, index, 'montantInitial', e.target.value)}
                          variant="standard"
                          size="small"
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            style: { height: '100%', padding: 8, width: '120px' }, // Fixed width
                          }}
                        />
                      </TableCell>
                      {transaction.montants.map((montant, i) => (
                        <TableCell
                          padding="normal"
                          key={i}
                          align="right"
                          sx={{ backgroundColor: highlightedMonth === i ? 'rgba(255, 0, 0, 0.1)' : isHighlighted ? 'rgba(0, 0, 255, 0.1)' : (highlightedCumulativeMonth !== null && i <= highlightedCumulativeMonth) ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}
                        >
                          <TextField
                            value={montant}
                            onChange={(e) => handleInputChange(type, index, i, e.target.value)}
                            variant="standard"
                            size="small"
                            fullWidth
                            InputProps={{
                              disableUnderline: true,
                              style: { height: '100%', padding: 8, width: '120px' }, // Fixed width
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="open menu"
                                    onClick={(event) => handleMenuOpen(event, type, index, i)}
                                  >
                                    <MoreVertIcon />
                                  </IconButton>
                                </InputAdornment>
                              ),
                            }}
                          />
                        </TableCell>
                      ))}
                      <TableCell align="right" padding="normal" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit', fontWeight: 'bold' }}>
                        {calculateTotal(type, index, inputValues)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }}>Solde de la Trésorerie</TableCell>
              {monthlyTreasury.map((treasury, index) => (
                <TableCell
                  key={index}
                  align="right"
                  padding="normal"
                  sx={{ backgroundColor: highlightedMonth === index ? 'rgba(255, 0, 0, 0.1)' : 'inherit', fontWeight: 'bold' }}
                >
                  {treasury}
                </TableCell>
              ))}
              <TableCell align="right" padding="normal" sx={{ fontWeight: 'bold' }}>{finalTreasury}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }}>Trésorerie Accumulée</TableCell>
              {accumulatedTreasury.map((treasury, index) => (
                <TableCell
                  key={index}
                  align="right"
                  padding="normal"
                  sx={{ backgroundColor: highlightedMonth === index ? 'rgba(255, 0, 0, 0.1)' : 'inherit', fontWeight: 'bold' }}
                >
                  {treasury}
                </TableCell>
              ))}
              <TableCell align="right" padding="normal" sx={{ fontWeight: 'bold' }}>{finalTreasury}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }}>Difference</TableCell>
              {difference.map((value, index) => (
                <TableCell
                  key={index}
                  align="right"
                  padding="normal"
                  sx={{ backgroundColor: value < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
                >
                  {value}
                </TableCell>
              ))}
              <TableCell align="right" padding="normal" sx={{ fontWeight: 'bold' }}>-</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }}>Percentage of Treasury vs Encaissements</TableCell>
              {percentageBalanceVsEncaissements.map((value, index) => (
                <TableCell
                  key={index}
                  align="right"
                  padding="normal"
                  sx={{ backgroundColor: value < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
                >
                  {value.toFixed(2)}%
                </TableCell>
              ))}
              <TableCell align="right" padding="normal" sx={{ fontWeight: 'bold' }}>-</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" onClick={handleFabClick} style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
      <Button
        variant="contained"
        color="primary"
        onClick={exportToSpreadsheet}
        style={{ position: 'fixed', bottom: 16, height: 52, right: 100, zIndex: 1000 }}
      >
        Export as Spreadsheet
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuActionClose}
      >
        <MenuItem onClick={() => handleAddTransaction('encaissements')}>Encaissement</MenuItem>
        <MenuItem onClick={() => handleAddTransaction('decaissements')}>Décaissement</MenuItem>
      </Menu>
      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleActionClick('repeat')}>Repeat for months</MenuItem>
        <MenuItem onClick={() => handleActionClick('advance')}>Advance transaction</MenuItem>
        <MenuItem onClick={() => handleActionClick('postpone')}>Postpone transaction</MenuItem>
        <MenuItem onClick={() => handleActionClick('repeatUntil')}>Repeat until month</MenuItem>
      </Menu>
      <Modal
        open={modalOpen}
        onClose={handleCancel}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Select Months
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2 }}>
            {monthNames.slice(1).map((month, i) => (
              (i !== selectedTransaction.month) && (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedMonths.includes(i)}
                        onChange={() => handleMonthSelect(i)}
                      />
                    }
                    label={month}
                  />
                </Grid>
              )
            ))}
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 16 }}>
            <Button variant="contained" color="primary" onClick={() => handleConfirm(false)} style={{ marginRight: 8 }}>Copy</Button>
            <Button variant="contained" color="primary" onClick={() => handleConfirm(true)} style={{ marginRight: 8 }}>Add Sum</Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
          </div>
        </Box>
      </Modal>
      <Grid container spacing={3} style={{ marginTop: 16 }}>
        <Grid item xs={12} md={6}>
          <TreasuryChart
            title="Encaissements by Nature"
            data={encaissementsData}
            onHover={(seriesName) => handleChartHover('encaissements', seriesName)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TreasuryChart
            title="Décaissements by Nature"
            data={decaissementsData}
            onHover={(seriesName) => handleChartHover('decaissements', seriesName)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TreasuryChart
            title="Solde de Trésorie"
            data={monthlyTreasuryData}
            onHover={(seriesName, index) => handleMonthHighlight(index - 1)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TreasuryChart
            title="Trésorerie Cummulée"
            data={cumulativeTreasuryData}
            onHover={(seriesName, index) => handleCumulativeMonthHighlight(index - 1)}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default TreasuryTable;
