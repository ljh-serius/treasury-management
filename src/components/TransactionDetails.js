import React from 'react';
import { useLocation } from 'react-router-dom';

const TransactionDetails = () => {
  const location = useLocation();
  const { transactionRow } = location.state;

  return (
    <div>
      <h2>{transactionRow.nature}</h2>
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
          {transactionRow.montants.map((monthDetail, index) => (
            <tr key={index}>
              <td>Month {index + 1}</td>
              <td>{monthDetail.totalAmount}</td>
              <td>
                {monthDetail.productUnits.map((unit, i) => (
                  <div key={i}>
                    {unit.id}: {unit.amount}€
                  </div>
                ))}
              </td>
              <td>
                {monthDetail.workUnits.map((unit, i) => (
                  <div key={i}>
                    {unit.type}: {unit.amount}€
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionDetails;
