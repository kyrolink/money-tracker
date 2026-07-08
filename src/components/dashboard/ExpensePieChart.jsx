import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import useApp from "../../hooks/useApp";

import { generatePieData } from "../../utils/dashboard";

import { formatCurrency } from "../../utils/format";

import { Label } from "recharts";

import { useState } from "react";

export default function ExpensePieChart({transactions}) {
  const { state } = useApp();

  const [chartType, setChartType] = useState("expense");

  const data = generatePieData(
    transactions,
    state.categories,
    chartType
  );

  const totalExpense = data.reduce(
    (total, item) => total + item.value,
    0
    );

  return (
    <div className="bg-white rounded-2xl shadow border p-6 h-full">

      <h2 className="text-xl font-bold mb-5">

        Expense / Income by Category

      </h2>
      
      <div className="flex justify-between items-center mb-5">

        <h2 className="text-xl font-bold">

            {chartType === "expense"
                ? "Expense by Category"
                : "Income by Category"}

        </h2>

        <select
            value={chartType}
            onChange={(e)=>
                setChartType(e.target.value)
            }
            className="border rounded-lg px-3 py-2 text-sm"
        >

            <option value="expense">

                Expense

            </option>

            <option value="income">

                Income

            </option>

        </select>

    </div>

      <ResponsiveContainer
        width="100%"
        height={420}
      >
        <PieChart>

            <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={130}
                paddingAngle={3}
            >
            {data.map((item) => (
              <Cell
                key={item.name}
                fill={item.color}
              />
            ))}
            <Label
                value={formatCurrency(totalExpense, state.settings.currency)}
                position="center"
                style={{
                    fontSize: "18px",
                    fontWeight: "bold",
                    fill: "#111827",
                }}
            />
          </Pie>

          <Tooltip
            formatter={(value) =>
              formatCurrency(value,  state.settings.currency)
            }
          />

          {/* <Legend /> */}

        </PieChart>

        </ResponsiveContainer>
        <div className="mt-5 space-y-3">
            {data.map((item) => (
                <div
                key={item.name}
                className="flex justify-between items-center"
                >
                <div className="flex items-center gap-3">
                    <div
                    className="w-4 h-4 rounded-full"
                    style={{
                        backgroundColor: item.color,
                    }}
                    />
                    <span>{item.name}</span>
                </div>
                <span className="font-semibold">
                    {formatCurrency(item.value, state.settings.currency)}
                </span>
                </div>
            ))}
        </div>

    </div>
  );
}