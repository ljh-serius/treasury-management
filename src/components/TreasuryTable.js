import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import {
  calculateTotal, monthNames, calculateMonthlyTreasury, calculateAccumulatedTreasury,
  prepareChartData, prepareCumulativeTreasuryData, prepareMonthlyTreasuryData, calculateTotals
} from './transactionHelpers';
import TreasuryChart from './TreasuryChart'; // Import your chart component

const TreasuryTable = ({ transactions = { encaissements: [], decaissements: [] }, headerHeight = 64, drawerWidth = 240, showAnalytics = false }) => {
  const [encaissementsData, setEncaissementsData] = useState([]);
  const [decaissementsData, setDecaissementsData] = useState([]);
  const [cumulativeTreasuryData, setCumulativeTreasuryData] = useState([]);
  const [monthlyTreasuryData, setMonthlyTreasuryData] = useState([]);

  useEffect(() => {
    const updatedInputValues = calculateTotals(transactions);

    const newEncaissementsData = prepareChartData('encaissements', updatedInputValues);
    const newDecaissementsData = prepareChartData('decaissements', updatedInputValues);
    const newCumulativeTreasuryData = prepareCumulativeTreasuryData(updatedInputValues);
    const newMonthlyTreasuryData = prepareMonthlyTreasuryData(updatedInputValues);

    setEncaissementsData(newEncaissementsData);
    setDecaissementsData(newDecaissementsData);
    setCumulativeTreasuryData(newCumulativeTreasuryData);
    setMonthlyTreasuryData(newMonthlyTreasuryData);
  }, []);

  const generateRows = () => {
    const rows = [];
    const encaissements = transactions.encaissements || [];
    const decaissements = transactions.decaissements || [];
    const monthlyTreasury = calculateMonthlyTreasury(transactions || {});
    const initialEncaissement = encaissements[encaissements.length - 1]?.montantInitial || 0;
    const initialDecaissement = decaissements[decaissements.length - 1]?.montantInitial || 0;
    const accumulatedTreasury = calculateAccumulatedTreasury(initialEncaissement - initialDecaissement, transactions || {});
    const displayedMonths = monthNames.slice(1);

    ["encaissements", "decaissements"].forEach((type) => {
      transactions[type]?.forEach((transaction, index) => {
        rows.push({
          id: `${type}-${index}`,
          type: type.charAt(0).toUpperCase() + type.slice(1),
          nature: transaction.nature || 'Unknown',
          initialBalance: transaction.montantInitial || 0,
          ...displayedMonths.reduce((acc, month, i) => {
            acc[`month_${i}`] = transaction.montants[i] || '';
            return acc;
          }, {}),
          total: calculateTotal(type, index, transactions),
        });
      });
    });

    if (monthlyTreasury.length) {
      rows.push({
        id: 'treasury-balance',
        type: 'Treasury Balance',
        ...displayedMonths.reduce((acc, _, i) => {
          acc[`month_${i}`] = monthlyTreasury[i];
          return acc;
        }, {}),
        total: monthlyTreasury.reduce((acc, curr) => acc + curr, 0),
      });
    }

    if (accumulatedTreasury.length) {
      rows.push({
        id: 'accumulated-treasury',
        type: 'Accumulated Treasury',
        ...displayedMonths.reduce((acc, _, i) => {
          acc[`month_${i}`] = accumulatedTreasury[i];
          return acc;
        }, {}),
        total: accumulatedTreasury.slice(-1)[0],
      });
    }

    return rows;
  };

  const rows = generateRows();

  const columns = [
    { field: 'type', headerName: 'Type', width: 150 },
    { field: 'nature', headerName: 'Nature of Transaction', width: 200, editable: true },
    { field: 'initialBalance', headerName: 'Initial Balance', width: 150, editable: true },
    ...monthNames.slice(1).map((month, index) => ({
      field: `month_${index}`,
      headerName: month,
      width: 150,
      editable: true,
    })),
    {
      field: 'total',
      headerName: 'Total',
      width: 150,
      valueGetter: (params) => {
        const { row } = params;
        if (row && row.type && typeof row.id !== 'undefined') {
          return calculateTotal(row.type.toLowerCase(), row.id.split('-')[1], transactions);
        }
        return null;
      },
    },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 12, mb: 12, width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
      {!showAnalytics && 
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            disableSelectionOnClick
            disableAutosize
            disableColumnResize
            hideFooter
            pagination
            sx={{
              width: '80%', // Adjust the width as needed
              '& .MuiDataGrid-main': {
                minWidth: '100%',
              },
            }}
          />
        </Box>
      }

      {showAnalytics && (
        <Grid container spacing={2} sx={{ mt: 4, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <Grid item xs={12} md={6}>
            <TreasuryChart
              title="Encaissements by Nature"
              data={encaissementsData}
              sx={{ width: '80%' }} // Adjust the width as needed
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TreasuryChart
              title="Décaissements by Nature"
              data={decaissementsData}
              sx={{ width: '80%' }} // Adjust the width as needed
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TreasuryChart
              title="Solde de Trésorerie"
              data={monthlyTreasuryData}
              sx={{ width: '80%' }} // Adjust the width as needed
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TreasuryChart
              title="Trésorerie Cumulée"
              data={cumulativeTreasuryData}
              sx={{ width: '80%' }} // Adjust the width as needed
            />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default TreasuryTable;
