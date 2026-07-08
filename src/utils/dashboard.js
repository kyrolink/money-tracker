export function generateIncomeExpenseChart(transactions) {
  const months = {};

  transactions.forEach((trx) => {
    const month = trx.transactionDate.slice(0, 7);

    if (!months[month]) {
      months[month] = {
        month,
        income: 0,
        expense: 0,
      };
    }

    if (trx.type === "income") {
      months[month].income += trx.amount;
    } else {
      months[month].expense += trx.amount;
    }
  });

  return Object.values(months).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}

export function generatePieData(
  transactions,
  categories,
  type = "expense"
) {
  const result = {};

  transactions
    .filter((trx) => trx.type === type)
    .forEach((trx) => {

      const category = categories.find(
        (item) => item.id === trx.categoryId
      );

      if (!category) return;

      if (!result[category.name]) {
        result[category.name] = {
          name: category.name,
          value: 0,
          color: category.color,
        };
      }

      result[category.name].value += trx.amount;

    });

  return Object.values(result);
}

export function generateCategoryTrend(
  transactions,
  categories
) {
  const months = {};

  transactions.forEach((trx) => {

    const month = trx.transactionDate.slice(0, 7);

    if (!months[month]) {
      months[month] = {
        month,
      };
    }

    const category = categories.find(
      (item) => item.id === trx.categoryId
    );

    if (!category) return;

    if (!months[month][category.name]) {
      months[month][category.name] = 0;
    }

    months[month][category.name] += trx.amount;

  });

  return Object.values(months).sort((a, b) =>
    a.month.localeCompare(b.month)
  );
}

export function formatMonth(month) {
  const date = new Date(`${month}-01`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "2-digit",
  });
}

export function filterTransactions(
  transactions,
  filter
) {
  const now = new Date();

  return transactions.filter((trx) => {
    const date = new Date(trx.transactionDate);

    switch (filter) {

      case "today":
        return (
          date.toDateString() ===
          now.toDateString()
        );

      case "week": {

        const start = new Date(now);
        start.setDate(now.getDate() - now.getDay());

        const end = new Date(start);
        end.setDate(start.getDate() + 6);

        return date >= start && date <= end;
      }

      case "month":
        return (
          date.getMonth() === now.getMonth() &&
          date.getFullYear() === now.getFullYear()
        );

      case "year":
        return (
          date.getFullYear() === now.getFullYear()
        );

      default:
        return true;
    }
  });
}