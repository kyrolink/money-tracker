import { useMemo, useState } from "react";
import {
  FiDollarSign,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";

import useApp from "../../hooks/useApp";

import SummaryCard from "../../components/dashboard/SummaryCard";
import IncomeExpenseChart from "../../components/dashboard/IncomeExpenseChart";
import ExpensePieChart from "../../components/dashboard/ExpensePieChart";
import RecentTransactions from "../../components/dashboard/RecentTransactions";
import CategoryTrendChart from "../../components/dashboard/CategoryTrendChart";

import { calculateSummary } from "../../utils/statistics";
import { filterTransactions } from "../../utils/dashboard";

export default function Dashboard() {
  const { state } = useApp();

  const [filter, setFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return filterTransactions(
      state.transactions,
      filter
    );
  }, [state.transactions, filter]);

  const summary = calculateSummary(filteredTransactions);

  return (
    <div className="space-y-8">

      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      {/* Filter */}
      <div>

        <p className="text-sm text-slate-500 mb-3">
          Showing {filteredTransactions.length} transaction(s)
        </p>

        <div className="flex flex-wrap gap-3">

          {[
            "all",
            "today",
            "week",
            "month",
            "year",
          ].map((item) => (

            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                filter === item
                  ? "bg-amber-500 text-white shadow-lg scale-105"
                  : "bg-white border hover:bg-slate-100"
              }`}
            >
              {{
                all: "All",
                today: "Today",
                week: "This Week",
                month: "This Month",
                year: "This Year",
              }[item]}
            </button>

          ))}

        </div>

      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 ? (

        <div className="bg-white rounded-2xl border p-16 text-center">

          <h2 className="text-2xl font-bold">
            No Transaction
          </h2>

          <p className="text-slate-500 mt-2">
            There are no transactions for this period.
          </p>

        </div>

      ) : (

        <>

          {/* Summary */}
          <div className="grid md:grid-cols-3 gap-6">

            <SummaryCard
              title="Balance"
              value={summary.balance}
              color="#2563eb"
              icon={<FiDollarSign />}
            />

            <SummaryCard
              title="Income"
              value={summary.income}
              color="#16a34a"
              icon={<FiTrendingUp />}
            />

            <SummaryCard
              title="Expense"
              value={summary.expense}
              color="#dc2626"
              icon={<FiTrendingDown />}
            />

          </div>

          {/* Income Expense Chart */}
          <IncomeExpenseChart
            transactions={filteredTransactions}
          />

          {/* Pie + Recent */}
          <div className="grid lg:grid-cols-5 gap-6">

            <div className="lg:col-span-2">

              <ExpensePieChart
                transactions={filteredTransactions}
              />

            </div>

            <div className="lg:col-span-3">

              <RecentTransactions
                transactions={filteredTransactions}
              />

            </div>

          </div>

          {/* Category Trend */}
          <CategoryTrendChart
            transactions={filteredTransactions}
          />

        </>

      )}

    </div>
  );
}