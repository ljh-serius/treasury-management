import React from 'react';
import {
  Table, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, IconButton, InputAdornment
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  calculateTotal, monthNames, calculateMonthlyTreasury, calculateAccumulatedTreasury, calculatePercentageBalanceVsEncaissements
} from './transactionHelpers';

const TransactionTable = ({
  inputValues = {}, // Default to an empty object if inputValues is undefined
  handleInputChange,
  handleFocus, handleBlur, handleKeyDown, handleMenuOpen, handleColumnMenuOpen, handleNatureMenuOpen, editingCell,
  highlightedRow, highlightedMonth
}) => {
  console.log("TreasuryTable", inputValues)
  const presentedMonths = monthNames.slice(1);

  console.log("inputValuesinputValues", inputValues)
  console.log("inputValues", inputValues);

  // Filter displayed months based on input values
  const displayedMonths = presentedMonths.filter((_, monthIndex) =>
    ["encaissements", "decaissements"].some(type =>
      inputValues[type] && Array.isArray(inputValues[type]) && 
      inputValues[type].some(transaction => transaction.montants[monthIndex] !== 0)
    )
  );
  
  console.log("displayedMonths", displayedMonths);
  
  const displayedMonthIndices = displayedMonths.map(month => presentedMonths.indexOf(month));

  // Ensure inputValues.encaissements and inputValues.decaissements are arrays
  const encaissements = inputValues.encaissements || [];
  const decaissements = inputValues.decaissements || [];

  // Calculate monthly and accumulated treasury, with checks for undefined properties
  const monthlyTreasury = calculateMonthlyTreasury(inputValues);
  const initialEncaissement = encaissements[encaissements.length - 1]?.montantInitial || 0;
  const initialDecaissement = decaissements[decaissements.length - 1]?.montantInitial || 0;
  const accumulatedTreasury = calculateAccumulatedTreasury(initialEncaissement - initialDecaissement, inputValues);
  const percentageVsEncaissements = calculatePercentageBalanceVsEncaissements(
    monthlyTreasury,
    encaissements[encaissements.length - 1]?.montants || []
  );

  const handleCellEdit = (type, index, monthIndex, value) => {
    handleInputChange(type, index, monthIndex, value);
  };

  const handleCellFocus = (type, index, monthIndex) => {
    handleFocus(type, index, monthIndex);
  };

  return (
    <TableContainer component={Paper} sx={{ overflowX: 'auto', width: '100%' }}>
      <Table sx={{ minWidth: 650, width: '100vw' }} size="small" aria-label="a dense table">
        <TableHead sx={{ backgroundColor: '#424242' }}>
          <TableRow>
            <TableCell
              padding="normal"
              align="left"
              sx={{
                color: '#ffffff',
                position: 'sticky',
                left: 0,
                zIndex: 1,
                backgroundColor: '#424242',
              }}
            >
              Type
            </TableCell>
            <TableCell
              padding="normal"
              align="left"
              sx={{
                color: '#ffffff',
                position: 'sticky',
                left: '100px', // Adjust this value based on your table's structure
                zIndex: 1,
                backgroundColor: '#424242',
              }}
            >
              Nature de la transaction
            </TableCell>
            <TableCell
              padding="normal"
              align="left"
              sx={{ color: '#ffffff', backgroundColor: '#424242' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography align="left" gutterBottom style={{ flexGrow: 1 }}>
                  Solde Initial
                </Typography>
                <IconButton
                  aria-label="open column menu"
                  onClick={(event) => handleColumnMenuOpen(event, -1)}
                  edge="end"
                  size="small"
                  style={{ marginLeft: 'auto' }}
                >
                  <MoreVertIcon sx={{ color: '#ffffff' }} />
                </IconButton>
              </div>
            </TableCell>
            {displayedMonths.map((month, i) => (
              <TableCell
                key={month}
                align="left"
                padding="normal"
                sx={{ color: '#ffffff', backgroundColor: '#424242' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography align="left" gutterBottom style={{ flexGrow: 1 }}>
                    {month}
                  </Typography>
                  <IconButton
                    aria-label="open column menu"
                    onClick={(event) => handleColumnMenuOpen(event, i)}
                    edge="end"
                    size="small"
                    style={{ marginLeft: 'auto' }}
                  >
                    <MoreVertIcon sx={{ color: '#ffffff' }} />
                  </IconButton>
                </div>
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ color: '#ffffff', backgroundColor: '#424242' }}>
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {["encaissements", "decaissements"].map((type) => (
          <React.Fragment key={type}>
            {inputValues[type]?.map((transaction, index) => {
              const isHighlighted = 
                (type === 'encaissements' && highlightedRow.encaissements === transaction.nature) ||
                (type === 'decaissements' && highlightedRow.decaissements === transaction.nature);

                return (
                  <TableRow key={index}>
                    {index === 0 && (
                      <TableCell
                        rowSpan={inputValues[type].length}
                        padding="normal"
                        align="left"
                        sx={{
                          backgroundColor: "#424242",
                          position: 'sticky',
                          color:"white",
                          border: '1px solid white',
                          left: 0,
                          zIndex: 1,
                        }}
                      >
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                      </TableCell>
                    )}
                    
                    <TableCell
                      padding="normal"
                      align="left"
                      sx={{
                        color: "#ffffff",
                        backgroundColor: '#424242',
                        position: 'sticky',
                        zIndex: 1,
                      }}
                    >
                      {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'nature' ? (
                        <TextField
                          value={transaction.nature}
                          onChange={(e) => handleCellEdit(type, index, 'nature', e.target.value)}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          fullWidth
                          inputProps={{
                            style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                          }}
                        />
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div onClick={() => handleCellFocus(type, index, 'nature')} style={{ height: '36px', padding: '0 8px', maxWidth: '150px', whiteSpace: 'nowrap', flexGrow: 1 }}>
                            {transaction.nature}
                          </div>
                          <IconButton
                            aria-label="open nature menu"
                            onClick={(event) => handleNatureMenuOpen(event, type, index, transaction)}
                            edge="end"
                            size="small"
                            style={{ marginLeft: 'auto', color: "white" }}
                          >
                            <MoreVertIcon />
                          </IconButton>
                        </div>
                      )}
                    </TableCell>
                    <TableCell padding="normal" align="left" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}>
                      {editingCell?.type === type && editingCell?.index === index && editingCell?.key === 'montantInitial' ? (
                        <TextField
                          value={transaction.montantInitial}
                          onChange={(e) => handleCellEdit(type, index, 'montantInitial', e.target.value)}
                          onBlur={handleBlur}
                          onKeyDown={handleKeyDown}
                          fullWidth
                          inputProps={{
                            style: { height: '36px', padding: '0 8px', minWidth: '120px' },
                          }}
                        />
                      ) : (
                        <div onClick={() => handleCellFocus(type, index, 'montantInitial')} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          {transaction.montantInitial}
                        </div>
                      )}
                    </TableCell>
                    {displayedMonths.map((presentedMonth, monthIndex) => (
  <TableCell
    padding="normal"
    key={presentedMonth}
    sx={{ backgroundColor: highlightedMonth === displayedMonthIndices[monthIndex] ? 'rgba(255, 0, 0, 0.1)' : isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit' }}
  >
    {editingCell?.type === type && editingCell?.index === index && editingCell?.key === monthIndex ? (
      <TextField
        value={transaction.montants?.[displayedMonthIndices[monthIndex]] || ''}
        onChange={(e) => handleCellEdit(type, index, displayedMonthIndices[monthIndex], e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        fullWidth
        InputProps={{
          sx: { height: '36px', minWidth: '120px', padding: '0 2px', '& input': { padding: '5px' } },
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="open menu"
                onClick={(event) => handleMenuOpen(event, type, index, displayedMonthIndices[monthIndex])}
                edge="end"
                size="small"
              >
                <MoreVertIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    ) : (
      <div onClick={() => handleCellFocus(type, index, displayedMonthIndices[monthIndex])} style={{ height: '36px', padding: '0 8px', minWidth: '120px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {transaction.montants?.[displayedMonthIndices[monthIndex]] || ''}
      </div>
    )}
  </TableCell>
))}

                    <TableCell align="left" padding="normal" sx={{ backgroundColor: isHighlighted ? 'rgba(0, 0, 255, 0.1)' : 'inherit', fontWeight: 'bold' }}>
                      {calculateTotal(type, index, inputValues)}
                    </TableCell>
                  </TableRow>
                );
              })}
            </React.Fragment>
          ))}
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Solde de la Trésorerie</TableCell>
            {displayedMonthIndices.map((monthIndex) => (
              <TableCell
                key={monthIndex}
                align="left"
                padding="normal"
                sx={{ backgroundColor: monthlyTreasury[monthIndex] < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
              >
                {monthlyTreasury[monthIndex]}
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>
              {monthlyTreasury.reduce((acc, curr) => acc + curr, 0)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Trésorerie Accumulée</TableCell>
            {displayedMonthIndices.map((monthIndex) => (
              <TableCell
                key={monthIndex}
                align="left"
                padding="normal"
                sx={{ backgroundColor: accumulatedTreasury[monthIndex] < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
              >
                {accumulatedTreasury[monthIndex]}
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>
              {accumulatedTreasury.slice(-1)[0]}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3} padding="normal" sx={{ fontWeight: 'bold' }} align="left">Percentage of Treasury vs Encaissements</TableCell>
            {displayedMonthIndices.map((monthIndex) => (
              <TableCell
                key={monthIndex}
                align="left"
                padding="normal"
                sx={{ backgroundColor: percentageVsEncaissements[monthIndex] < 0 ? 'rgba(255, 0, 0, 0.5)' : 'rgba(0, 255, 0, 0.5)', fontWeight: 'bold' }}
              >
                {percentageVsEncaissements[monthIndex]?.toFixed(2)}%
              </TableCell>
            ))}
            <TableCell align="left" padding="normal" sx={{ fontWeight: 'bold' }}>-</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionTable;
