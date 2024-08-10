import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const BudgetSummary = ({ transactions }) => {
    const encaissements = transactions.encaissements || [];
    const decaissements = transactions.decaissements || [];

    // Ensure that the totals are present
    const encaissementTotal = encaissements.find(e => e.nature === 'Total Encaissements') || { montants: [] };
    const decaissementTotal = decaissements.find(d => d.nature === 'Total Decaissements') || { montants: [] };

    // Calculate totals
    const totalEncaissements = encaissementTotal.montants.reduce((acc, val) => acc + val, 0);
    const totalDecaissements = decaissementTotal.montants.reduce((acc, val) => acc + val, 0);

    // Calculate initial balances
    const totalInitialEncaissements = encaissementTotal.montantInitial || 0;
    const totalInitialDecaissements = decaissementTotal.montantInitial || 0;
    const totalInitialBalances = totalInitialEncaissements - totalInitialDecaissements;

    // Calculate net treasury balance
    const netTreasuryBalance = totalEncaissements - totalDecaissements + totalInitialBalances;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
                <Card sx={{ margin: '5px 0' }}>
                    <CardContent>
                        <Typography variant="h6" align="left" gutterBottom>
                            Total Initial Balances
                        </Typography>
                        <Typography variant="h4" align="left">
                            {totalInitialBalances.toFixed(2)} €
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} md={3}>
                <Card sx={{ margin: '5px 0' }}>
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
            <Grid item xs={12} md={3}>
                <Card sx={{ margin: '5px 0' }}>
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
            <Grid item xs={12} md={3}>
                <Card sx={{ margin: '5px 0' }}>
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
