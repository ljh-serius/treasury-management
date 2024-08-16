import React, { useState, useEffect } from 'react';
import { Container, Grid, Box, Button, Typography } from '@mui/material';
import { DataGrid, GridToolbar, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid';
import {
  monthNames, calculateMonthlyTreasury, calculateAccumulatedTreasury,
  prepareChartData, prepareCumulativeTreasuryData, prepareMonthlyTreasuryData, calculateTotals
} from './transactionHelpers';
import TreasuryChart from './TreasuryChart'; // Import your chart component

const calculateTotal = (type, index, transactions) => {
  const transaction = {...transactions[type][index]};
  if (!transaction || !transaction.montants) return 0;

  const total = transaction.montants.reduce((sum, amount) => sum + (amount || 0), 0);
  return total;
};

const TreasuryTable = ({ 
  transactions = { encaissements: [], decaissements: [] }, 
  showAnalytics = false,
  bookName,   // New prop for book name
  entityName  // New prop for entity name
}) => {
  const [encaissementsData, setEncaissementsData] = useState([]);
  const [decaissementsData, setDecaissementsData] = useState([]);
  const [cumulativeTreasuryData, setCumulativeTreasuryData] = useState([]);
  const [monthlyTreasuryData, setMonthlyTreasuryData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

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
  }, [transactions]);

  const generateRows = () => {
    const rows = [];
    const encaissements = transactions.encaissements || [];
    const decaissements = transactions.decaissements || [];
    const displayedMonths = monthNames.slice(1);
  
    // Find the "Total Category" in encaissements and decaissements
    const totalEncaissements = encaissements.find((transaction) => transaction.nature === 'Total Revenues');
    const totalDecaissements = decaissements.find((transaction) => transaction.nature === 'Total Expenses');
  
    // Calculate the difference for each month
    const treasuryBalance = displayedMonths.map((_, i) => {
      const encaissementAmount = totalEncaissements?.montants[i] || 0;
      const decaissementAmount = totalDecaissements?.montants[i] || 0;
      return encaissementAmount - decaissementAmount;
    });
  
    // Push rows for encaissements and decaissements
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
          total: calculateTotal(type, index, transactions) || 0, // Ensure total is defined
        });
      });
    });
  
    // Add the row for Treasury Balance (Difference between Total Category in encaissements and decaissements)
    rows.push({
      id: 'treasury-balance',
      type: 'Treasury Balance',
      ...displayedMonths.reduce((acc, _, i) => {
        acc[`month_${i}`] = treasuryBalance[i];
        return acc;
      }, {}),
      total: treasuryBalance.reduce((acc, curr) => acc + curr, 0) || 0, // Ensure total is defined
    });
  
    // Calculate accumulated treasury based on the Treasury Balance
    const accumulatedTreasury = treasuryBalance.reduce((acc, value, index) => {
      acc[index] = (acc[index - 1] || 0) + value;
      return acc;
    }, []);
  
    // Add the row for Accumulated Treasury
    rows.push({
      id: 'accumulated-treasury',
      type: 'Accumulated Treasury',
      ...displayedMonths.reduce((acc, _, i) => {
        acc[`month_${i}`] = accumulatedTreasury[i];
        return acc;
      }, {}),
      total: accumulatedTreasury.slice(-1)[0] || 0, // Ensure total is defined
    });
  
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
        return params
      },
    }
  ];

  // Custom Toolbar with export and copy functionalities
  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarExport />
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          const csvData = rows.map(row => columns.map(col => row[col.field] || '').join(',')).join('\n');
          const blob = new Blob([csvData], { type: 'text/csv' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'data.csv';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }}
        sx={{ ml: 1 }}
      >
        Export to CSV
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => {
          if (selectedRows.length === 0) {
            alert('No rows selected!');
            return;
          }
          const selectedData = selectedRows.map(rowId => {
            const row = rows.find(row => row.id === rowId);
            return columns.map(col => row[col.field] || '').join('\t');
          }).join('\n');
          navigator.clipboard.writeText(selectedData).then(() => {
            alert('Copied to clipboard!');
          }).catch(err => {
            alert('Failed to copy to clipboard!');
            console.error(err);
          });
        }}
        sx={{ ml: 1 }}
      >
        Copy Selected
      </Button>
    </GridToolbarContainer>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 12, mb: 12 }}>
      <Box sx={{ mb: 4, textAlign: 'left' }}>
        { bookName && <Typography variant="h6"><strong>Book : </strong> {bookName}</Typography> }
        { entityName && <Typography variant="h6"><strong>Entity : </strong> {entityName}</Typography> }
      </Box>

      {!showAnalytics && (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: CustomToolbar }}
            disableSelectionOnClick
            disableAutosize
            disableColumnResize
            hideFooter
            pagination
            selectionModel={selectedRows}
            onSelectionModelChange={(newSelection) => {
              setSelectedRows(newSelection);
            }}
            sx={{
              width: '80%', // Adjust the width as needed
              '& .MuiDataGrid-main': {
                minWidth: '100%',
              },
            }}
          />
        </Box>
      )}

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
