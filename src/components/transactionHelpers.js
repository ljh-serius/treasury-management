export const initialTransactions = {
  encaissements: [
    { nature: 'Vente', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Service', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Total Encaissements', montantInitial: 0, montants: Array(12).fill(0) }
  ],
  decaissements: [
    { nature: 'Achat', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Salaires', montantInitial: 0, montants: Array(12).fill(0) },
    { nature: 'Total Décaissements', montantInitial: 0, montants: Array(12).fill(0) }
  ]
};

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

export const calculateTotals = (transactions) => {
  const updatedTransactions = { ...transactions };
  ['encaissements', 'decaissements'].forEach((type) => {
    const total = { nature: `Total ${type.charAt(0).toUpperCase() + type.slice(1)}`, montantInitial: 0, montants: Array(12).fill(0) };
    updatedTransactions[type].slice(0, -1).forEach((transaction) => {
      total.montantInitial += transaction.montantInitial;
      transaction.montants.forEach((montant, i) => {
        total.montants[i] += montant;
      });
    });
    updatedTransactions[type][updatedTransactions[type].length - 1] = total;
  });
  return updatedTransactions;
};

export const calculateMonthlyTreasury = (transactions) => {
  return Array.from({ length: 12 }, (_, month) => {
    const totalEncaissements = transactions.encaissements[transactions.encaissements.length - 1].montants[month];
    const totalDecaissements = transactions.decaissements[transactions.decaissements.length - 1].montants[month];
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
  const initialEncaissements = book.encaissements[0]?.montantInitial || 0;
  const initialDecaissements = book.decaissements[0]?.montantInitial || 0;
  const initialBalance = initialEncaissements - initialDecaissements;

  // Calculate Total Encaissements
  const totalEncaissements = book.encaissements[book.encaissements.length - 1]?.montants.reduce((a, b) => a + b, 0) + book.encaissements[book.encaissements.length - 1]?.montantInitial || 0;

  // Calculate Total Decaissements
  const totalDecaissements = book.decaissements[book.decaissements.length - 1]?.montants.reduce((a, b) => a + b, 0) + book.decaissements[book.decaissements.length - 1]?.montantInitial || 0;

  // Calculate Final Treasury
  const finalTreasury = initialBalance + totalEncaissements - totalDecaissements;

  return { initialBalance, totalEncaissements, totalDecaissements, finalTreasury };
};
