import React from 'react';
import { Card, CardContent, Typography, Grid, Paper } from '@mui/material';
import {
  calculateTotals,
  calculateMonthlyTreasury,
  calculateAccumulatedTreasury,
  calculateTotal,
  initialTransactions,
} from './transactionHelpers';

const BudgetSummary = ({transactions}) => {
  // Calculate totals for encaissements and decaissements
  const totals = calculateTotals(transactions);

  // Initial balances
  const initialEncaissements = totals.encaissements[totals.encaissements.length - 1].montantInitial;
  const initialDecaissements = totals.decaissements[totals.encaissements.length - 1].montantInitial;
  const initialBalance = initialEncaissements - initialDecaissements;

  // Total amounts
  const totalEncaissements = calculateTotal('encaissements', totals.encaissements.length - 1, transactions);
  const totalDecaissements = calculateTotal('decaissements', totals.decaissements.length - 1, transactions);

  console.log(totalEncaissements)
  // Final treasury balance
  const finalTreasury = totalEncaissements - totalDecaissements;

  return (
    <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e3f2fd' }}>
            <CardContent>
              <Typography variant="h6">Initial Balance</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {initialBalance.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6">Total Encaissements</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {totalEncaissements.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: '#ffebee' }}>
            <CardContent>
              <Typography variant="h6">Total Decaissements</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                {totalDecaissements.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ backgroundColor: finalTreasury < 0 ? '#ffebee' : '#e8f5e9' }}>
            <CardContent>
              <Typography variant="h6">Final Treasury</Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: finalTreasury < 0 ? 'red' : 'green',
                }}
              >
                {finalTreasury.toFixed(2)}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BudgetSummary;
