import { CATEGORY_COLORS } from "../../constants/colors";

export default function ColorPicker({
  value,
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {CATEGORY_COLORS.map((color) => (

        <button
          key={color}
          type="button"
          onClick={() => onChange(color)}
          className={`w-8 h-8 rounded-full border-4 ${
            value === color
              ? "border-black"
              : "border-transparent"
          }`}
          style={{
            backgroundColor: color,
          }}
        />

      ))}

    </div>
  );
}