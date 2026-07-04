export function filterTransactions(
  transactions,
  {
    search = "",
    type = "all",
    category = "all",
    sort = "newest",
    fromDate = "",
    toDate = "",
    categories = [],
  }
) {
  let data = [...transactions];

  // =========================
  // SMART SEARCH
  // =========================

  if (search.trim()) {
    const keyword = search.toLowerCase().trim();

    data = data.filter((trx) => {
      const categoryObj = categories.find(
        (cat) => cat.id === trx.categoryId
      );

      const categoryName = (
        categoryObj?.name || ""
      ).toLowerCase();

      const note = (
        trx.note || ""
      ).toLowerCase();

      const transactionType = trx.type.toLowerCase();

      const amount = trx.amount.toString();

      const date = trx.transactionDate;

      return (
        note.includes(keyword) ||
        categoryName.includes(keyword) ||
        transactionType.includes(keyword) ||
        amount.includes(keyword) ||
        date.includes(keyword)
      );
    });
  }

  // =========================
  // TYPE
  // =========================

  if (type !== "all") {
    data = data.filter(
      (trx) => trx.type === type
    );
  }

  // =========================
  // CATEGORY
  // =========================

  if (category !== "all") {
    data = data.filter(
      (trx) => trx.categoryId === category
    );
  }

  // =========================
  // DATE RANGE
  // =========================

  if (fromDate) {
    data = data.filter(
      (trx) => trx.transactionDate >= fromDate
    );
  }

  if (toDate) {
    data = data.filter(
      (trx) => trx.transactionDate <= toDate
    );
  }

  // =========================
  // SORT
  // =========================

  switch (sort) {
    case "oldest":
      data.sort(
        (a, b) =>
          new Date(a.transactionDate) -
          new Date(b.transactionDate)
      );
      break;

    case "highest":
      data.sort(
        (a, b) => b.amount - a.amount
      );
      break;

    case "lowest":
      data.sort(
        (a, b) => a.amount - b.amount
      );
      break;

    default:
      data.sort(
        (a, b) =>
          new Date(b.transactionDate) -
          new Date(a.transactionDate)
      );
  }

  return data;
}