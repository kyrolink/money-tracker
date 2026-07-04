import { formatCurrency } from "../../utils/format";

import useApp from "../../hooks/useApp";

export default function SummaryCard({
  title,
  value,
  color,
  icon
}) {
    const { state } = useApp();
  return (
    <div className="bg-white rounded-2xl border shadow hover:shadow-lg transition p-6">
        <div className="flex justify-between items-center">
            <div>
                <p className="text-gray-500 text-sm">
                    {title}
                </p>

                <h2
                    className="text-3xl font-bold mt-3"
                    style={{
                    color,
                    }}
                >
                    {formatCurrency(value, state.settings.currency)}
                </h2>
            </div>
            <div className="w-14 h-14 rounded-xl flex items-center justify-center text-white text-2xl" style={{backgroundColor:color}}>
                {icon}
            </div>
        </div>
    </div>
    
  );
}