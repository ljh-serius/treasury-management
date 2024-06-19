import React, { useState, useEffect } from 'react';
import { Fab, Button, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import ExcelJS from 'exceljs';
import TransactionTable from './TransactionTable';
import TransactionActionsMenu from './TransactionActionsMenu';
import ModalDialog from './ModalDialog';
import ChartContainer from './ChartContainer';
import {
  monthNames, calculateTotals, calculateMonthlyTreasury,
  calculateAccumulatedTreasury, prepareChartData, prepareCumulativeTreasuryData,
  prepareMonthlyTreasuryData, calculateTotal
} from './transactionHelpers';

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
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [columnMenuAnchorEl, setColumnMenuAnchorEl] = useState(null);
  const [natureMenuAnchorEl, setNatureMenuAnchorEl] = useState(null);
  const [action, setAction] = useState('');
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState({ type: '', index: -1, month: -1 });

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

  const handleConfirm = (addSum = false) => {
    const { type, index, month } = selectedTransaction;
    const updatedTransactions = { ...transactions };

    if (!updatedTransactions[type] || !updatedTransactions[type][index] || !updatedTransactions[type][index].montants) {
      console.error("Invalid transaction structure or data");
      handleMenuClose();
      setModalOpen(false);
      setAction('');
      return;
    }

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
      updatedTransactions[type][index].montants[month + newMonth + 1] += amount;
    } else if (action === 'repeatUntil' && selectedMonths.length === 1) {
      const endMonth = selectedMonths[0];
      const amount = updatedTransactions[type][index].montants[month];
      for (let m = month + 1; m <= month + 1 + endMonth; m++) {
        updatedTransactions[type][index].montants[m] = amount;
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

  const handleFabClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuActionClose = () => {
    setAnchorEl(null);
  };

  const handleAddTransaction = (type) => {
    const updatedTransactions = { ...transactions };
    if (!updatedTransactions[type]) {
      updatedTransactions[type] = [];
    }
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

  const getAvailableMonths = () => {
    const { month } = selectedTransaction;
    if (action === 'postpone') {
      return monthNames.slice(month + 2); // Start from month + 2 to exclude the current and previous months
    }
    if (action === 'advance') {
      return monthNames.slice(1, month + 1); // List previous months up to the month before the selected month
    }
    if (action === 'repeatUntil') {
      return monthNames.slice(month + 2); // Start from month + 2 to exclude the current and previous months
    }
    return monthNames.slice(1); // Default case to show all months
  };

  return (
    <>
      <TransactionTable
        transactions={transactions}
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
      <TransactionActionsMenu
        anchorEl={anchorEl}
        handleMenuActionClose={handleMenuActionClose}
        handleAddTransaction={handleAddTransaction}
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
        type="nature"
      />
      <ModalDialog
        modalOpen={modalOpen}
        handleCancel={handleCancel}
        getAvailableMonths={getAvailableMonths}
        selectedMonths={selectedMonths}
        setSelectedMonths={setSelectedMonths}
        handleConfirm={handleConfirm}
        action={action}
        selectedTransaction={selectedTransaction}
      />
     <Grid container spacing={1} style={{ marginTop: 16 }}> 
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
