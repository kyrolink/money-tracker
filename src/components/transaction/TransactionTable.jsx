import { FiEdit2, FiTrash2 } from "react-icons/fi";

import useApp from "../../hooks/useApp";

import {
  formatCurrency,
  formatDate,
} from "../../utils/format";

import iconMap from "../../utils/iconMapper";

export default function TransactionTable({
  transactions,
  onEdit,
  onDelete,
}) {
  const { state } = useApp();

  const getCategory = (id) =>
    state.categories.find(
      (item) => item.id === id
    );

  if (transactions.length === 0) {
    return null;
  }

  return (
    <>
      {/* ========================= */}
      {/* Desktop */}
      {/* ========================= */}

      <div className="hidden md:block bg-white rounded-2xl shadow border overflow-hidden">

        <table className="w-full table-fixed">

          <thead className="bg-slate-50 border-b">

            <tr>

              <th className="w-36 text-left p-4">
                Date
              </th>

              <th className="text-left">
                Category
              </th>

              <th className="w-32 text-left">
                Type
              </th>

              <th className="w-40 text-right">
                Amount
              </th>

              <th className="w-28 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {transactions.map((trx) => {

              const category =
                getCategory(trx.categoryId);

              const Icon =
                iconMap[category?.icon];

              return (
                <tr
                  key={trx.id}
                  className="border-b hover:bg-slate-50 transition"
                >

                  <td className="p-4">
                    {formatDate(
                      trx.transactionDate
                    )}
                  </td>

                  <td>

                    <div className="flex items-center gap-3">

                      <div
                        className="w-11 h-11 rounded-full flex items-center justify-center text-white"
                        style={{
                          backgroundColor:
                            category?.color,
                        }}
                      >

                        {Icon && (
                          <Icon size={18} />
                        )}

                      </div>

                      <div>

                        <p className="font-medium">
                          {category?.name}
                        </p>

                        <p className="text-xs text-gray-500">
                          {trx.note || "-"}
                        </p>

                      </div>

                    </div>

                  </td>

                  <td>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        trx.type === "income"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >

                      {trx.type === "income"
                        ? "Income"
                        : "Expense"}

                    </span>

                  </td>

                  <td
                    className={`text-right pr-4 text-lg font-bold ${
                      trx.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >

                    {trx.type === "income"
                      ? "+"
                      : "-"}

                    {" "}

                    {formatCurrency(
                      trx.amount,
                      state.settings.currency
                    )}

                  </td>

                  <td>

                    <div className="flex justify-center gap-2">

                      <button
                        onClick={() =>
                          onEdit(trx)
                        }
                        className="w-9 h-9 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
                      >

                        <FiEdit2 className="text-blue-600" />

                      </button>

                      <button
                        onClick={() =>
                          onDelete(trx.id)
                        }
                        className="w-9 h-9 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center"
                      >

                        <FiTrash2 className="text-red-600" />

                      </button>

                    </div>

                  </td>

                </tr>
              );
            })}

          </tbody>

        </table>

      </div>

      {/* ========================= */}
      {/* Mobile */}
      {/* ========================= */}

      <div className="md:hidden space-y-4">

        {transactions.map((trx) => {

          const category =
            getCategory(trx.categoryId);

          const Icon =
            iconMap[category?.icon];

          return (

            <div
              key={trx.id}
              className="bg-white rounded-2xl shadow border p-4"
            >

              {/* Header */}

              <div className="flex justify-between items-start">

                <div className="flex items-center gap-3">

                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{
                      backgroundColor:
                        category?.color,
                    }}
                  >

                    {Icon && (
                      <Icon size={20} />
                    )}

                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {category?.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {trx.note || "-"}
                    </p>

                  </div>

                </div>

                <span
                  className={`font-bold ${
                    trx.type === "income"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >

                  {trx.type === "income"
                    ? "+"
                    : "-"}

                  {" "}

                  {formatCurrency(
                    trx.amount,
                    state.settings.currency
                  )}

                </span>

              </div>

              {/* Footer */}

              <div className="flex justify-between items-center mt-5">

                <div>

                  <p className="text-sm text-gray-500">

                    {formatDate(
                      trx.transactionDate
                    )}

                  </p>

                  <span
                    className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                      trx.type === "income"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >

                    {trx.type === "income"
                      ? "Income"
                      : "Expense"}

                  </span>

                </div>

                <div className="flex gap-2">

                  <button
                    onClick={() =>
                      onEdit(trx)
                    }
                    className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center"
                  >

                    <FiEdit2 className="text-blue-600" />

                  </button>

                  <button
                    onClick={() =>
                      onDelete(trx.id)
                    }
                    className="w-10 h-10 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center"
                  >

                    <FiTrash2 className="text-red-600" />

                  </button>

                </div>

              </div>

            </div>

          );

        })}

      </div>
    </>
  );
}