export function calculateSummary(transactions) {
  let income = 0;
  let expense = 0;

  transactions.forEach((trx) => {
    if (trx.type === "income") {
      income += trx.amount;
    } else {
      expense += trx.amount;
    }
  });

  return {
    income,
    expense,
    balance: income - expense,
  };
}