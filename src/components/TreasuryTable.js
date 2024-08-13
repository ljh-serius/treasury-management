// TreasuryTable.js

import React, { useState, useEffect } from 'react';
import { Button, Grid } from '@mui/material';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs';
import TransactionTable from './TransactionTable';
import TransactionActionsMenu from './TransactionActionsMenu';
import ChartContainer from './ChartContainer';
import {
  monthNames, calculateTotals, calculateMonthlyTreasury,
  calculateAccumulatedTreasury, prepareChartData, prepareCumulativeTreasuryData,
  prepareMonthlyTreasuryData, calculateTotal
} from './transactionHelpers';
import { auth } from '../utils/firebaseConfig';

// Utility to get the current time
const getCurrentTime = () => new Date().getTime();

// Utility to check if data should be refetched
const shouldRefetchData = (lastFetchTime, intervalInMs = 3600000) => {
  const currentTime = getCurrentTime();
  return !lastFetchTime || (currentTime - lastFetchTime) > intervalInMs;
};

const saveToLocalStorage = (userId, key, data) => {
  if (!userId) return;
  const fullKey = `${userId}_${key}`;
  const dataToStore = {
    timestamp: getCurrentTime(),
    data
  };
  localStorage.setItem(fullKey, JSON.stringify(dataToStore));
};


const loadFromLocalStorage = (userId, key) => {
  if (!userId) return null;
  const fullKey = `${userId}_${key}`;
  const storedData = localStorage.getItem(fullKey);
  if (storedData) {
    return JSON.parse(storedData);
  }
  return null;
};

