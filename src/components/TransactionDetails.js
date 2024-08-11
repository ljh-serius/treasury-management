import React, { useEffect, useState } from 'react';

const generateRandomSubElements = (totalAmount) => {
  const productUnits = [];
  const workUnits = [];

  // Randomly decide how many product units contribute to the total amount
  const numProductUnits = Math.floor(Math.random() * 3) + 1; // 1 to 3 product units
  let remainingAmount = totalAmount;

  // Generate product units
  for (let i = 0; i < numProductUnits; i++) {
    if (i === numProductUnits - 1) {
      // Last unit takes the remaining amount
      productUnits.push({ id: `Product ${i + 1}`, amount: remainingAmount });
    } else {
      const productAmount = Math.floor(Math.random() * remainingAmount);
      productUnits.push({ id: `Product ${i + 1}`, amount: productAmount });
      remainingAmount -= productAmount;
    }
  }

  // Randomly decide the type and number of work units
  const workTypes = ['hourly', 'daily', 'monthly', 'yearly', 'bonus'];
  const numWorkUnits = Math.floor(Math.random() * 3) + 1; // 1 to 3 work units

  // Generate work units
  for (let i = 0; i < numWorkUnits; i++) {
    const workType = workTypes[Math.floor(Math.random() * workTypes.length)];
    if (i === numWorkUnits - 1) {
      // Last unit takes the remaining amount
      workUnits.push({ type: workType, amount: remainingAmount });
    } else {
      const workAmount = Math.floor(Math.random() * remainingAmount);
      workUnits.push({ type: workType, amount: workAmount });
      remainingAmount -= workAmount;
    }
  }

  return { productUnits, workUnits };
};

const TransactionDetails = () => {
  const [transactionRow, setTransactionRow] = useState(null);
  const [detailedMontants, setDetailedMontants] = useState([]);

  useEffect(() => {
    const savedTransaction = JSON.parse(localStorage.getItem('selectedTransaction'));
    setTransactionRow(savedTransaction);

    if (savedTransaction) {
      const detailed = savedTransaction.montants.map((totalAmount) => {
        const detailedAnalysis = generateRandomSubElements(totalAmount);
        return { totalAmount, ...detailedAnalysis };
      });
      setDetailedMontants(detailed);
    }
  }, []);

  if (!transactionRow) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Details for: {transactionRow.nature}</h2>
      <p>Initial Amount: {transactionRow.montantInitial}€</p>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Total Amount</th>
            <th>Product Units</th>
            <th>Work Units</th>
          </tr>
        </thead>
        <tbody>
          {detailedMontants.map((monthDetail, index) => (
            <tr key={index}>
              <td>Month {index + 1}</td>
              <td>{monthDetail.totalAmount}€</td>
              <td>
                {monthDetail.productUnits.length > 0 ? (
                  monthDetail.productUnits.map((unit, i) => (
                    <div key={i}>
                      {unit.id}: {unit.amount}€
                    </div>
                  ))
                ) : (
                  <div>No product units</div>
                )}
              </td>
              <td>
                {monthDetail.workUnits.length > 0 ? (
                  monthDetail.workUnits.map((unit, i) => (
                    <div key={i}>
                      {unit.type}: {unit.amount}€
                    </div>
                  ))
                ) : (
                  <div>No work units</div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
