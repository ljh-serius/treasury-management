import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';
import { calculateTotals, calculateMonthlyTreasury } from './transactionHelpers';

const BudgetSummary = ({ transactions }) => {
    const updatedTransactions = calculateTotals(transactions);
    const totalEncaissements = updatedTransactions.encaissements[updatedTransactions.encaissements.length - 1].montants.reduce((acc, val) => acc + val, 0);
    const totalDecaissements = updatedTransactions.decaissements[updatedTransactions.decaissements.length - 1].montants.reduce((acc, val) => acc + val, 0);
    const monthlyTreasury = calculateMonthlyTreasury(updatedTransactions);
    const netTreasuryBalance = monthlyTreasury.reduce((acc, curr) => acc + curr, 0);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
                <Card sx={{ margin: '10px 0' }}>
                    <CardContent>
                        <Typography variant="h6" align="left" gutterBottom>
                            Total Encaissements
                        </Typography>
                        <Typography variant="h4" align="left">
                            {totalEncaissements.toFixed(2)} €
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ margin: '10px 0' }}>
                    <CardContent>
                        <Typography variant="h6" align="left" gutterBottom>
                            Total Décaissements
                        </Typography>
                        <Typography variant="h4" align="left">
                            {totalDecaissements.toFixed(2)} €
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card sx={{ margin: '10px 0' }}>
                    <CardContent>
                        <Typography variant="h6" align="left" gutterBottom>
                            Net Treasury Balance
                        </Typography>
                        <Typography variant="h4" align="left" color={netTreasuryBalance < 0 ? 'error' : 'primary'}>
                            {netTreasuryBalance.toFixed(2)} €
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
};

export default BudgetSummary;