const TreasuryTable = ({ transactions, setTransactions, transactionName, setSnackbarMessage, setSnackbarOpen }) => {
  const [inputValues, setInputValues] = useState(transactions);
  const [editingCell, setEditingCell] = useState(null);
  const [encaissementsData, setEncaissementsData] = useState([]);
  const [decaissementsData, setDecaissementsData] = useState([]);
  const [cumulativeTreasuryData, setCumulativeTreasuryData] = useState([]);
  const [monthlyTreasuryData, setMonthlyTreasuryData] = useState([]);
  const [highlightedRow, setHighlightedRow] = useState({ encaissements: null, decaissements: null });
  const [highlightedMonth, setHighlightedMonth] = useState(null);
  const [highlightedCumulativeMonth, setHighlightedCumulativeMonth] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = useState(null);
  const [natureMenuAnchorEl, setNatureMenuAnchorEl] = useState(null);
  const [action, setAction] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({ type: '', index: -1, month: -1 });
  const userId = auth.currentUser?.uid;
  useEffect(() => {
    setInputValues(transactions); // Synchronize inputValues with transactions prop
  }, [transactions]);

  useEffect(() => {
    const updatedTransactions = calculateTotals(transactions);
    setEncaissementsData(prepareChartData('encaissements', updatedTransactions));
    setDecaissementsData(prepareChartData('decaissements', updatedTransactions));
    setCumulativeTreasuryData(prepareCumulativeTreasuryData(updatedTransactions));
    setMonthlyTreasuryData(prepareMonthlyTreasuryData(updatedTransactions));
  }, [transactions]);

  const handleInputChange = (type, index, key, value) => {
    const updatedInputValues = { ...inputValues };
    if (key === 'montantInitial') {
      updatedInputValues[type][index][key] = parseFloat(value) || 0;
    } else if (key === 'nature') {
      updatedInputValues[type][index][key] = value;
    } else {
      updatedInputValues[type][index].montants[key] = parseFloat(value) || 0;
    }
    setInputValues(updatedInputValues); // Update the input values state
  };

  const handleBlur = () => {
    const updatedTransactions = calculateTotals(inputValues); // Recalculate totals
    setTransactions(updatedTransactions); // Update the transactions state with recalculated totals
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
    if (actionType === 'setMonths') {
      // Open modal for setting transaction details across months
      setModalOpen(true);
    } else {
      setAction(actionType);
      setSelectedMonths([]);
      setModalOpen(true);
    }
  };

  const handleConfirm = (name, amount) => {
    const { type, index } = selectedTransaction;
    const updatedTransactions = { ...transactions };

    selectedMonths.forEach((month) => {
      updatedTransactions[type][index].montants[month] = parseFloat(amount);
    });

    updatedTransactions[type][index].nature = name;

    setTransactions(updatedTransactions);
    setModalOpen(false);
    setAction('');
  };

  const handleCancel = () => {
    setAction('');
    setModalOpen(false);
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
      (transactions.encaissements[transactions.encaissements.length - 1]?.montantInitial || 0) -
      (transactions.decaissements[transactions.decaissements.length - 1]?.montantInitial || 0),
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

  const handleColumnMenuOpen = (event, monthIndex) => {
    setSelectedTransaction({ type: '', index: -1, month: monthIndex });
    setColumnMenuAnchorEl(event.currentTarget);
  };

  const handleNatureMenuOpen = (event, type, index, filters) => {
    saveToLocalStorage(userId, "selectedDetailsFilters", filters)
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
        if (month === -1) {
          columnData.push(transaction.montantInitial); // Handle "Solde Initial" column
        } else {
          columnData.push(transaction.montants[month]);
        }
      });
    });

    navigator.clipboard.writeText(JSON.stringify(columnData));
    handleColumnMenuClose();
    setSnackbarMessage(`Copied data of ${month === -1 ? 'Solde Initial' : 'month ' + monthNames[month + 1]}`);
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
            if (month === -1) {
              updatedTransactions[type][index].montantInitial = columnData[rowIndex]; // Handle "Solde Initial" column
            } else {
              updatedTransactions[type][index].montants[month] = columnData[rowIndex];
            }
            rowIndex++;
          }
        });
      });

      setTransactions(updatedTransactions);
    });
    handleColumnMenuClose();
    setSnackbarMessage(`Pasted data to ${month === -1 ? 'Solde Initial' : 'month ' + monthNames[month + 1]}`);
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

    useEffect(() => {
      setInputValues(transactions); 
    }, [transactions]);
  
    useEffect(() => {
      const updatedTransactions = calculateTotals(transactions);
      setEncaissementsData(prepareChartData('encaissements', updatedTransactions));
      setDecaissementsData(prepareChartData('decaissements', updatedTransactions));
      setCumulativeTreasuryData(prepareCumulativeTreasuryData(updatedTransactions));
      setMonthlyTreasuryData(prepareMonthlyTreasuryData(updatedTransactions));
    }, [transactions]);
  
    return (
      <>
       <Button
          variant="contained"
          color="primary"
          onClick={exportToSpreadsheet}
          style={{ height: 36, float: 'right', marginTop: 15, marginBottom: 20 }}
        >
          Export as Spreadsheet
        </Button>
        <TransactionTable
          inputValues={inputValues}
          setInputValues={setInputValues}
          handleInputChange={handleInputChange}
          setSelectedTransaction={setSelectedTransaction}
          handleFocus={handleFocus}
          handleBlur={handleBlur}
          handleKeyDown={handleKeyDown}
          handleMenuOpen={handleMenuOpen}
          handleColumnMenuOpen={handleColumnMenuOpen}
          handleNatureMenuOpen={handleNatureMenuOpen}
          editingCell={editingCell}
          highlightedRow={highlightedRow}
          highlightedMonth={highlightedMonth}
          highlightedCumulativeMonth={highlightedCumulativeMonth}
        />
  
        <TransactionActionsMenu
          anchorEl={menuAnchorEl}
          handleMenuClose={handleMenuClose}
          handleActionClick={handleActionClick}
          type="amount"
        />
        <TransactionActionsMenu
          anchorEl={columnMenuAnchorEl}
          handleMenuClose={handleColumnMenuClose}
          handleCopyColumn={handleCopyColumn}
          handlePasteColumn={handlePasteColumn}
          type="column"
        />
        <TransactionActionsMenu
          anchorEl={natureMenuAnchorEl}
          handleMenuClose={handleNatureMenuClose}
          handleCopyNatureRow={handleCopyNatureRow}
          handlePasteNatureRow={handlePasteNatureRow}
          transactionBookName={inputValues?.name}
          type="nature"

        />
        <Grid container style={{ handleNatureMenuOpenarginTop: 16 }}>
          <Grid item xs={12} md={6}>
            <ChartContainer
              title="Encaissements by Nature"
              data={encaissementsData}
              onHover={(seriesName) => handleChartHover('encaissements', seriesName)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <ChartContainer
              title="Décaissements by Nature"
              data={decaissementsData}
              onHover={(seriesName) => handleChartHover('decaissements', seriesName)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <ChartContainer
              title="Solde de Trésorie"
              data={monthlyTreasuryData}
              onHover={(seriesName, index) => handleMonthHighlight(index - 1)}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <ChartContainer
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
