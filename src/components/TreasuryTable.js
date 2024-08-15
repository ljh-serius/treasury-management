import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import {
  DataGrid,
  GridToolbar,
} from '@mui/x-data-grid';
import {
  calculateTotal, monthNames, calculateMonthlyTreasury, calculateAccumulatedTreasury, prepareChartData, prepareCumulativeTreasuryData,
  prepareMonthlyTreasuryData, calculateTotals
} from './transactionHelpers';

const TreasuryTable = ({ transactions = { encaissements: [], decaissements: [] }, headerHeight = 64, drawerWidth = 240, showAnalytics = false }) => {
  const [encaissementsData, setEncaissementsData] = useState([]);
  const [decaissementsData, setDecaissementsData] = useState([]);
  const [cumulativeTreasuryData, setCumulativeTreasuryData] = useState([]);
  const [monthlyTreasuryData, setMonthlyTreasuryData] = useState([]);

  useEffect(() => {
    // Only calculate and set state if transactions change
    const updatedInputValues = calculateTotals(transactions);

    // Prevent unnecessary updates by checking if the data is actually different
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
    <Container maxWidth="xl" sx={{ mt: 12, mb: 12, width: '100%' }}>
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
          marginLeft: `${drawerWidth}px`,
          '& .MuiDataGrid-main': {
            minWidth: '100%',
          },
        }}
        />
    </Container>
  );
};

export default TreasuryTable;
