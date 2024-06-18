import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography,
  Fab, Menu, MenuItem, Button, IconButton, InputAdornment, Grid, Modal, Box, FormControlLabel, Checkbox, TextField, Select, FormControl, InputLabel, Snackbar
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TreasuryChart from './TreasuryChart';
import { useTheme } from '@mui/material';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

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
    const savedTransactions = localStorage.getItem('currentTransaction');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });
  const [inputValues, setInputValues] = useState(transactions);
  const [editingCell, setEditingCell] = useState(null);
  const [transactionName, setTransactionName] = useState('currentTransaction');
  const [availableTransactions, setAvailableTransactions] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = useState(null);
  const [natureMenuAnchorEl, setNatureMenuAnchorEl] = useState(null);
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
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const theme = useTheme();

  useEffect(() => {
    const updatedTransactions = calculateTotals(transactions);
    setEncaissementsData(prepareChartData('encaissements', updatedTransactions));
    setDecaissementsData(prepareChartData('decaissements', updatedTransactions));
    setCumulativeTreasuryData(prepareCumulativeTreasuryData(updatedTransactions));
    setMonthlyTreasuryData(prepareMonthlyTreasuryData(updatedTransactions));

    localStorage.setItem(transactionName, JSON.stringify(updatedTransactions));
  }, [transactions, transactionName]);

  useEffect(() => {
    const keys = Object.keys(localStorage);
    setAvailableTransactions(keys);
  }, []);

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
  };

  const handleBlur = () => {
    setTransactions(inputValues);
    setEditingCell(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleBlur();
    }
  };

  const handleFocus = (type, index, key) => {
    setEditingCell({ type, index, key });
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

  const exportToSpreadsheet = async () => {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet('Transactions');

    // Adding the transaction data
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

    ws.addRows(wsData);

    // Capturing and adding charts to the Excel file
    const chartContainers = document.querySelectorAll('.chart-container'); // Ensure your chart containers have this class

    for (let i = 0; i < chartContainers.length; i++) {
      const canvas = await html2canvas(chartContainers[i]);
      const imgData = canvas.toDataURL('image/png');

      const imageId = wb.addImage({
        base64: imgData,
        extension: 'png',
      });

      ws.addImage(imageId, `A${wsData.length + (i * 20) + 3}:P${wsData.length + (i * 20) + 20}`);
    }

    // Saving the workbook
    const buffer = await wb.xlsx.writeBuffer();
    saveAs(new Blob([buffer]), 'treasury_data_with_charts.xlsx');
  };

  const calculatePercentageBalanceVsEncaissements = (monthlyTreasury, encaissements) => {
    return monthlyTreasury.map((treasury, index) => {
      if (encaissements[index] === 0) return 0;
      return (treasury / encaissements[index]) * 100;
    });
  };

  console.log("udpated Transactions ", transactions);
  
  const updatedTransactions = calculateTotals(inputValues);
  const monthlyTreasury = calculateMonthlyTreasury(updatedTransactions);
  const initialSolde = transactions.encaissements[transactions.encaissements.length - 1].montantInitial -
    transactions.decaissements[transactions.decaissements.length - 1].montantInitial;
  const accumulatedTreasury = calculateAccumulatedTreasury(initialSolde, updatedTransactions);
  const finalTreasury = accumulatedTreasury[accumulatedTreasury.length - 1];
  const percentageBalanceVsEncaissements = calculatePercentageBalanceVsEncaissements(monthlyTreasury, updatedTransactions.encaissements[updatedTransactions.encaissements.length - 1].montants);

  const handleTransactionChange = (event) => {
    const name = event.target.value;
    setTransactionName(name);
    const savedTransactions = localStorage.getItem(name);
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
      setInputValues(JSON.parse(savedTransactions));
    } else {
      setTransactions(initialTransactions);
      setInputValues(initialTransactions);
    }
  };

  const handleNewTransaction = () => {
    const name = prompt('Enter name for new transaction set:');
    if (name) {
      localStorage.setItem(name, JSON.stringify(initialTransactions));
      setAvailableTransactions([...availableTransactions, name]);
      setTransactionName(name);
      setTransactions(initialTransactions);
      setInputValues(initialTransactions);
    }
  };

  const handleColumnMenuOpen = (event, monthIndex) => {
    setSelectedTransaction({ type: '', index: -1, month: monthIndex });
    setColumnMenuAnchorEl(event.currentTarget);
  };

  const handleNatureMenuOpen = (event, type, index) => {
    setSelectedTransaction({ type, index, month: -1 });
    setNatureMenuAnchorEl(event.currentTarget);
  };

  const handleColumnMenuClose = () => {
    setColumnMenuAnchorEl(null);
  };

  const handleNatureMenuClose = () => {
    setNatureMenuAnchorEl(null);
  };

  const handleCopyColumn = () => {
    const { month } = selectedTransaction;
    const columnData = [];

    Object.keys(transactions).forEach((type) => {
      transactions[type].forEach((transaction) => {
        columnData.push(transaction.montants[month]);
      });
    });

    navigator.clipboard.writeText(JSON.stringify(columnData));
    handleColumnMenuClose();
    setSnackbarMessage(`Copied data of month ${monthNames[month + 1]}`);
    setSnackbarOpen(true);
  };

  const handlePasteColumn = () => {
    const { month } = selectedTransaction;

    navigator.clipboard.readText().then((text) => {
      const columnData = JSON.parse(text);
      const updatedTransactions = { ...transactions };

      let rowIndex = 0;
      Object.keys(transactions).forEach((type) => {
        transactions[type].forEach((transaction, index) => {
          if (rowIndex < columnData.length) {
            updatedTransactions[type][index].montants[month] = columnData[rowIndex];
            rowIndex++;
          }
        });
      });

      setTransactions(updatedTransactions);
    });
    handleColumnMenuClose();
    setSnackbarMessage(`Pasted data to month ${monthNames[month + 1]}`);
    setSnackbarOpen(true);
  };

  const handleCopyNatureRow = () => {
    const { type, index } = selectedTransaction;
    const rowData = transactions[type][index];

    navigator.clipboard.writeText(JSON.stringify(rowData));
    handleNatureMenuClose();
    setSnackbarMessage(`Copied row ${rowData.nature}`);
    setSnackbarOpen(true);
  };

  const handlePasteNatureRow = () => {
    const { type, index } = selectedTransaction;

    navigator.clipboard.readText().then((text) => {
      const rowData = JSON.parse(text);
      const updatedTransactions = { ...transactions };

      updatedTransactions[type][index] = { ...rowData }; // Create a copy of the row data to avoid modifying the source
      setTransactions(updatedTransactions);
    });
    handleNatureMenuClose();
    setSnackbarMessage(`Pasted row to ${type.charAt(0).toUpperCase() + type.slice(1)}`);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
    setSnackbarMessage('');
  };

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <FormControl>
          <InputLabel id="transaction-select-label">Select Transaction</InputLabel>
          <Select
            labelId="transaction-select-label"
            value={transactionName}
            onChange={handleTransactionChange}
          >
            {availableTransactions.map((name) => (
              <MenuItem key={name} value={name}>{name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleNewTransaction} style={{ marginLeft: 20 }}>
          New Transaction Set
        </Button>
      </div>
      <div style={{ position: 'absolute', visibility: 'hidden', height: 0, whiteSpace: 'nowrap' }} />
      <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100vw' }}>
        <Typography variant="h4" align="center" gutterBottom>
          Gestion de Trésorerie
        </Typography>
        <Table sx={{ minWidth: 650, width: '100vw' }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell padding="normal" align="left">Type</TableCell>
              <TableCell padding="normal" align="left">Nature de la transaction</TableCell>
              <TableCell padding="normal" align="left">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography align="left" gutterBottom style={{ flexGrow: 1 }}>
                    Solde Initial
                  </Typography>
                  <IconButton
                    aria-label="open column menu"
                    onClick={(event) => handleColumnMenuOpen(event, -1)}
                    edge="end"
                    size="small"
                    style={{ marginLeft: 'auto' }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </TableCell>
              {monthNames.slice(1).map((month, i) => (
                <TableCell key={i} align="left" padding="normal">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography align="left" gutterBottom style={{ flexGrow: 1 }}>
                      {month}
                    </Typography>
                    <IconButton
                      aria-label="open column menu"
                      onClick={(event) => handleColumnMenuOpen(event, i)}
                      edge="end"
                      size="small"
                      style={{ marginLeft: 'auto' }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </div>
                </TableCell>
              ))}
              <TableCell align="left" padding="normal">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(inputValues).map((type) => (
              <React.Fragment key={type}>
                {inputValues[type].map((transaction, index) => {
                  const isHighlighted = (type === 'encaissements' && highlightedRow.encaissements === transaction.nature) ||
                    (type === 'decaissements' && highlightedRow.decaissements === transaction.nature);

                  return (
                    <TableRow key={index}>
                      {index === 0 && (
                        <TableCell
                          rowSpan={inputValues[type].length}
                          padding="normal"
                          align="left"
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
                      <TableCell padding="normal" align="left" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}>
                        {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'nature' ? (
                          <TextField
                            value={transaction.nature}
                            onChange={(e) => handleInputChange(type, index, 'nature', e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            fullWidth
                            inputProps={{
                              style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                            }}
                          />
                        ) : (
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div onClick={() => handleFocus(type, index, 'nature')} style={{ height: '36px', padding: '0 8px', minWidth: '120px', whiteSpace: 'nowrap', flexGrow: 1 }}>
                              {transaction.nature}
                            </div>
                            <IconButton
                              aria-label="open nature menu"
                              onClick={(event) => handleNatureMenuOpen(event, type, index)}
                              edge="end"
                              size="small"
                              style={{ marginLeft: 'auto' }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </div>
                        )}
                      </TableCell>
                      <TableCell padding="normal" align="left" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}>
                        {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'montantInitial' ? (
                          <TextField
                            value={transaction.montantInitial}
                            onChange={(e) => handleInputChange(type, index, 'montantInitial', e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            fullWidth
                            inputProps={{
                              style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                            }}
                          />
                        ) : (
                          <div onClick={() => handleFocus(type, index, 'montantInitial')} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            {transaction.montantInitial}
                            <IconButton
                              aria-label="open menu"
                              onClick={(event) => handleMenuOpen(event, type, index, -1)}
                              edge="end"
                              size="small"
                            >
                              <MoreVertIcon />
                            </IconButton>
                          </div>
                        )}
                      </TableCell>
                      {transaction.montants.map((montant, i) => (
                        <TableCell
                          padding="normal"
                          key={i}
                          sx={{ backgroundColor: highlightedMonth === i ? 'rgba(255, 0, 0, 0.1)' : isHighlighted ? 'rgba(0, 0, 255, 0.1)' : (highlightedCumulativeMonth !== null && i <= highlightedCumulativeMonth) ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}
                        >
                          {editingCell?.type === type && editingCell?.index === index && editingCell?.key === i ? (
                            <TextField
                              value={montant}
                              onChange={(e) => handleInputChange(type, index, i, e.target.value)}
                              onBlur={handleBlur}
                              onKeyDown={handleKeyDown}
                              fullWidth
                              InputProps={{
                                sx: { height: '36px', minWidth: '120px', padding: '0 2px', '& input': { padding: '5px' } },
                                endAdornment: i !== 11 && (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="open menu"
                                      onClick={(event) => handleMenuOpen(event, type, index, i)}
                                      edge="end"
                                      size="small"
                                    >
                                      <MoreVertIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          ) : (
                            <div onClick={() => handleFocus(type, index, i)} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              {montant}
                                <IconButton
                                  aria-label="open menu"
                                  onClick={(event) => handleMenuOpen(event, type, index, i)}
                                  edge="end"
                                  size="small"
                                >
                                  <MoreVertIcon />
                                </IconButton>
                            </div>
                          )}
                        </TableCell>
                      ))}
                      <TableCell align="left" padding="normal" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit', fontWeight: 'bold' }}>
                        {calculateTotal(type, index, inputValues)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Solde de la Trésorerie</TableCell>
              {monthlyTreasury.map((treasury, index) => (
                <TableCell
                  key={index}
                  align="left"
                  padding="normal"
                  sx={{ backgroundColor: highlightedMonth === index ? 'rgba(255, 0, 0, 0.1)' : 'inherit', fontWeight: 'bold' }}
                >
                  {treasury}
                </TableCell>
              ))}
              <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>{finalTreasury}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Trésorerie Accumulée</TableCell>
              {accumulatedTreasury.map((treasury, index) => (
                <TableCell
                  key={index}
                  align="left"
                  padding="normal"
                  sx={{ backgroundColor: highlightedMonth === index ? 'rgba(255, 0, 0, 0.1)' : 'inherit', fontWeight: 'bold' }}
                >
                  {treasury}
                </TableCell>
              ))}
              <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>{finalTreasury}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Percentage of Treasury vs Encaissements</TableCell>
              {percentageBalanceVsEncaissements.map((value, index) => (
                <TableCell
                  key={index}
                  align="left"
                  padding="normal"
                  sx={{ backgroundColor: value < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
                >
                  {value.toFixed(2)}%
                </TableCell>
              ))}
              <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>-</TableCell>
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
      <Menu
        anchorEl={columnMenuAnchorEl}
        open={Boolean(columnMenuAnchorEl)}
        onClose={handleColumnMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleCopyColumn}>Copy Column</MenuItem>
        <MenuItem onClick={handlePasteColumn}>Paste Column</MenuItem>
      </Menu>
      <Menu
        anchorEl={natureMenuAnchorEl}
        open={Boolean(natureMenuAnchorEl)}
        onClose={handleNatureMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleCopyNatureRow}>Copy Row</MenuItem>
        <MenuItem onClick={handlePasteNatureRow}>Paste Row</MenuItem>
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
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      />
    </>
  );
};

export default TreasuryTable;
