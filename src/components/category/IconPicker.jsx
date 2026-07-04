import { ICONS, ICON_OPTIONS } from "../../utils/icons";

export default function IconPicker({
  value,
  onChange,
}) {
  return (
    <div className="grid grid-cols-5 gap-3 mt-5">

      {ICON_OPTIONS.map((iconName) => {

        const Icon = ICONS[iconName];

        return (

          <button
            key={iconName}
            type="button"
            onClick={() => onChange(iconName)}
            className={`border rounded-xl p-3 flex justify-center
            ${
              value === iconName
                ? "border-amber-500 bg-amber-50"
                : ""
            }`}
          >

            <Icon size={22} />

          </button>

        );

      })}

    </div>
  );
}