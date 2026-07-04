import {
  ResponsiveContainer,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";

import useApp from "../../hooks/useApp";

import { generateLineChartData } from "../../utils/chart";

export default function MonthlyChart() {
  const { state } = useApp();

  const data = generateLineChartData(
    state.transactions,
    state.categories
  );

  return (
    <div className="bg-white rounded-2xl shadow border p-6 mt-8">

      <h2 className="text-xl font-bold mb-5">

        Monthly Trend

      </h2>

      <ResponsiveContainer
        width="100%"
        height={350}
      >
        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Legend />

          {state.categories.map((category) => (
            <Line
              key={category.id}
              type="monotone"
              dataKey={category.name}
              stroke={category.color}
              strokeWidth={3}
            />
          ))}

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}