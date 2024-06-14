import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Typography,
  Fab, Menu, MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

const TreasuryTable = () => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const calculateTotals = () => {
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
    setTransactions(updatedTransactions);
  };

  useEffect(() => {
    calculateTotals();
  }, [transactions]);

  const calculateMonthlyTreasury = () => {
    return Array.from({ length: 12 }, (_, month) => {
      const totalEncaissements = transactions.encaissements[transactions.encaissements.length - 1].montants[month];
      const totalDecaissements = transactions.decaissements[transactions.decaissements.length - 1].montants[month];
      return totalEncaissements - totalDecaissements;
    });
  };

  const calculateAccumulatedTreasury = (initialSolde) => {
    const monthlyTreasury = calculateMonthlyTreasury();
    return monthlyTreasury.reduce((acc, value, index) => {
      if (index === 0) acc.push(value + initialSolde);
      else acc.push(acc[index - 1] + value);
      return acc;
    }, []);
  };

  const calculateTotal = (type, index) => {
    const transaction = transactions[type][index];
    return transaction.montants.reduce((acc, curr) => acc + curr, 0) + transaction.montantInitial;
  };

  const totalEncaissements = transactions.encaissements[transactions.encaissements.length - 1].montants.reduce(
    (acc, curr) => acc + curr,
    transactions.encaissements[transactions.encaissements.length - 1].montantInitial
  );
  const totalDecaissements = transactions.decaissements[transactions.decaissements.length - 1].montants.reduce(
    (acc, curr) => acc + curr,
    transactions.decaissements[transactions.decaissements.length - 1].montantInitial
  );
  const monthlyTreasury = calculateMonthlyTreasury();
  const initialSolde = transactions.encaissements[transactions.encaissements.length - 1].montantInitial - 
                       transactions.decaissements[transactions.decaissements.length - 1].montantInitial;
  const accumulatedTreasury = calculateAccumulatedTreasury(initialSolde);
  const finalTreasury = accumulatedTreasury[accumulatedTreasury.length - 1];

  const handleFabClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAddTransaction = (type) => {
    const updatedTransactions = { ...transactions };
    updatedTransactions[type].splice(updatedTransactions[type].length - 1, 0, { nature: '', montantInitial: 0, montants: Array(12).fill(0) });
    setTransactions(updatedTransactions);
    handleMenuClose();
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Gestion de Trésorerie
        </Typography>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Nature de la transaction</TableCell>
              <TableCell>Solde Initial</TableCell>
              {[...Array(12).keys()].map((i) => (
                <TableCell key={i} align="right">Mois {i + 1}</TableCell>
              ))}
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Object.keys(transactions).map((type) => (
              <React.Fragment key={type}>
                {transactions[type].map((transaction, index) => (
                  <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    {index === 0 && (
                      <TableCell rowSpan={transactions[type].length}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </TableCell>
                    )}
                    <TableCell padding="none">
                      <TextField
                        value={transaction.nature}
                        onChange={(e) => handleInputChange(type, index, 'nature', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                        InputProps={{
                          disableUnderline: true,
                          style: { height: '100%', padding: 0 },
                        }}
                      />
                    </TableCell>
                    <TableCell padding="none">
                      <TextField
                        value={transaction.montantInitial}
                        onChange={(e) => handleInputChange(type, index, 'montantInitial', e.target.value)}
                        variant="standard"
                        size="small"
                        fullWidth
                        InputProps={{
                          disableUnderline: true,
                          style: { height: '100%', padding: 0 },
                        }}
                      />
                    </TableCell>
                    {transaction.montants.map((montant, i) => (
                      <TableCell padding="none" key={i} align="right">
                        <TextField
                          value={montant}
                          onChange={(e) => handleInputChange(type, index, i, e.target.value)}
                          variant="standard"
                          size="small"
                          fullWidth
                          InputProps={{
                            disableUnderline: true,
                            style: { height: '100%', padding: 0 },
                          }}
                        />
                      </TableCell>
                    ))}
                    <TableCell align="right">{calculateTotal(type, index)}</TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
            <TableRow>
              <TableCell colSpan={3}>Solde de la Trésorerie</TableCell>
              {monthlyTreasury.map((treasury, index) => (
                <TableCell key={index} align="right">{treasury}</TableCell>
              ))}
              <TableCell align="right">{finalTreasury}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3}>Trésorerie Accumulée</TableCell>
              {accumulatedTreasury.map((treasury, index) => (
                <TableCell key={index} align="right">{treasury}</TableCell>
              ))}
              <TableCell align="right">{finalTreasury}</TableCell>
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
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleAddTransaction('encaissements')}>Encaissement</MenuItem>
        <MenuItem onClick={() => handleAddTransaction('decaissements')}>Décaissement</MenuItem>
      </Menu>
    </>
  );
};

export default TreasuryTable;
