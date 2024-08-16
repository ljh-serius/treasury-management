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
  // Create a deep copy of the transactions to avoid modifying the original object
  const updatedTransactions = {
    encaissements: transactions.encaissements ? [...transactions.encaissements.map(t => ({ ...t }))] : [],
    decaissements: transactions.decaissements ? [...transactions.decaissements.map(t => ({ ...t }))] : [],
  };

  // Calculate total encaissements
  const totalEncaissement = updatedTransactions.encaissements.reduce((total, transaction) => {
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
  const totalDecaissement = updatedTransactions.decaissements.reduce((total, transaction) => {
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
  const lastEncaissement = updatedTransactions.encaissements[updatedTransactions.encaissements.length - 1];
  if (lastEncaissement && lastEncaissement.nature === 'Total Encaissements') {
    updatedTransactions.encaissements[updatedTransactions.encaissements.length - 1] = totalEncaissement;
  } else {
    updatedTransactions.encaissements.push(totalEncaissement);
  }

  const lastDecaissement = updatedTransactions.decaissements[updatedTransactions.decaissements.length - 1];
  if (lastDecaissement && lastDecaissement.nature === 'Total Décaissements') {
    updatedTransactions.decaissements[updatedTransactions.decaissements.length - 1] = totalDecaissement;
  } else {
    updatedTransactions.decaissements.push(totalDecaissement);
  }

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

const sumUp = (numbers) => {
  return numbers.reduce((total, num) => total + num, 0);
}


export const calculateBudgetSummary = (book) => {
  const initialEncaissements = book.encaissements.filter((line) => {
    return line.nature === 'Total Category';
  })[0].montantInitial;

  const initialDecaissements = book.encaissements.filter((line) => {
    return line.nature === 'Total Category';
  })[0].montantInitial;

  console.log(" honestly", book)

  const initialBalance = initialEncaissements - initialDecaissements;

  const totalEncaissements = sumUp(book.encaissements.filter((line) => {
    return line.nature === 'Total Category';
  })[0].montants);

  const totalDecaissements = sumUp(book.decaissements.filter((line) => {
    return line.nature === 'Total Category';
  })[0].montants);

  const finalTreasury = totalEncaissements - totalDecaissements;

  const result = { initialBalance, totalEncaissements, totalDecaissements, finalTreasury };

  console.log(result);

  return result;
};