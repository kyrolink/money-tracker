import { formatCurrency } from "../../utils/format";

export default function ChartTooltip({
  active,
  payload,
  label,
  currency,
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="bg-white border rounded-xl shadow p-4">

      <p className="font-semibold mb-3">
        {label}
      </p>

      {payload.map((item) => (

        <div
          key={item.dataKey}
          className="flex justify-between gap-8"
        >

          <span>
            {item.name}
          </span>

          <span className="font-semibold">
            {formatCurrency(
              item.value,
              currency
            )}
          </span>

        </div>

      ))}

    </div>
  );
}