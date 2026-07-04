import { LuPencil, LuTrash2 } from "react-icons/lu";
import { ICONS } from "../../utils/icons";

export default function CategoryCard({
  category,
  onEdit,
  onDelete,
}) {
  const Icon = ICONS[category.icon];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div className="flex gap-4">

          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center text-white"
            style={{
              backgroundColor: category.color,
            }}
          >
            {Icon && <Icon size={24} />}
          </div>

          <div>

            <h2 className="font-bold text-lg">

              {category.name}

            </h2>

            <p className="text-slate-500 text-sm">

              {category.isDefault
                ? "Default Category"
                : "Custom Category"}

            </p>

          </div>

        </div>

        <div className="flex gap-2">

          <button
            onClick={() => onEdit(category)}
            className="p-2 rounded-lg hover:bg-slate-100"
          >
            <LuPencil />
          </button>

          {!category.isDefault && (
            <button
              onClick={() => onDelete(category.id)}
              className="p-2 rounded-lg text-red-500 hover:bg-red-100"
            >
              <LuTrash2 />
            </button>
          )}

        </div>

      </div>

    </div>
  );
}