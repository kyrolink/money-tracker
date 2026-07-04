import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import useApp from "../../hooks/useApp";

import { generateIncomeExpenseChart } from "../../utils/dashboard";

import { formatCurrency } from "../../utils/format";

import { formatMonth } from "../../utils/dashboard";
import ChartTooltip from "./ChartTooltip";

export default function IncomeExpenseChart({transactions}) {
  const { state } = useApp();

  const data = generateIncomeExpenseChart(
    transactions
  );

  return (
    <div className="bg-white rounded-2xl shadow border p-6">

      <h2 className="text-2xl font-bold mb-6">
        Income vs Expense Trend
      </h2>

      <ResponsiveContainer
        width="100%"
        height={500}
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="4 4" />

          <XAxis dataKey="month"  tickFormatter={formatMonth} />

          <YAxis
            tickFormatter={(value) =>
              `${value / 1000000}M`
            }
          />

            <Tooltip
                content={<ChartTooltip currency={state.settings.currency}/>}
            />

          <Legend />

          <Line
            dataKey="income"
            stroke="#16a34a"
            strokeWidth={4}
            dot={{ r: 5 }}
          />

          <Line
            dataKey="expense"
            stroke="#dc2626"
            strokeWidth={4}
            dot={{ r: 5 }}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}