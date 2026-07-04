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

import {
  generateCategoryTrend,
} from "../../utils/dashboard";

import { formatCurrency } from "../../utils/format";

import { formatMonth } from "../../utils/dashboard";

import ChartTooltip from "./ChartTooltip";

export default function CategoryTrendChart({transactions}) {

  const { state } = useApp();

  const data = generateCategoryTrend(
    transactions,
    state.categories
  );

  return (
    <div className="bg-white rounded-2xl shadow border p-6 mt-8">

      <h2 className="text-2xl font-bold mb-6">

        Category Trend

      </h2>

      <ResponsiveContainer
        width="100%"
        height={450}
      >

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3"/>

          <XAxis dataKey="month" tickFormatter={formatMonth}/>

          <YAxis
            tickFormatter={(value)=>
              `${value/1000}K`
            }
          />

          <Tooltip
            content={<ChartTooltip currency={state.settings.currency}/>}
          />

          <Legend/>

          {state.categories.map((category)=>(
            <Line
              key={category.id}
              dataKey={category.name}
              stroke={category.color}
              strokeWidth={3}
              dot={{r:4}}
              activeDot={{r:7}}
              connectNulls
            />
          ))}

        </LineChart>

      </ResponsiveContainer>

    </div>
  );

}