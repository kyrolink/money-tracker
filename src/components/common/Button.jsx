export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
}) {
  const styles = {
    primary:
      "bg-amber-500 hover:bg-amber-600 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300 text-slate-700",

    danger:
      "bg-red-500 hover:bg-red-600 text-white",
  };

  return (
   <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-3 rounded-xl transition font-medium ${
        styles[variant]
      } ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
}