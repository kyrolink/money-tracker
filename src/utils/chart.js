export function generateLineChartData(
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