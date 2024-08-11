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
  // Ensure transactions are properly initialized and contain valid arrays
  const updatedTransactions = {
    encaissements: Array.isArray(transactions?.encaissements) ? [...transactions.encaissements] : [],
    decaissements: Array.isArray(transactions?.decaissements) ? [...transactions.decaissements] : [],
  };

  ['encaissements', 'decaissements'].forEach((type) => {
    // Initialize the total transaction object with zero values
    const total = { nature: `Total ${type.charAt(0).toUpperCase() + type.slice(1)}`, montantInitial: 0, montants: Array(12).fill(0) };

    // Ensure that the array has at least one item to avoid errors
    if (updatedTransactions[type].length > 0) {
      // Use slice safely by checking the length
      updatedTransactions[type].slice(0, -1).forEach((transaction) => {
        total.montantInitial += transaction.montantInitial || 0;
        transaction.montants?.forEach((montant, i) => {
          total.montants[i] += montant || 0;
        });
      });

      // Update the last entry in the array with the calculated totals
      updatedTransactions[type][updatedTransactions[type].length - 1] = total;
    } else {
      // If the array is empty, just add the total object
      updatedTransactions[type].push(total);
    }
  });

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
