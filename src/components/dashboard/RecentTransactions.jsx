import useApp from "../../hooks/useApp";

import { formatCurrency, formatDate } from "../../utils/format";

import iconMap from "../../utils/iconMapper";

export default function RecentTransactions({transactions}) {
  const { state } = useApp();

  const recent = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.createdAt) -
        new Date(a.createdAt)
    )
    .slice(0, 5);

  return (
    <div className="bg-white rounded-2xl shadow border p-6 h-full">

      <h2 className="text-xl font-bold mb-5">
        Recent Transactions
      </h2>

      <div className="space-y-4">

        {recent.length === 0 && (
          <p className="text-gray-400">
            No transaction
          </p>
        )}

        {recent.map((trx) => {

          const category = state.categories.find(
            (item) => item.id === trx.categoryId
          );

          const Icon = iconMap[category?.icon];

          return (
            <div
              key={trx.id}
              className="flex justify-between items-center border-b pb-4"
            >

              {/* Left */}
              <div className="flex items-center gap-4">

                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                  style={{
                    backgroundColor: category?.color,
                  }}
                >
                  {Icon && <Icon size={20} />}
                </div>

                <div>

                  <p className="font-semibold">
                    {category?.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    {trx.note || "-"}
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(trx.transactionDate)}
                  </p>

                </div>

              </div>

              {/* Right */}
              <div className="text-right">

                <p
                  className={`font-bold text-lg ${
                    trx.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {trx.type === "income" ? "+" : "-"}{" "}
                  {formatCurrency(trx.amount, state.settings.currency)}
                </p>

                <p className="text-xs text-gray-400 capitalize">
                  {trx.type}
                </p>

              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
}