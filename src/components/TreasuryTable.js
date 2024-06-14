import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography,
  Fab, Menu, MenuItem, Button, Checkbox, IconButton, InputAdornment, Grid
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TreasuryChart from './TreasuryChart';

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

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const TreasuryTable = () => {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : initialTransactions;
  });

  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [action, setAction] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({ type: '', index: -1, month: -1 });
  const [encaissementsData, setEncaissementsData] = useState([]);
  const [decaissementsData, setDecaissementsData] = useState([]);
  const [cumulativeTreasuryData, setCumulativeTreasuryData] = useState([]);
  const [monthlyTreasuryData, setMonthlyTreasuryData] = useState([]);

  useEffect(() => {
    const updatedTransactions = calculateTotals(transactions);
    setEncaissementsData(prepareChartData('encaissements', updatedTransactions));
    setDecaissementsData(prepareChartData('decaissements', updatedTransactions));
    setCumulativeTreasuryData(prepareCumulativeTreasuryData(updatedTransactions));
    setMonthlyTreasuryData(prepareMonthlyTreasuryData(updatedTransactions));

    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  }, [transactions]);

  const handleInputChange = (type, index, key, value) => {
    const updatedTransactions = { ...transactions };
    if (key === 'montantInitial') {
      updatedTransactions[type][index][key] = parseFloat(value) || 0;
    } else if (key === 'nature') {
      updatedTransactions[type][index][key] = value;
    } else {
      updatedTransactions[type][index].montants[key] = parseFloat(value) || 0;
    }
    setTransactions(updatedTransactions);
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
  };

  const handleMonthSelect = (month) => {
    if (action === 'repeatUntil' && selectedMonths.length === 1) {
      return;
    }
    setSelectedMonths((prev) => {
      if (prev.includes(month)) {
        return prev.filter((m) => m !== month);
      } else {
        return [...prev, month];
      }
    });
  };

  const handleConfirm = () => {
    const { type, index, month } = selectedTransaction;
    const updatedTransactions = { ...transactions };

    if (action === 'repeat') {
      const amount = updatedTransactions[type][index].montants[month];
      selectedMonths.forEach((m) => {
        updatedTransactions[type][index].montants[m] = amount;
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
        updatedTransactions[type][index].montants[m] += amount;
      }
    }

    setTransactions(updatedTransactions);
    handleMenuClose();
    setAction('');
  };

  const handleCancel = () => {
    setAction('');
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

  const monthlyTreasury = calculateMonthlyTreasury(transactions);
  const initialSolde = transactions.encaissements[transactions.encaissements.length - 1].montantInitial - 
                       transactions.decaissements[transactions.decaissements.length - 1].montantInitial;
  const accumulatedTreasury = calculateAccumulatedTreasury(initialSolde, transactions);
  const finalTreasury = accumulatedTreasury[accumulatedTreasury.length - 1];

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

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Gestion de Trésorerie
        </Typography>
        {action && (
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <Button variant="contained" color="primary" onClick={handleConfirm} style={{ marginRight: 8 }}>Confirm</Button>
            <Button variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
          </div>
        )}
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell padding="normal">Type</TableCell>
              <TableCell padding="normal">Nature de la transaction</TableCell>
              <TableCell padding="normal">Solde Initial</TableCell>
              {monthNames.map((month, i) => {
                const showCheckbox =
                  (action === 'repeat' && i > selectedTransaction.month) ||
                  (action === 'advance' && i < selectedTransaction.month) ||
                  (action === 'postpone' && i > selectedTransaction.month) ||
                  (action === 'repeatUntil' && i > selectedTransaction.month);
                return (
                  <TableCell key={i} align="left" padding="normal">
                    {month}
                    {showCheckbox && (
                      <Checkbox
                        checked={selectedMonths.includes(i)}
                        onChange={() => handleMonthSelect(i)}
                      />
                    )}
                  </TableCell>
                );
              })}
              <TableCell align="right" padding="normal">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(transactions).map((type) => (
              <React.Fragment key={type}>
                {transactions[type].map((transaction, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {index === 0 && (
                      <TableCell rowSpan={transactions[type].length} padding="normal">
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </TableCell>
                    )}
                    <TableCell padding="normal">
                      <TextField
                        value={transaction.nature}
                        onChange={(e) => handleInputChange(type, index, 'nature', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                        InputProps={{
                          disableUnderline: true,
                          style: { height: '100%', padding: 8 }, // Added padding
                        }}
                      />
                    </TableCell>
                    <TableCell padding="normal">
                      <TextField
                        value={transaction.montantInitial}
                        onChange={(e) => handleInputChange(type, index, 'montantInitial', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                        InputProps={{
                          disableUnderline: true,
                          style: { height: '100%', padding: 8 }, // Added padding
                        }}
                      />
                    </TableCell>
                    {transaction.montants.map((montant, i) => (
                      <TableCell padding="normal" key={i} align="right">
                        <TextField
                          value={montant}
                          onChange={(e) => handleInputChange(type, index, i, e.target.value)}
                          variant="standard"
                          size="small"
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            style: { height: '100%', padding: 8 }, // Added padding
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
                    <TableCell align="right" padding="normal">{calculateTotal(type, index, transactions)}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell colSpan={3} padding="normal">Solde de la Trésorerie</TableCell>
              {monthlyTreasury.map((treasury, index) => (
                <TableCell key={index} align="right" padding="normal">{treasury}</TableCell>
              ))}
              <TableCell align="right" padding="normal">{finalTreasury}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} padding="normal">Trésorerie Accumulée</TableCell>
              {accumulatedTreasury.map((treasury, index) => (
                <TableCell key={index} align="right" padding="normal">{treasury}</TableCell>
              ))}
              <TableCell align="right" padding="normal">{finalTreasury}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Fab color="primary" aria-label="add" onClick={handleFabClick} style={{ position: 'fixed', bottom: 16, right: 16 }}>
        <AddIcon />
      </Fab>
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
      <Grid container spacing={3} style={{ marginTop: 16 }}>
        <Grid item xs={12} md={6}>
          <TreasuryChart title="Encaissements by Nature" data={encaissementsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TreasuryChart title="Décaissements by Nature" data={decaissementsData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TreasuryChart title="Solde de Trésorie" data={monthlyTreasuryData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TreasuryChart title="Trésorerie Cummulée" data={cumulativeTreasuryData} />
        </Grid>
      </Grid>
    </>
  );
};

export default TreasuryTable;
