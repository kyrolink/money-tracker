export default function Input({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb-5">

      <label className="block mb-2 font-medium">

        {label}

      </label>

      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="border border-slate-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-amber-500"
      />

    </div>
  );
}