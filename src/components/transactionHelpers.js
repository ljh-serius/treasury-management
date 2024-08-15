export const monthNames = ["Initial", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80vw',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const calculateTotals = (transactions = {}) => {
  const updatedTransactions = { ...transactions };

  // Ensure encaissements and decaissements are arrays, or provide default empty arrays
  const encaissements = updatedTransactions.encaissements || [];
  const decaissements = updatedTransactions.decaissements || [];

  // Calculate total encaissements
  const totalEncaissement = encaissements.reduce((total, transaction) => {
    if (transaction.nature !== 'Total Encaissements') {
      total.montantInitial += transaction.montantInitial || 0;
      total.montants = total.montants.map((monthTotal, index) => monthTotal + (transaction.montants[index] || 0));
    }
    return total;
  }, {
    nature: 'Total Encaissements',
    montantInitial: 0,
    montants: Array(12).fill(0),
  });

  // Calculate total décaissements
  const totalDecaissement = decaissements.reduce((total, transaction) => {
    if (transaction.nature !== 'Total Décaissements') {
      total.montantInitial += transaction.montantInitial || 0;
      total.montants = total.montants.map((monthTotal, index) => monthTotal + (transaction.montants[index] || 0));
    }
    return total;
  }, {
    nature: 'Total Décaissements',
    montantInitial: 0,
    montants: Array(12).fill(0),
  });

  // Replace or append the totals in the arrays
  if (encaissements.length > 0) {
    encaissements[encaissements.length - 1] = totalEncaissement;
  } else {
    encaissements.push(totalEncaissement);
  }

  if (decaissements.length > 0) {
    decaissements[decaissements.length - 1] = totalDecaissement;
  } else {
    decaissements.push(totalDecaissement);
  }

  updatedTransactions.encaissements = encaissements;
  updatedTransactions.decaissements = decaissements;

  return updatedTransactions;
};


export const calculateMonthlyTreasury = (transactions) => {
  // Ensure transactions are properly initialized and contain valid arrays
  if (
    !transactions ||
    !Array.isArray(transactions.encaissements) ||
    !Array.isArray(transactions.decaissements)
  ) {
    // Return an array of zeros (or another default) if transactions are not correctly initialized
    return Array(12).fill(0);
  }

  // Ensure that both encaissements and decaissements have the correct structure
  const encaissements = transactions.encaissements.length > 0
    ? transactions.encaissements[transactions.encaissements.length - 1].montants
    : Array(12).fill(0);

  const decaissements = transactions.decaissements.length > 0
    ? transactions.decaissements[transactions.decaissements.length - 1].montants
    : Array(12).fill(0);

  return Array.from({ length: 12 }, (_, month) => {
    const totalEncaissements = encaissements[month] || 0;
    const totalDecaissements = decaissements[month] || 0;
    return totalEncaissements - totalDecaissements;
  });
};

export const calculateAccumulatedTreasury = (initialSolde, transactions) => {
  const monthlyTreasury = calculateMonthlyTreasury(transactions);
  return monthlyTreasury.reduce((acc, value, index) => {
    if (index === 0) acc.push(value + initialSolde);
    else acc.push(acc[index - 1] + value);
    return acc;
  }, []);
};

export const calculateTotal = (type, index, transactions) => {
  const transaction = transactions[type][index];
  return transaction.montants.reduce((acc, curr) => acc + curr, 0) + transaction.montantInitial;
};

export const prepareChartData = (type, transactions) => {
  const data = transactions[type].map(transaction => ({
    name: transaction.nature,
    data: [transaction.montantInitial, ...transaction.montants]
  })).slice(0, -1); // Remove total from chart data
  return data;
};

export const prepareCumulativeTreasuryData = (transactions) => {
  const initialSolde = transactions.encaissements[transactions.encaissements.length - 1].montantInitial -
    transactions.decaissements[transactions.decaissements.length - 1].montantInitial;
  const data = calculateAccumulatedTreasury(initialSolde, transactions);
  return [{
    name: 'Trésorerie Cummulée',
    data: [initialSolde, ...data]
  }];
};

export const prepareMonthlyTreasuryData = (transactions) => {
  const data = calculateMonthlyTreasury(transactions);
  return [{
    name: 'Solde de Trésorie',
    data: [0, ...data]
  }];
};

export const calculatePercentageBalanceVsEncaissements = (monthlyTreasury, encaissements) => {
  return monthlyTreasury.map((treasury, index) => {
    if (encaissements[index] === 0) return 0;
    return (treasury / encaissements[index]) * 100;
  });
};

export const calculateBudgetSummary = (book) => {
  // Calculate Initial Balance
  const initialEncaissements = book.encaissements[book.encaissements.length - 1]?.montantInitial || 0;
  const initialDecaissements = book.decaissements[book.encaissements.length - 1]?.montantInitial || 0;
  const initialBalance = initialEncaissements - initialDecaissements;

  // Calculate Total Encaissements
  const totalEncaissements = book.encaissements[book.encaissements.length - 1]?.montants.reduce((a, b) => a + b, 0) + book.encaissements[book.encaissements.length - 1]?.montantInitial || 0;

  // Calculate Total Decaissements
  const totalDecaissements = book.decaissements[book.decaissements.length - 1]?.montants.reduce((a, b) => a + b, 0) + book.decaissements[book.decaissements.length - 1]?.montantInitial || 0;

  // Calculate Final Treasury
  const finalTreasury = totalEncaissements - totalDecaissements;

  return { initialBalance, totalEncaissements, totalDecaissements, finalTreasury };
};
