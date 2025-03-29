/*
Purpose: Displays financial analytics and reports to the user.
Features:
Likely includes graphs, charts, or other visualizations to give the user insight into their spending, income, and financial trends.
The data used for analytics is likely pulled from the user's transaction history.
*/
import { Progress } from "antd";
import React from "react";
import "../resources/analatics.css";// Importing custom CSS file for styling.

function Analatics({ transactions }) {
   // Functional component that takes transactions as a prop.
  
  // Total number of transactions.
  const totalTransactions = transactions.length;
  // Filter transactions to get only income-related transactions.
  const totalIncomeTransactions = transactions.filter(
    (transaction) => transaction.type === "income"
  );
   // Filter transactions to get only expense-related transactions.
  const totalExpenceTransactions = transactions.filter(
    (transaction) => transaction.type === "expence"
  );
  // Calculate percentage of income transactions.
  const totalIncomeTransactionsPercentage =
    (totalIncomeTransactions.length / totalTransactions) * 100;
    // Calculate percentage of expense turnover relative to total turnover.
  const totalExpenceTransactionsPercentage =
    (totalExpenceTransactions.length / totalTransactions) * 100;

  const totalIncomeTurnover = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const totalExpenceTurnover = transactions
    .filter((transaction) => transaction.type === "expence")
    .reduce((acc, transaction) => acc + transaction.amount, 0);
   // Calculate net balance by subtracting total expenses from total income.
  const netBalance = totalIncomeTurnover - totalExpenceTurnover;
  // Calculate percentage of income turnover relative to total turnover.
  const totalIncomeTurnoverPercentage =
    (totalIncomeTurnover / (totalIncomeTurnover + totalExpenceTurnover)) * 100;
  const totalExpenceTurnoverPercentage =
    (totalExpenceTurnover / (totalIncomeTurnover + totalExpenceTurnover)) * 100;
// Define categories for category-wise analysis.
  const categories = [
    "salary",
    "entertainment",
    "freelance",
    "food",
    "travel",
    "investment",
    "education",
    "medical",
    "tax",
  ];

  return (
    <div className="analytics">
        {/* Main container for analytics content */}
      <div className="row">
        {/* Section for total transactions breakdown */}
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Total Transactions : {totalTransactions}</h4>
            <hr />
            <h5>Income : {totalIncomeTransactions.length}</h5>
            <h5>Expence : {totalExpenceTransactions.length}</h5>
            {/* Progress bars for income and expense transaction percentages */}
            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="#5DD64F"
                type="circle"
                percent={totalIncomeTransactionsPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#E5572F"
                type="circle"
                percent={totalExpenceTransactionsPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
        {/* Section for net balance and turnover breakdown */}
        <div className="col-md-4 mt-3">
          <div className="transactions-count">
            <h4>Net Balance : {netBalance}</h4>
            <hr />
            <h5>Income : {totalIncomeTurnover}</h5>
            <h5>Expence : {totalExpenceTurnover}</h5>
             {/* Progress bars for income and expense turnover percentages */}
            <div className="progress-bars">
              <Progress
                className="mx-5"
                strokeColor="#5DD64F"
                type="circle"
                percent={totalIncomeTurnoverPercentage.toFixed(0)}
              />
              <Progress
                strokeColor="#E5572F"
                type="circle"
                percent={totalExpenceTurnoverPercentage.toFixed(0)}
              />
            </div>
          </div>
        </div>
      </div>
      <hr />
      {/* Section for category-wise income analysis */}
      <div className="row">
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Income - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "income" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card" key={category}>
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0B5AD9"
                      percent={((amount / totalIncomeTurnover) * 100).toFixed(0)}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
           {/* Section for category-wise expense analysis */}
        <div className="col-md-6">
          <div className="category-analysis">
            <h4>Expence - Category Wise</h4>
            {categories.map((category) => {
              const amount = transactions
                .filter((t) => t.type === "expence" && t.category === category)
                .reduce((acc, t) => acc + t.amount, 0);
              return (
                amount > 0 && (
                  <div className="category-card" key={category}>
                    <h5>{category}</h5>
                    <Progress
                      strokeColor="#0B5AD9"
                      percent={((amount / totalExpenceTurnover) * 100).toFixed(0)}
                    />
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analatics;